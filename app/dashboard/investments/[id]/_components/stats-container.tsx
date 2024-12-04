import { differenceInDays } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InvestmentDetailPayload } from "@/lib/validations/investment";
import { formatCurrency } from "@/lib/utils";
import StatsCard from "./stats-card";

type StatsContainerParams = { investmentData: InvestmentDetailPayload };

const StatsContainer = ({ investmentData }: StatsContainerParams) => {
  const {
    tranche: { fee, dailyProfitIncrease },
    started,
    ended,
    lastClaimed,
  } = investmentData;

  const totalEarnings = started
    ? differenceInDays(ended ?? new Date(), started) * dailyProfitIncrease * fee
    : 0;
  const unclaimedDays =
    started && !ended
      ? differenceInDays(new Date(), lastClaimed ?? started)
      : 0;
  const unclaimedEarnings = dailyProfitIncrease * fee * unclaimedDays;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Earnings"
        value={`${formatCurrency(totalEarnings)}`}
      />
      <StatsCard title="Total Value Locked" value={`${formatCurrency(fee)}`} />
      <StatsCard
        title="Claimed Earnings"
        value={`${formatCurrency(totalEarnings - unclaimedEarnings)}`}
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Unclaimed Earnings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(unclaimedEarnings)}
          </div>
          <Button className="mt-2" disabled={unclaimedEarnings === 0}>
            Claim Rewards
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsContainer;
