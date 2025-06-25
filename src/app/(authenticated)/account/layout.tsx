import type { ReactNode } from "react";
import type { JSX } from "react";

import Header from "@components/sidebar/header";
import { SidebarInset, SidebarProvider } from "@components/ui/sidebar";

import AppSidebar from "@/features/user/components/app-sidebar";

type layoutProps = {
  children: ReactNode;
};

/**
 * Account Layout component that wraps its children.
 *
 * This layout file renders
 *  - SidebarProvider
 *  - AppSidebar
 *  - SidebarInset
 *  - Header
 *  - childrens
 *
 * @param {object} props - The layout properties.
 * @param {ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered layout with children.
 */
const layout = ({ children }: layoutProps): JSX.Element => {
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
