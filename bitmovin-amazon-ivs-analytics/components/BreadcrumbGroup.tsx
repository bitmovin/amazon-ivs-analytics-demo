'use client';

import BaseBreadcrumbGroup from "@cloudscape-design/components/breadcrumb-group";
import { useSelectedLayoutSegments } from "next/navigation";

export const BreadcrumbGroup = () => {
  const segments = useSelectedLayoutSegments();
  const items = [{ text: 'Home', href: '/' }].concat(segments.map((segment) => ({
    text: segment[0].toUpperCase() + segment.slice(1).toLowerCase(), 
    href: `/${segments.slice(0, segments.indexOf(segment) + 1).join('/')}`,
  })));

  return (
    <BaseBreadcrumbGroup items={items}  />
  );
}