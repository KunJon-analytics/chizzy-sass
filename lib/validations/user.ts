export type GetUserStats = {
  noOftxs: number;
  txsValue: number;
  unclaimedRewards: number;
  totalRewards: number;
  referrals: number;
  investmentPlan?: string;
};

export const defaultUserStats: GetUserStats = {
  noOftxs: 0,
  txsValue: 0,
  referrals: 0,
  totalRewards: 0,
  unclaimedRewards: 0,
};
