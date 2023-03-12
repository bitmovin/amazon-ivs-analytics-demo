"use client";

import BaseSideNavigation from "@cloudscape-design/components/side-navigation";
import { Route } from "next";
import { usePathname } from "next/navigation";

interface Item<R extends string> {
  name: string,
  path: R,
}

interface Section<R extends string> {
  name: string,
  path: Route<R>,
  items: Item<R>[]
}

interface Navigation<R extends string> {
  name: string,
  path: Route<R>,
  sections: Section<R>[]
}

export function SideNavigation<R extends string>(props: Navigation<R>) {
  const path = usePathname();

  const items = props.sections.map(section => ({
     type: 'section' as const,
     defaultExpanded: true,
     text: section.name,
     href: section.path,
     items: section.items.map(item => ({
        type: 'link' as const,
        text: item.name,
        href: item.path
     }))
  })); 
  
  return (
    <BaseSideNavigation
      header={{href: props.path, text: props.name}}
      activeHref={path}
      items={items}
    />
  );
}