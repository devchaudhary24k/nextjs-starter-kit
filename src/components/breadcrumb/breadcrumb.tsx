"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb";

const BreadcrumbComponent = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbItems = pathSegments.map((segment, idx) => {
    const href = `/${pathSegments.slice(0, idx + 1).join("/")}`;
    const formattedSegment = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      text: formattedSegment,
      href,
    };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Hard-coded Dashboard item */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>

        {/* Map through remaining breadcrumb items (starting from index 1 if "dashboard" is the first segment) */}
        {breadcrumbItems.slice(1).map((item, idx) => (
          <Fragment key={idx}>
            <BreadcrumbSeparator />
            <BreadcrumbItem key={idx}>
              <BreadcrumbLink href={item.href}>{item.text}</BreadcrumbLink>
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
