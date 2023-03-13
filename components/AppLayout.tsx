"use client";

import { BreadcrumbGroup } from "@/components/BreadcrumbGroup";
import BaseAppLayout from "@cloudscape-design/components/app-layout";
import React from "react";
import { ContentLayout } from "./ContentLayout";
import { Section, SideNavigation } from "./SideNavigation";


if (typeof window === "undefined") {
  console.log(`
    CloudScape isn't fully capable of server-side rendering.
    The server had to disable useLayoutEffect manually.
    See more: https://github.com/cloudscape-design/components/pull/79
  `);
  
  React.useLayoutEffect = () => { };
}


export function AppLayout<R extends string>(props: { sections: Section<R>[], content: JSX.Element}) {
  return (
    <BaseAppLayout
      toolsHide={true}
      breadcrumbs={<BreadcrumbGroup />}
      navigation={<SideNavigation sections={props.sections}/>}
      content={<ContentLayout>{props.content}</ContentLayout>}
    />
  );
}
