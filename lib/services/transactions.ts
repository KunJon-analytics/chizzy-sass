import { unstable_cache } from "next/cache";

import prisma from "../prisma";

export const getUserTransactions = async (userId: string) => {
  try {
    return prisma.transaction.findMany({
      where: { investment: { userId } },
      include: {
        investment: {
          select: { id: true, tranche: { select: { name: true } } },
        },
      },
    });
  } catch (error) {
    console.log("GET_USER_TRANSACTIONS", error);
    return [];
  }
};

export const getTransaction = async (id: string) => {
  try {
    return prisma.transaction.findUnique({
      where: { id },
      include: {
        investment: {
          select: { id: true, tranche: { select: { name: true } } },
        },
      },
    });
  } catch (error) {
    console.log("GET_TRANSACTION", error);
    return null;
  }
};

export const getCachedUserTransactions = unstable_cache(
  async (userId: string) => getUserTransactions(userId),
  ["user-transactions"],
  { revalidate: 80000 }
);

export const getCachedTransaction = unstable_cache(
  async (transactionId: string) => getTransaction(transactionId),
  ["transactions"],
  { revalidate: 80000 }
);
