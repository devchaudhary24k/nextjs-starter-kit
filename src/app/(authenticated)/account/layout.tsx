import type { ReactNode } from "react";

import Header from "@components/sidebar/header";
import { SidebarInset, SidebarProvider } from "@components/ui/sidebar";

import AppSidebar from "@/features/user/components/app-sidebar";

type layoutProps = {
  children: ReactNode;
};

const layout = ({ children }: layoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default layout;
