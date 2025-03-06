import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { auth } from "@/auth/auth";

type OnboardingLayoutProps = {
  children: ReactNode;
};

const OnboardingLayout = async ({ children }: OnboardingLayoutProps) => {
  const h = await headers();

  const organizationList = await auth.api.listOrganizations({
    headers: h,
  });

  if (organizationList.length !== 0) {
    redirect("/dashboard");
  }

  return <main>{children}</main>;
};

export default OnboardingLayout;
