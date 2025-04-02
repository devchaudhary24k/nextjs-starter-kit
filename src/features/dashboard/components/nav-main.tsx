"use client";

import { usePathname } from "next/navigation";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { SidebarConfig } from "@/types/config";

type NavMainProps = {
  items: SidebarConfig;
};

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname();

  const SidebarItems = items.map((item) => {
    const isActive = pathname === item.url;

    return {
      name: item.name,
      url: item.url,
      icon: item.icon,
      isActive,
    };
  });

  console.log(SidebarItems);

  return (
    <SidebarMenu>
      {SidebarItems.map((item) => (
        <SidebarMenuItem key={item.name}>
          <SidebarMenuButton asChild isActive={item.isActive}>
            <a href={item.url}>
              {item.icon}
              <span>{item.name}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
