'use client';

import BreadcrumbGroup from "@cloudscape-design/components/breadcrumb-group";

export const Route = ({items}:{items:string[]}) => {
  return (
    <BreadcrumbGroup
      items={
        items.map(text => ({
          text, 
          href: `/${text.toLowerCase()}`
        })
      )}
      ariaLabel="Route"
    />
  );
}