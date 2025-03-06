"use client";

// import { headers } from "next/headers";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@components/ui/breadcrumb";
import { Separator } from "@components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@components/ui/sidebar";

// import { auth } from "@/auth/auth";

const DashboardPage = () => {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // const user = session?.user;
  // const { data: activeOrganization } = authClient.useActiveOrganization();

  return (
    <div>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/*<div>{JSON.stringify(user)}</div>*/}
          {/*<div>{JSON.stringify(activeOrganization)}</div>*/}
        </div>
      </SidebarInset>
    </div>
  );
};

export default DashboardPage;
