'use client';

import * as Base from "@cloudscape-design/components/breadcrumb-group";
import { Route } from "next";
import { usePathname, useRouter, useSelectedLayoutSegments } from "next/navigation";

export type Item = Base.BreadcrumbGroupProps.Item;
export type ClickDetail<T extends Item = Item> = Base.BreadcrumbGroupProps.ClickDetail<T>
export type RouteEvent<T extends Item = Item> = CustomEvent<ClickDetail<T>>
export type RemovedProps = 'items' | 'onFollow' | 'onClick';
export type Props<T extends Item = Item> = Omit<Base.BreadcrumbGroupProps<T>, RemovedProps>

export function BreadcrumbGroup(props: Props) {
  const router = useRouter();
  const segments = useSelectedLayoutSegments();
  
  const entries = Array.from(segments.entries()).map(([key, val]) => ({
    text: `${val[0].toUpperCase()}${val.slice(1).toLowerCase()}`,
    href: `/${segments.slice(0, key + 1).join('/')}`,
  }));

  const items = [{href: '/', text: 'Home'}, ...entries];

  const onClick = (e: RouteEvent) => {
    e.preventDefault();
    router.replace(e.detail.href)
  }
  
  return (
    <Base.default {...props} items={items} onFollow={onClick} onClick={onClick} />
  );
}