import type { ComponentType } from "react";

import type { LucideProps } from "lucide-react";
import {
  Calendar,
  Command,
  Home,
  Inbox,
  Search,
  Settings,
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
};
