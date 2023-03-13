"use client";

import BaseSideNavigation from "@cloudscape-design/components/side-navigation";
import { Route } from "next";
import { usePathname } from "next/navigation";

interface Item<R extends string> {
  name: string,
  route: Route<R>
}

interface Section<R extends string> {
  name: string,
  route: Route<R>
  items: Item<R>[]
}

interface Navigation<R extends string> {
  name: string,
  route: Route<R>
  sections: Section<R>[]
}

export function SideNavigation<R extends string>(props: Navigation<R>) {
  const header = {href: props.route, text: props.name};

  const path = usePathname();

  const items = props.sections.map(section => ({
     type: 'section' as const,
     defaultExpanded: true,
     text: section.name,
     href: section.route,
     items: section.items.map(item => ({
        type: 'link' as const,
        text: item.name,
        href: item.route
     }))
  })); 
  
  return (
    <BaseSideNavigation
      header={header}
      activeHref={path}
      items={items}
    />
  );
}