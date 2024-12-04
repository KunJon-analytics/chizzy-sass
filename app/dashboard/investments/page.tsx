import DashboardLayout from "@/components/dashboard/layout/dashboard-layout";
import PageContainer from "@/components/dashboard/page-container";
import { Investments } from "./_components/investments";

export const metadata = {
  title: "Dashboard : Investments",
};

export default function InvestmentsPage() {
  return (
    <DashboardLayout
      appHeaderProps={{
        primaryBreadcrumb: { link: "/dashboard", title: "Dashboard" },
        secondaryBreadcrumb: "Investments",
      }}
    >
      <PageContainer scrollable>
        <div className="space-y-2">
          <Investments />
        </div>
      </PageContainer>
    </DashboardLayout>
  );
}