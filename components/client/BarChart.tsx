"use client";

import React, { Suspense, lazy, useState } from "react";

import type { BarChartProps } from "@cloudscape-design/components/bar-chart";
import type { ChartDataTypes } from "@cloudscape-design/components/mixed-line-bar-chart/interfaces";

const LazyBarChart = lazy(() => import("@cloudscape-design/components/bar-chart"));

if (typeof window === "undefined") {
  React.useLayoutEffect = React.useEffect;
}

export default function ClientBarChart({
  fallback,
  ...props
}: BarChartProps<ChartDataTypes> & { fallback: JSX.Element }) {
  const [visibleSeries, setVisibleSeries] = useState(props.series);
  const [xDomain, setXDomain] = useState(props.xDomain || props.series.map((series) => series.title));

  return (
    <Suspense fallback={fallback}>
      <LazyBarChart
        {...props}
        visibleSeries={visibleSeries}
        xDomain={xDomain}
        onFilterChange={(event) => {
          if (event.detail.visibleSeries) {
            const visibleSeries = event.detail.visibleSeries.flatMap((series) =>
              series.type === "bar" ? [series] : []
            );
            setVisibleSeries(visibleSeries);
            setXDomain(visibleSeries.map((series) => series.title));
          }
        }}
      />
    </Suspense>
  );
}
