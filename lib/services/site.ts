import { unstable_cache } from "next/cache";
import axios, { AxiosResponse } from "axios";

import prisma from "../prisma";
import { env } from "@/env.mjs";

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

export const data = {
  data: [
    {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      slug: "bitcoin",
      cmc_rank: 5,
      num_market_pairs: 500,
      circulating_supply: 16950100,
      total_supply: 16950100,
      max_supply: 21000000,
      infinite_supply: false,
      last_updated: "2018-06-02T22:51:28.209Z",
      date_added: "2013-04-28T00:00:00.000Z",
      tags: ["mineable"],
      platform: null,
      self_reported_circulating_supply: null,
      self_reported_market_cap: null,
      quote: {
        USD: {
          price: 9283.92,
          volume_24h: 7155680000,
          volume_change_24h: -0.152774,
          percent_change_1h: -0.152774,
          percent_change_24h: 0.518894,
          percent_change_7d: 0.986573,
          market_cap: 852164659250.2758,
          market_cap_dominance: 51,
          fully_diluted_market_cap: 952835089431.14,
          last_updated: "2018-08-09T22:53:32.000Z",
        },
        BTC: {
          price: 1,
          volume_24h: 772012,
          volume_change_24h: 0,
          percent_change_1h: 0,
          percent_change_24h: 0,
          percent_change_7d: 0,
          market_cap: 17024600,
          market_cap_dominance: 12,
          fully_diluted_market_cap: 952835089431.14,
          last_updated: "2018-08-09T22:53:32.000Z",
        },
      },
    },
    {
      id: 1027,
      name: "Ethereum",
      symbol: "ETH",
      slug: "ethereum",
      num_market_pairs: 6360,
      circulating_supply: 16950100,
      total_supply: 16950100,
      max_supply: 21000000,
      infinite_supply: false,
      last_updated: "2018-06-02T22:51:28.209Z",
      date_added: "2013-04-28T00:00:00.000Z",
      tags: ["mineable"],
      platform: null,
      quote: {
        USD: {
          price: 1283.92,
          volume_24h: 7155680000,
          volume_change_24h: -0.152774,
          percent_change_1h: -0.152774,
          percent_change_24h: 0.518894,
          percent_change_7d: 0.986573,
          market_cap: 158055024432,
          market_cap_dominance: 51,
          fully_diluted_market_cap: 952835089431.14,
          last_updated: "2018-08-09T22:53:32.000Z",
        },
        ETH: {
          price: 1,
          volume_24h: 772012,
          volume_change_24h: -0.152774,
          percent_change_1h: 0,
          percent_change_24h: 0,
          percent_change_7d: 0,
          market_cap: 17024600,
          market_cap_dominance: 12,
          fully_diluted_market_cap: 952835089431.14,
          last_updated: "2018-08-09T22:53:32.000Z",
        },
      },
    },
  ],
  status: {
    timestamp: "2018-06-02T22:51:28.209Z",
    error_code: 0,
    error_message: "",
    elapsed: 10,
    credit_count: 1,
  },
};

type Currency = {
  id: number;
  name: string;
  cmc_rank?: number;
  quote: {
    USD: { price: number; percent_change_24h: number; market_cap: number };
  };
};

const getCryptoData = async () => {
  try {
    const response: AxiosResponse<{ data: Currency[] }> = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": env.CMC_PRO_API_KEY,
        },
      }
    );

    // ensure you cache

    return response.data.data;
  } catch (error) {
    console.log("GET_CRYPTO_DATA", error);
    return [];
  }
};

export const getCachedSiteStats = unstable_cache(
  async () => getSiteStats(),
  ["site-stats"],
  { revalidate: 3600 }
);

export const getCachedCryptoData = unstable_cache(
  async () => getCryptoData(),
  ["crypto-data"],
  { revalidate: 3600 }
);
