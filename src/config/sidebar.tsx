import { Icons } from "@/components/icons/icons";
import type { SidebarConfig } from "@/types/config";

export const getDashboardSidebarConfig = (slug: string): SidebarConfig => [
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

export const accountSidebarConfig: SidebarConfig = [
  {
    name: "Account",
    url: "/account",
    icon: <Icons.user />,
  },
  {
    name: "Security",
    url: "/account/security",
    icon: <Icons.shieldUser />,
  },
  {
    name: "Notification",
    url: "/account/notification",
    icon: <Icons.bell />,
  },
  {
    name: "Linked Accounts",
    url: "/account/connections",
    icon: <Icons.link />,
  },
];
