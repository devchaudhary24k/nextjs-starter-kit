import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { auth } from "@/auth/auth";

type pageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const page = async ({ params }: pageProps) => {
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

export default page;
