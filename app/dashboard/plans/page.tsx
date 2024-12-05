import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { differenceInDays } from "date-fns";

import { getCachedTranches } from "@/lib/services/tranche";
import { auth } from "@/lib/auth";
import { siteConfig } from "@/config/site";
import DashboardLayout from "@/components/dashboard/layout/dashboard-layout";
import { TrancheCard } from "./_components/tranche-card";
import { CurrentPlanCard } from "./_components/current-plan-card";
import { InvestNowCard } from "./_components/invest-now-card";

export const metadata: Metadata = {
  title: "Dashboard Plans",
  description: "View and compare investment tranches",
};

// Mock suggested plan (you would typically determine this based on user data or business logic)
const suggestedPlan = siteConfig.defaultTranche;

export default async function DashboardPlansPage() {
  const session = await auth.api.getSession({
    headers: headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect("/login");
  }

  const tranches = await getCachedTranches();

  const currentTranche = tranches.find(
    (tranche) => tranche.investments.length > 0
  );

  const currentTrancheInvestment = currentTranche?.investments[0];

  return (
    <DashboardLayout
      appHeaderProps={{
        primaryBreadcrumb: {
          link: "/dashboard/investments",
          title: "Investments",
        },
        secondaryBreadcrumb: "Investment Tranches",
      }}
    >
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Investment Plans</h1>

        {currentTrancheInvestment ? (
          <CurrentPlanCard
            name={currentTranche.name}
            fee={currentTranche.fee}
            coolDownInterval={currentTranche.cooldownInterval}
            dailyProfitIncrease={currentTranche.dailyProfitIncrease}
            investmentId={currentTrancheInvestment.id}
            unclaimedRewards={
              differenceInDays(
                new Date(),
                currentTrancheInvestment.lastClaimed ||
                  currentTrancheInvestment.started ||
                  new Date()
              ) *
              currentTranche.fee *
              currentTranche.dailyProfitIncrease
            }
          />
        ) : (
          <InvestNowCard />
        )}

        <h2 className="text-2xl font-semibold mb-6">Available Plans</h2>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          id="plans"
        >
          {tranches.map((tranche) => (
            <TrancheCard
              key={tranche.id}
              name={tranche.name}
              fee={tranche.fee}
              coolDownInterval={tranche.cooldownInterval}
              dailyProfitIncrease={tranche.dailyProfitIncrease}
              isCurrentTranche={
                currentTranche ? tranche.name === currentTranche.name : false
              }
              isSuggestedPlan={tranche.name === suggestedPlan}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
