import { cookies, headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";

import { Separator } from "@components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@components/ui/sidebar";
import { AppSidebar } from "@features/dashboard/components/app-sidebar";

import { auth } from "@/auth/auth";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";

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
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb />
          </div>
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
