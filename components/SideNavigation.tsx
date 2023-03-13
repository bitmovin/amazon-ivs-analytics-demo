"use client";

import BaseSideNavigation, { SideNavigationProps } from "@cloudscape-design/components/side-navigation";
import { Route } from "next";
import { usePathname, useRouter } from "next/navigation";

export type Item<R extends string> = {
  type: 'link',
  text: string,
  href: Route<R>
}

export type Section<R extends string> = {
  type: 'link-group',
  text: string,
  href: Route<R>,
  items: Item<R>[]
}

export type Header<R extends string> = {
  text: string;
  href: Route<R>;
  logo?: SideNavigationProps.Logo;
}

export type ItemList<R extends string> = ReadonlyArray<Section<R> | Item<R>>

export function SideNavigation<R extends string>(props: { header: Header<R>, items: ItemList<R> }) {
  const router = useRouter();
  const activeHref = usePathname();
  
  return (
    <BaseSideNavigation
      header={props.header}
      onFollow={({detail}) => router.replace(detail.href)}
      activeHref={activeHref}
      items={props.items}
    />
  );
}