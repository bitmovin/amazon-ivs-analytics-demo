"use client";

import * as Base from "@cloudscape-design/components/top-navigation";
import { Route } from "next";
import { useRouter } from "next/navigation";

export type Props<R extends string> = Omit<Base.TopNavigationProps, 'identity'> & {
  identity: Omit<Base.TopNavigationProps['identity'], 'href' | 'onFollow'> & { href: Route<R> }
}

export function TopNavigation<R extends string>(props: Props<R>) {
  const router = useRouter();

  if (typeof window === 'undefined') {  
    throw Error(`
        CloudScape isn't fully capable of server-side rendering.
        See more: https://github.com/cloudscape-design/components/pull/79
    `)
  }

  const identity = {
      ...props.identity, 
      onFollow: (e: CustomEvent) => {
        e.preventDefault();
        return router.replace(props.identity.href)
      }
    };

  return (
      <Base.default {...props} identity={identity} />
  );
};
