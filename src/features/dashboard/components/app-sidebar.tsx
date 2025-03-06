"use client";

import * as React from "react";

import { NavMain } from "@features/dashboard/components/nav-main";
import { NavUser } from "@features/dashboard/components/nav-user";
import { TeamSwitcher } from "@features/dashboard/components/team-switcher";
import {
  User as Account,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Home,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import type { ActiveOrganization, OrganizationList, User } from "@/types/auth";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Account",
      url: "/dashboard/account",
      icon: Account,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
};

// TODO: Add proper types here
type AppSidebarProps = {
  user: User;
  organizationList: OrganizationList;
  activeOrganization: ActiveOrganization;
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
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
