import { $Enums } from "@prisma/client";
import { AxiosResponse } from "axios";

import { inngest } from "@/inngest/client";
import nowPaymentClient, { config } from "@/lib/now-client";
import prisma from "@/lib/prisma";
import {
  NowPaymentList,
  paymentsCancelledStatus,
  paymentsConfirmedStatus,
} from "@/lib/validations/transaction";
import { env } from "@/env.mjs";

export const confirmDeposit = inngest.createFunction(
  { id: "confirm-investment-deposit" },
  { event: "investment/payment.confirm" },
  async ({ event, step }) => {
    const { invoiceId, wait } = event.data;

    if (wait) {
      await step.sleep("wait-for-tx-blockchain-confirmation", wait);
    }

    // get now api status and return id not okay
    const ok = await step.run("get-api-status", async () => {
      const apiStatusResponse: AxiosResponse<{ message: string }> =
        await nowPaymentClient.get("/status");
      return apiStatusResponse.data.message === "OK";
    });

    if (!ok) {
      return { message: "API is not okay" };
    }

    const data = {
      email: env.NOW_EMAIL,
      password: env.NOW_PASSWORD,
    };

    // get now token
    const token = await step.run("get-auth-token", async () => {
      const response: AxiosResponse<{ token: string }> =
        await nowPaymentClient.post(`/auth`, data);
      return response.data.token;
    });

    // get payment status and amount from invoiceId stored as txId now
    const txStatus = await step.run(
      "get-transaction-status-from-invoiceId",
      async (): Promise<{
        status: $Enums.TransactionStatus;
        amount: number;
      }> => {
        const response: AxiosResponse<NowPaymentList> =
          await nowPaymentClient.get(`/payment/?invoiceId=${invoiceId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": env.NOW_PAYMENT_API_KEY,
            },
          });

        const isConfirmed = response.data.data.find((payment) =>
          paymentsConfirmedStatus.includes(payment.payment_status)
        );
        const isCancelled = response.data.data.find((payment) =>
          paymentsCancelledStatus.includes(payment.payment_status)
        );

        return isConfirmed
          ? { status: "CONFIRMED", amount: isConfirmed.price_amount }
          : isCancelled
          ? { status: "FAILED", amount: isCancelled.price_amount }
          : { status: "PENDING", amount: 0 };
      }
    );

    // end event if tx still pending
    if (txStatus.status === "PENDING") {
      return { message: "Transaction is still pending" };
    }

    // get deposit tx with invoiceId
    const depositTx = await step.run(
      "get-transaction-status-from-invoiceId",
      async () => {
        return prisma.transaction.findFirst({
          where: { txId: invoiceId, type: "DEPOSIT", status: "PENDING" },
        });
      }
    );

    if (!depositTx || txStatus.amount !== depositTx.amount) {
      return { message: `Invalid transaction!` };
    }

    // cancel tx and investment if txstatus FAILED
    if (txStatus.status === "FAILED") {
      await step.run("mark-transaction-investment-failed", async () => {
        return prisma.transaction.update({
          where: { id: depositTx.id },
          data: {
            status: "FAILED",
            investment: { update: { status: "CANCELLED" } },
          },
        });
      });
    }

    // confirm and start investment if CONFIRMED
    if (txStatus.status === "CONFIRMED") {
      await step.run("mark-transaction-investment-confirmed", async () => {
        return prisma.transaction.update({
          where: { id: depositTx.id },
          data: {
            status: "CONFIRMED",
            investment: {
              update: { status: "CONFIRMED", started: new Date() },
            },
          },
        });
      });
    }

    return { message: `Trasaction: ${depositTx.id} done!!!` };
  }
);
