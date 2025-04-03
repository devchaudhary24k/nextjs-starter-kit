import type { ReactElement } from "react";

export type SidebarItem = {
  name: string;
  url: string;
  icon: ReactElement;
};

export type SidebarConfig = SidebarItem[];

export type SiteConfig = {
  name: string;
  description: string;
  short_name: string;
  url: string;
};
