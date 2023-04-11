"use client";

import type { LineChartProps } from "@cloudscape-design/components/line-chart";
import type { ChartDataTypes } from "@cloudscape-design/components/mixed-line-bar-chart/interfaces";
import React, { Suspense, lazy } from "react";

const LazyLineChart = lazy(() => import("@cloudscape-design/components/line-chart"));

if (typeof window === "undefined") {
  React.useLayoutEffect = React.useEffect;
}

export default function LineChart({ fallback, ...props }: LineChartProps<ChartDataTypes> & { fallback: JSX.Element }) {
  return (
    <Suspense fallback={fallback}>
      <LazyLineChart {...props} />
    </Suspense>
  );
}
