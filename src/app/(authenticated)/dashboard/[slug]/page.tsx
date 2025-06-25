import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { auth } from "@/auth/auth";

type OrganizationPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * Organization Page component.
 *
 * Renders the main dashboard for a specific organization, based on the provided slug.
 * Fetches full organization details on the server. If the organization is not found,
 * responds with a 404 page.
 *
 * @async
 * @param {OrganizationPageProps} props - The props for the page component.
 * @param {Promise<{ slug: string }>} props.params - The route parameters as a Promise containing the organization slug.
 * @returns {Promise<JSX.Element>} The rendered Organization Dashboard page, or a 404 if not found.
 */
const OrganizationPage = async ({ params }: OrganizationPageProps) => {
  const { slug } = await params;
  const h = await headers();

  const currentFullOrganization = await auth.api.getFullOrganization({
    headers: h,
    query: {
      organizationSlug: slug,
    },
  });

  if (!currentFullOrganization) return notFound();

  const orgName = currentFullOrganization.name;

  return (
    <div>
      <div>Welcome to {orgName} dashboard!</div>
      The Id of org is {currentFullOrganization.id}
    </div>
  );
};

export default OrganizationPage;
