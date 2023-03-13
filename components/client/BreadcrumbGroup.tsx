'use client';

import BreadcrumbGroup, { BreadcrumbGroupProps } from "@cloudscape-design/components/breadcrumb-group";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";

export type Item = BreadcrumbGroupProps.Item;
export type ClickDetail<T extends Item = Item> = BreadcrumbGroupProps.ClickDetail<T>
export type RouteEvent<T extends Item = Item> = CustomEvent<ClickDetail<T>>
export type RemovedProps = 'items' | 'onFollow' | 'onClick';
export type Props<T extends Item = Item> = Omit<BreadcrumbGroupProps<T>, RemovedProps>

export default function(props: Props) {
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
    <BreadcrumbGroup {...props} items={items} onFollow={onClick} onClick={onClick} />
  );
}