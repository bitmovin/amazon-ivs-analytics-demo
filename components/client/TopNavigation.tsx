"use client";

import TopNavigation, { TopNavigationProps } from "@cloudscape-design/components/top-navigation";
import { useRouter } from "next/navigation";
import React from "react";

if (typeof window === 'undefined') {
    React.useLayoutEffect = React.useEffect;
}

export default function(props: TopNavigationProps) {
  const router = useRouter();

  const identity = {
    ...props.identity, 
    onFollow: (e: CustomEvent) => {
      e.preventDefault();
      return router.replace(props.identity.href)
    }
  };

  return (
      <TopNavigation {...props} identity={identity} />
  );
}