import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import { auth } from "@/auth/auth";

type OnboardingLayoutProps = PropsWithChildren;

/**
 * Onboarding Layout
 *
 * This function checks the organization list for the logged in user.
 * - If user already have an organization the user is sent to /dashboard
 * - If the user doesn't have any organization the onboarding process is continued
 *
 * @param OnboardingLayoutProps - The layout properties.
 * @param OnboardingLayoutProps.children - The child components to be rendered within the layout.
 * @returns The rendered layout with children
 */
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
