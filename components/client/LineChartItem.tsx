"use client";

import { useContainerQuery } from "@cloudscape-design/component-toolkit";
import type { LineChartProps } from "@cloudscape-design/components/line-chart";
import type { ChartDataTypes } from "@cloudscape-design/components/mixed-line-bar-chart/interfaces";
import React from "react";
import LineChart from "./LineChart";

if (typeof window === "undefined") {
  React.useLayoutEffect = React.useEffect;
}

export default function LineChartItem({
  fallback,
  ...props
}: LineChartProps<ChartDataTypes> & { fallback: JSX.Element }) {
  const [size, containerQueryRef] = useContainerQuery((entry) => ({
    height: entry.contentBoxHeight,
    width: entry.contentBoxWidth,
  }));

  return (
    <div
      className="chart-container"
      ref={containerQueryRef}
      {...{
        style: {
          height: "100%",
          width: "100%",
        },
      }}
    >
      <LineChart {...props} height={(size?.height || props.height || 200) - 100} fallback={fallback} />
    </div>
  );
}
