import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@components/ui/sidebar";
import { AppSidebar } from "@features/dashboard/components/app-sidebar";
import { and, eq } from "drizzle-orm";

import { auth } from "@/auth/auth";
import { db } from "@/database";
import { member, organization } from "@/database/schema";

export const metadata: Metadata = {
  title: "Dashboard",
};

type DashboardLayoutProps = {
  children: ReactNode;
  params: Promise<{
    slug: string;
  }>;
};

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
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
