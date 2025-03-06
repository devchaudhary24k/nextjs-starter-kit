"use client";

import Image from "next/image";
import { useState } from "react";

import { ChevronsUpDown, Plus } from "lucide-react";

import { authClient } from "@/auth/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import type {
  ActiveOrganization,
  Organization,
  OrganizationList,
} from "@/types/auth";

type TeamSwitcherProps = {
  teams: OrganizationList;
  currentActiveTeam: ActiveOrganization;
};

export function TeamSwitcher({ teams, currentActiveTeam }: TeamSwitcherProps) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = useState<
    Organization | ActiveOrganization | null
  >(currentActiveTeam);

  if (!activeTeam) return null;

  const changeTeam = async (team: Organization) => {
    await authClient.organization.setActive({
      organizationId: team.id,
    });

    setActiveTeam(team);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                {/*<activeTeam.logo className="size-4" />*/}
                {activeTeam.logo ? (
                  <Image
                    src={activeTeam.logo}
                    width={8}
                    height={8}
                    alt={activeTeam.name}
                  />
                ) : (
                  <span>test</span>
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>
                <span className="truncate text-xs">{activeTeam.slug}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() =>
                  // setActiveTeam(team)
                  changeTeam(team)
                }
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {/*<team.logo className="size-4 shrink-0" />*/}
                  {team.logo ? (
                    <Image
                      src={team.logo}
                      width={8}
                      height={8}
                      alt={team.name}
                    />
                  ) : (
                    <span>test</span>
                  )}
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
