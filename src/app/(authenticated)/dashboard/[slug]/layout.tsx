import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import Header from "@components/sidebar/header";
import { SidebarInset, SidebarProvider } from "@components/ui/sidebar";
import { AppSidebar } from "@features/dashboard/components/app-sidebar";
import { and, eq } from "drizzle-orm";

import { auth } from "@/auth/auth";
import { db } from "@/database";
import { member, organization } from "@/database/schema";

export const metadata: Metadata = {
  title: "Dashboard",
};

type DashboardLayoutProps = PropsWithChildren<{
  params: Promise<{
    slug: string;
  }>;
}>;

/**
 * Dashboard Layout Component.
 *
 * Server-side layout for dashboard pages. This layout is responsible for:
 * - Fetching the current user's session. Redirects or returns 404 if unauthenticated.
 * - Fetching the user's organizations and redirecting to onboarding if none exist.
 * - Validating the user's membership in the organization (by slug). Shows 404 if access denied.
 * - Reading the sidebar state from cookies to control sidebar UI.
 * - Providing the organization/user context to sidebar and dashboard children.
 *
 * @async
 * @param DashboardLayoutProps - The layout props
 * @param DashboardLayoutProps.children - The dashboard page content
 * @param DashboardLayoutProps.params - Route parameters (slug wrapped in a promise)
 * @returns The layout wrapping the dashboard page, with sidebar and header, or redirects/notFound as needed.
 */
const DashboardLayout = async ({ children, params }: DashboardLayoutProps) => {
  const { slug } = await params;
  const cookieStore = await cookies();
  const h = await headers();

  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  const session = await auth.api.getSession({
    headers: h,
  });

  if (!session) return notFound();

  const organizationList = await auth.api.listOrganizations({
    headers: h,
  });

  if (!organizationList.length) redirect("/onboarding");

  const orgWithMembership = await db
    .select()
    .from(organization)
    .innerJoin(member, eq(organization.id, member.organizationId))
    .where(and(eq(organization.slug, slug), eq(member.userId, session.user.id)))
    .limit(1);

  if (!orgWithMembership.length) return notFound();

  const activeOrganization = orgWithMembership[0].organization;

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar
        user={session.user}
        organizationList={organizationList}
        activeOrganization={activeOrganization}
      />
      <SidebarInset>
        <Header />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
