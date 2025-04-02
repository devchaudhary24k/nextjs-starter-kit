import type { ReactElement } from "react";

export type SidebarItem = {
  name: string;
  url: string;
  icon: ReactElement;
};

export type SidebarConfig = SidebarItem[];
