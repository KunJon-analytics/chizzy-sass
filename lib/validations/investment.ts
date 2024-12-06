import * as z from "zod";
import { $Enums, Prisma } from "@prisma/client";

export const investmentCreateSchema = z.object({
  trancheId: z.string().min(1),
});

export const investmentCancelSchema = z.object({
  id: z.string().min(1),
});

export type InvestmentCreateParam = z.infer<typeof investmentCreateSchema>;
export type InvestmentCancelParam = z.infer<typeof investmentCancelSchema>;

export type InvestmentsPayload = Prisma.InvestmentGetPayload<{
  include: {
    _count: { select: { transactions: true } };
    tranche: { select: { name: true; fee: true } };
  };
}>;

export type InvestmentDetailPayload = Prisma.InvestmentGetPayload<{
  include: {
    transactions: { include: { investment: { include: { tranche: true } } } };
    tranche: true;
  };
}>;

export type InvestmentTab = "all" | keyof typeof $Enums.InvestmentStatus;

export const getStatusColor = (status: $Enums.InvestmentStatus) => {
  switch (status) {
    case "CONFIRMED":
      return "bg-success";
    case "CANCELLED":
      return "bg-destructive";
    case "PENDING":
      return "bg-warning";
    default:
      return "bg-background";
  }
};
