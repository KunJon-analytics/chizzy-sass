import { notFound } from "next/navigation";

import DashboardLayout from "@/components/dashboard/layout/dashboard-layout";
import PageContainer from "@/components/dashboard/page-container";
import { getCachedTransaction } from "@/lib/services/transactions";
import TransactionDetailCard from "./_components/transaction-detail-card";

export default async function TransactionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const transaction = await getCachedTransaction(params.id);

  if (!transaction) {
    notFound();
  }

  return (
    <DashboardLayout
      appHeaderProps={{
        primaryBreadcrumb: {
          link: "/dashboard/transactions",
          title: "Transactions",
        },
        secondaryBreadcrumb: `${params.id.substring(0, 7)}`,
      }}
    >
      <PageContainer scrollable>
        <div className="space-y-2">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Transaction Receipt 🧾
            </h2>
          </div>
          <TransactionDetailCard transaction={transaction} />
        </div>
      </PageContainer>
    </DashboardLayout>
  );
}
