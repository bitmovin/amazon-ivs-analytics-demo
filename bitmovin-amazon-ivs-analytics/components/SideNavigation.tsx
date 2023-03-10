"use client";

import BaseSideNavigation from "@cloudscape-design/components/side-navigation";
import { Route } from "next";
import { usePathname } from "next/navigation";

export function SideNavigation<T>(props: {
  items: {route: Route<T>, text: string}[]
}) {
  const path = usePathname();
  const items = props.items.map(item => ({
     type: 'link',
     text: item.text,
     href: item.route.toString()
  } as const));
  
  return (
    <BaseSideNavigation
      activeHref={path}
      items={items}
    />
  );
}