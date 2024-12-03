import { unstable_cache } from "next/cache";
import { differenceInDays } from "date-fns";

import prisma from "../prisma";
import { defaultUserStats, GetUserStats } from "../validations/user";

const getUserStats = async (id: string): Promise<GetUserStats> => {
  try {
    const userDetails = await prisma.user.findUniqueOrThrow({
      where: { id },
      select: {
        investments: {
          include: {
            tranche: true,
          },
        },
        _count: { select: { referrals: true } },
      },
    });

    const investmentPlan = userDetails.investments
      .filter((investment) => !!investment.started && !investment.ended)
      .sort((a, b) => b.dailyProfit - a.dailyProfit)[0]?.tranche.name;

    const initialValue = { txsValue: 0, unclaimedRewards: 0, totalRewards: 0 };

    const rewardValue = userDetails.investments.reduce(
      (accumulator, currentValue) => {
        const { dailyProfitIncrease, fee } = currentValue.tranche;
        const presentReward = currentValue.started
          ? differenceInDays(new Date(), currentValue.started) *
            dailyProfitIncrease *
            fee
          : 0;
        const totalRewards = accumulator.totalRewards + presentReward;
        if (currentValue.started && !currentValue.ended) {
          const noOfdays = differenceInDays(
            new Date(),
            currentValue.lastClaimed ?? currentValue.started
          );
          const profit = dailyProfitIncrease * fee * noOfdays;
          return {
            unclaimedRewards: accumulator.unclaimedRewards + profit,
            txsValue: accumulator.txsValue + fee,
            totalRewards,
          };
        }
        return {
          txsValue: accumulator.txsValue + fee,
          totalRewards,
          unclaimedRewards: accumulator.unclaimedRewards,
        };
      },
      initialValue
    );

    return {
      ...rewardValue,
      noOftxs: userDetails.investments.length,
      investmentPlan,
      referrals: userDetails._count.referrals,
    };
  } catch (error) {
    console.log("GET_USER_STATS", error);
    return defaultUserStats;
  }
};

export const getCachedUserStats = unstable_cache(
  async (userId: string) => getUserStats(userId),
  ["user-stats"],
  { revalidate: 3600 }
);
