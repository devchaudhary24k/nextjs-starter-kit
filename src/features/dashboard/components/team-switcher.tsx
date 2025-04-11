"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { ChevronsUpDown, Plus } from "lucide-react";

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
import type { Organization, OrganizationList } from "@/types/auth";

type TeamSwitcherProps = {
  teams: OrganizationList;
  currentActiveTeam: Organization;
};

export function TeamSwitcher({ teams, currentActiveTeam }: TeamSwitcherProps) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = useState(currentActiveTeam);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    setActiveTeam(currentActiveTeam);
  }, [currentActiveTeam]);

  const handleTeamSwitch = (slug: string) => {
    if (slug === activeTeam.slug) return;

    startTransition(() => {
      router.push(`/dashboard/${slug}`);
    });
  };

  if (!activeTeam) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isPending}>
            <SidebarMenuButton
              size="lg"
              disabled={isPending}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                {activeTeam.logo ? (
                  <Image
                    src={activeTeam.logo}
                    width={8}
                    height={8}
                    alt={activeTeam.name}
                  />
                ) : (
                  <span>{activeTeam.name[0]}</span>
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
                key={team.id}
                onSelect={(e) => {
                  e.preventDefault();
                  handleTeamSwitch(team.slug || team.id); // fallback to ID if slug is null
                }}
                className="cursor-pointer gap-2 p-2"
                disabled={isPending}
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {team.logo ? (
                    <Image
                      src={team.logo}
                      width={8}
                      height={8}
                      alt={team.name}
                    />
                  ) : (
                    <span>{team.name[0]}</span>
                  )}
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" disabled={isPending}>
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
