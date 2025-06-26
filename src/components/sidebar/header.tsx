"use client";

import { usePathname } from "next/navigation";

import { Separator } from "@components/ui/separator";
import { SidebarTrigger } from "@components/ui/sidebar";

const Header = () => {
  const pathname = usePathname();

  // Check if the path starts with /dashboard/ and has only the [slug]
  if (pathname.startsWith("/dashboard/") && pathname.split("/").length === 3) {
    return (
      <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-base font-medium">Dashboard</h1>
        </div>
      </header>
    );
  }

  // For other paths, extract the last segment and capitalize it
  const segments = pathname.split("/").filter(Boolean); // removes empty strings
  const title = segments[segments.length - 1]; // default to "Home" if no segments
  const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{formattedTitle}</h1>
      </div>
    </header>
  );
};

export default Header;
