"use client";

import '@cloudscape-design/global-styles/index.css';
import TopNavigation, { TopNavigationProps } from "@cloudscape-design/components/top-navigation";
import { useRouter } from "next/navigation";
import React from "react";

if (typeof window === 'undefined') {
    React.useLayoutEffect = React.useEffect;
}

export type Props = Omit<TopNavigationProps, 'i18nStrings' | 'identity'>

export default function(props: Props) {
  const router = useRouter();

  return (
      <TopNavigation
        {...props}
        identity={{
          title: 'Title',
          href: '/',
          logo: {
            src: '/favicon.ico',
            alt: 'logo'
          },
          onFollow: (event) => {
            event.preventDefault();
            return router.replace('/', {
              forceOptimisticNavigation: true,
            });
          },
        }}
        i18nStrings={{
          overflowMenuTitleText: 'Menu', 
          overflowMenuTriggerText: 'Show'
      }} />
  );
}