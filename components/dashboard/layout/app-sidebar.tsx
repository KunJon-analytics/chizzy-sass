"use client";

import * as React from "react";
import {
  ArrowRightLeft,
  Speech,
  Command,
  LayoutDashboard,
  LifeBuoy,
  Send,
  Settings2,
  Coins,
} from "lucide-react";
import Link from "next/link";

import { NavMain } from "@/components/dashboard/layout/nav-main";
import { NavSecondary } from "@/components/dashboard/layout/nav-secondary";
import { NavUser } from "@/components/dashboard/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { siteConfig } from "@/config/site";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    {
      title: "Transactions",
      url: "/dashboard/transactions",
      icon: ArrowRightLeft,
      items: [],
    },
    {
      title: "Rewards",
      url: "/dashboard/rewards",
      icon: Coins,
      items: [],
    },
    {
      title: "Referrals",
      url: "/dashboard/referrals",
      icon: Speech,
      items: [],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
      items: [
        {
          title: "Account",
          url: "/dashboard/account",
        },
        {
          title: "Theme",
          url: "/dashboard/theme",
        },
        {
          title: "Billing",
          url: "/dashboard/billing",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {siteConfig.name}
                  </span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
