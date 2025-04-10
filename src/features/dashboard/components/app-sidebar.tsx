"use client";

import * as React from "react";

import { NavMain } from "@features/dashboard/components/nav-main";
import { NavUser } from "@features/dashboard/components/nav-user";
import { TeamSwitcher } from "@features/dashboard/components/team-switcher";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getSidebarConfig } from "@/config/sidebar";
import type { Organization, OrganizationList, User } from "@/types/auth";

type AppSidebarProps = {
  user: User;
  organizationList: OrganizationList;
  activeOrganization: Organization;
} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({
  user,
  organizationList,
  activeOrganization,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={organizationList}
          currentActiveTeam={activeOrganization}
        />
        <NavMain items={getSidebarConfig(activeOrganization.slug)} />
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
