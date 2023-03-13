'use client';

import BaseBreadcrumbGroup from "@cloudscape-design/components/breadcrumb-group";
import { useSelectedLayoutSegments } from "next/navigation";
import { useRouter } from "next/navigation";


export function BreadcrumbGroup() {
  const segments = useSelectedLayoutSegments();
  const items = [{ text: 'Home', href: '/' }].concat(segments.map((segment) => ({
    text: segment[0].toUpperCase() + segment.slice(1).toLowerCase(), 
    href: `/${segments.slice(0, segments.indexOf(segment) + 1).join('/')}`,
  })));

  const router = useRouter();

  return (
    <BaseBreadcrumbGroup
      items={items}
      onFollow={({detail}) => router.replace(detail.href)}
    />
  );
}