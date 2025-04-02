import { Icons } from "@/components/icons/icons";
import type { SidebarConfig } from "@/types/config";

export const sidebarConfig: SidebarConfig = [
  {
    name: "Home",
    url: "/dashboard",
    icon: <Icons.home />,
  },
  {
    name: "Account",
    url: "/dashboard/account",
    icon: <Icons.user />,
  },
  {
    name: "Settings",
    url: "/dashboard/settings",
    icon: <Icons.settings />,
  },
];
