import { cookies, headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";

import { SidebarInset, SidebarProvider } from "@components/ui/sidebar";
import { AppSidebar } from "@features/dashboard/components/app-sidebar";

import { auth } from "@/auth/auth";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const cookieStore = await cookies();
  const h = await headers();

  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  const session = await auth.api.getSession({
    headers: h,
  });

  const organizationList = await auth.api.listOrganizations({
    headers: h,
  });

  const activeOrganization = await auth.api.getFullOrganization({
    headers: h,
  });

  if (!session) return notFound();
  // TODO: Redirect to organization creation if no organizations exist.
  if (organizationList.length === 0) {
    redirect("/onboarding");
  }

  const user = session.user;

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar
        user={user}
        organizationList={organizationList}
        activeOrganization={activeOrganization!}
      />
      <SidebarInset>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
