"use client";

import SideNavigation, { SideNavigationProps } from "@cloudscape-design/components/side-navigation";
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

export default function<R extends string>(props: { header: Header<R>, items: ItemList<R> }) {
  const router = useRouter();
  const activeHref = usePathname();
  
  return (
    <SideNavigation
      header={props.header}
      onFollow={(event) => { event.preventDefault(); router.replace(event.detail.href) }}
      activeHref={activeHref}
      items={props.items}
    />
  );
}