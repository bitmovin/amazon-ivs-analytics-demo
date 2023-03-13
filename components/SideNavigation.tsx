"use client";

import BaseSideNavigation from "@cloudscape-design/components/side-navigation";
import { Route } from "next";
import { usePathname } from "next/navigation";

export type Item<R extends string> = {
  name: string,
  route: Route<R>
}

export type Section<R extends string> = Item<R> & {
  items: Item<R>[]
}

export function SideNavigation<R extends string>(props: { sections: Section<R>[] }) {
  const activeHref = usePathname();
  const header = {href: '/', text: 'Home'};

  const items = props.sections.map(section => ({
     type: 'section' as const,
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
      activeHref={activeHref}
      items={items}
    />
  );
}