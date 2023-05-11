"use client";

import React, { Suspense, lazy, useState } from "react";

import type { AppLayoutProps } from "@cloudscape-design/components/app-layout";
import { useRoute } from "./hooks/useQuery";
import ClientBreadcrumbGroup from "@/components/client/BreadcrumbGroup";

const LazyAppLayout = lazy(() => import("@cloudscape-design/components/app-layout"));

if (typeof window === "undefined") {
  React.useLayoutEffect = React.useEffect;
}

export default function AppLayout(props: AppLayoutProps) {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <Suspense fallback={props.content}>
      <LazyAppLayout
        {...props}
        breadcrumbs={<ClientBreadcrumbGroup></ClientBreadcrumbGroup>}
        navigationOpen={props.navigationHide === false && navigationOpen}
        onNavigationChange={({ detail }) => {
          if (props.navigationHide === false) {
            setNavigationOpen(detail.open);
          }
        }}
        toolsOpen={props.toolsHide === false && toolsOpen}
        onToolsChange={({ detail }) => {
          if (props.toolsHide === false) {
            setToolsOpen(detail.open);
          }
        }}
      />
    </Suspense>
  );
}
