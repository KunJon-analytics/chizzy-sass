import { cookies } from "next/headers";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/layout/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
