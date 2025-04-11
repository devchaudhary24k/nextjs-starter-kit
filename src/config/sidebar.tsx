import { Icons } from "@/components/icons/icons";
import type { SidebarConfig } from "@/types/config";

export const getSidebarConfig = (slug: string): SidebarConfig => [
  {
    name: "Home",
    url: `/dashboard/${slug}`,
    icon: <Icons.home />,
  },
  {
    name: "Settings",
    url: `/dashboard/${slug}/settings`,
    icon: <Icons.settings />,
  },
];
