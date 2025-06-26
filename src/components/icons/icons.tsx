import type { ComponentType } from "react";

import type { LucideProps } from "lucide-react";
import {
  ArrowLeft,
  Bell,
  Calendar,
  Command,
  Edit,
  Home,
  Inbox,
  LaptopMinimal,
  Link,
  Search,
  Settings,
  ShieldUser,
  Smartphone,
  Trash2,
  Upload,
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
  arrowLeft: ArrowLeft,
  bin: Trash2,
  upload: Upload,
  edit: Edit,
  laptop: LaptopMinimal,
  smartPhone: Smartphone,
};
