import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth/auth";

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
