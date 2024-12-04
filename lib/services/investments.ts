import { unstable_cache } from "next/cache";

import prisma from "../prisma";

export const getUserInvestments = async (userId: string) => {
  try {
    return prisma.investment.findMany({
      where: { userId },
      include: {
        _count: { select: { transactions: true } },
        tranche: { select: { name: true, fee: true } },
      },
    });
  } catch (error) {
    console.log("GET_USER_INVESTMENTS", error);
    return [];
  }
};

export const getCachedUserInvestments = unstable_cache(
  async (userId: string) => getUserInvestments(userId),
  ["user-investments"],
  { revalidate: 80000 }
);
