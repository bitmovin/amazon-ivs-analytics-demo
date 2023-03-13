"use client";

import { BreadcrumbGroup } from "@/components/BreadcrumbGroup";
import BaseAppLayout from "@cloudscape-design/components/app-layout";
import React from "react";


if (typeof window === "undefined") {
  console.log(`
    CloudScape isn't fully capable of server-side rendering.
    The server had to disable useLayoutEffect manually.
    See more: https://github.com/cloudscape-design/components/pull/79
  `);
  
  React.useLayoutEffect = () => { };
}


export function AppLayout(props: {navigation: JSX.Element, content: JSX.Element}) {
  return (
    <BaseAppLayout
      breadcrumbs={<BreadcrumbGroup />}
      navigation={props.navigation}
      content={props.content}
    />
  );
}
