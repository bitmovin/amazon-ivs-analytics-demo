'use client';

import BaseBreadcrumbGroup from "@cloudscape-design/components/breadcrumb-group";
import { useSelectedLayoutSegments } from "next/navigation";

export const BreadcrumbGroup = () => {
  const segments = useSelectedLayoutSegments();

  return (
    <BaseBreadcrumbGroup
      items={segments.map(segment => ({
          text: segment, 
          href: `/${segment.toLowerCase()}`
        })
      )}
      ariaLabel="Route"
    />
  );
}