"use client";

import { Route } from "next";
import { useRouter } from "next/navigation";
import React, { Suspense, lazy } from "react";
import { useRoute } from "./hooks/useQuery";

const LazyBreadcrumbGroup = lazy(() => import("@cloudscape-design/components/breadcrumb-group"));

if (typeof window === "undefined") {
  React.useLayoutEffect = () => ({});
}

export default function ClientBreadcrumbGroup(props: {}) {
  const router = useRouter();

  const route = useRoute();
  const routeParts = route[0].split("?")[0].split("/");
  const breadcrumbs: { text: string; href: string }[] = [];
  for (let i = 0; i < routeParts.length; i++) {
    breadcrumbs.push({
      text: routeParts[i].toUpperCase().replaceAll("-", " ") || "/",
      href: (routeParts.slice(0, i + 1).join("/") || "/") + "?" + route[0].split("?")[1],
    });
  }

  return (
    <Suspense fallback={<span>Loading...</span>}>
      <LazyBreadcrumbGroup
        items={breadcrumbs}
        onFollow={(e) => {
          e.preventDefault();
          router.replace(e.detail.href as Route);
        }}
        onClick={(e) => {
          e.preventDefault();
          router.replace(e.detail.href as Route);
        }}
      />
    </Suspense>
  );
}
