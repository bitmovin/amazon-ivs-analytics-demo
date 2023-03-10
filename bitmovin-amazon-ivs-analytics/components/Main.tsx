"use client";
import AppLayout from "@cloudscape-design/components/app-layout";
import { applyMode, Mode } from "@cloudscape-design/global-styles";
import React from "react";
import { Sidebar } from "./Sidebar";


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

export type MainProps = {
  paths: string[];
  children: JSX.Element[];
};

export const Main = ({ children, paths }: MainProps ) =>
  <AppLayout
    navigation={<Sidebar paths={paths} />}
    content={children}
  />;
