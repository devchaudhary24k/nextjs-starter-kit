import type { ComponentType } from "react";

import type { LucideProps } from "lucide-react";
import {
  Bell,
  Calendar,
  Command,
  Home,
  Inbox,
  Link,
  Search,
  Settings,
  ShieldUser,
  User,
} from "lucide-react";

export type Icon = ComponentType<LucideProps>;

export const Icons = {
  user: User,
  calender: Calendar,
  home: Home,
  inbox: Inbox,
  search: Search,
  settings: Settings,
  logo: Command,
  shieldUser: ShieldUser,
  bell: Bell,
  link: Link,
};
