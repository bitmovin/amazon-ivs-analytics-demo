"use client";

import SideNavigation, { SideNavigationProps } from "@cloudscape-design/components/side-navigation";
import { usePathname, useRouter } from "next/navigation";

export type RemovedProps = 'activeHref' | 'onFollow' | 'onChange';
export type Props = Omit<SideNavigationProps, RemovedProps>;

export default function(props: SideNavigationProps) {
  const router = useRouter();
  const activeHref = usePathname();
  
  return (
    <SideNavigation {...props}
      activeHref={activeHref}
      onFollow={({detail}) => { router.replace(detail.href) }}
      onChange={({detail}) => { 'href' in detail.item ? router.replace(detail.item.href) : {}}}
    />
  );
}