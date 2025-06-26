import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth/auth";

/**
 * Dashboard page logic.
 *
 * Fetches session and organization data for the current user.
 * - If the user is not authenticated, returns a notFound response.
 * - If the user has no organizations, redirects to onboarding.
 * - Else, redirects to the user's first organization's dashboard.
 *
 * @async
 * @returns This function does not actually render a page;
 * it either redirects or throws a notFound response.
 */
const DashboardPage = async () => {
  const h = await headers();

  const session = await auth.api.getSession({ headers: h });
  if (!session) return notFound();

  const organizations = await auth.api.listOrganizations({ headers: h });
  if (!organizations.length) redirect("/onboarding");

  const firstOrg = organizations[0];

  redirect(`/dashboard/${firstOrg.slug}`);
};

export default DashboardPage;
