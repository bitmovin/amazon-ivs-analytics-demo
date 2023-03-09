"use client";

import "@cloudscape-design/global-styles/index.css";

import AppLayout from "@cloudscape-design/components/app-layout";
import {
  applyMode,
  applyDensity,
  Density,
  Mode,
} from "@cloudscape-design/global-styles";

import React from "react";
import { AppContent } from "./AppContent";

if (typeof window === "undefined") {
  console.log(`
    CloudScape isn't fully capable of server-side rendering.
    The server had to disable useLayoutEffect manually.
    See more: https://github.com/cloudscape-design/components/pull/79
  `);
  React.useLayoutEffect = () => {};
} else {
  applyMode(Mode.Dark);
  applyDensity(Density.Comfortable);
}

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppLayout content={<AppContent>{children}</AppContent>} />
    </>
  );
}


