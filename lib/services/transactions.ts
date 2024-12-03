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

export const getCachedUserTransactions = unstable_cache(
  async (userId: string) => getUserTransactions(userId),
  ["user-transactions"],
  { revalidate: 80000 }
);
