'use client';

import * as React from "react";
import BreadcrumbGroup from "@cloudscape-design/components/breadcrumb-group";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

export const Route = ({items}:{items:{text:string, href:string}[]}) => {
  return (
    <BreadcrumbGroup
      items={items}
      ariaLabel="Route"
    />
  );
}