import type { ComponentType } from "react";

import type { LucideProps } from "lucide-react";
import { User } from "lucide-react";

export type Icon = ComponentType<LucideProps>;

export const Icons = {
  user: User,
};
