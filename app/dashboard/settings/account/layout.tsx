import DashboardLayout from "@/components/dashboard/layout/dashboard-layout";
import PageContainer from "@/components/dashboard/page-container";

export const metadata = {
  title: "Dashboard : Account",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout
      appHeaderProps={{
        primaryBreadcrumb: { link: "/dashboard/settings", title: "Settings" },
        secondaryBreadcrumb: "Account",
      }}
    >
      <PageContainer scrollable>
        <div className="space-y-2">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">My account 🧑</h2>
          </div>
          {children}
        </div>
      </PageContainer>
    </DashboardLayout>
  );
}
