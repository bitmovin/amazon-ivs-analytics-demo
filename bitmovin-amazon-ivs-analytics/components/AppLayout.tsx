"use client";
import { applyMode, Mode } from "@cloudscape-design/global-styles";
import BaseAppLayout from "@cloudscape-design/components/app-layout";
import React from "react";


if (typeof window === "undefined") {
  console.log(`
  CloudScape isn't fully capable of server-side rendering.
  The server had to disable useLayoutEffect manually.
  See more: https://github.com/cloudscape-design/components/pull/79
`);
  
  React.useLayoutEffect = () => { };
} else {
  applyMode(Mode.Dark);
}


export function AppLayout(props: {breadcrumbs: JSX.Element, navigation: JSX.Element, content: JSX.Element}) {
  return (
    <BaseAppLayout
      breadcrumbs={props.breadcrumbs}
      navigation={props.navigation}
      content={props.content}
    />
  );
}
