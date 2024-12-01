import { unstable_cache } from "next/cache";

import prisma from "../prisma";

const getSiteStats = async () => {
  try {
    const users = await prisma.user.count();
    const investments = await prisma.investment.count();
    // add total value invested
    return { users, investments, totalValue: 1000000 };
  } catch (error) {
    console.log("GET_SITE_STATS", error);
    return { users: 100, investments: 24, totalValue: 100000 };
  }
};

export const getCachedSiteStats = unstable_cache(
  async () => getSiteStats(),
  ["site-stats"],
  { revalidate: 3600 }
);
