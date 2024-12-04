import { Prisma } from "@prisma/client";

export type TransactionsPayload = Prisma.TransactionGetPayload<{
  include: {
    investment: {
      select: { id: true; tranche: { select: { name: true } } };
    };
  };
}>;
