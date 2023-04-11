"use client";

import type { SpinnerProps } from "@cloudscape-design/components/spinner";
import React, { Suspense, lazy } from "react";

const LazySpinner = lazy(() => import("@cloudscape-design/components/spinner"));

if (typeof window === "undefined") {
  React.useLayoutEffect = () => ({});
}

export default function Spinner({ ...props }: SpinnerProps) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LazySpinner {...props} />
    </Suspense>
  );
}
