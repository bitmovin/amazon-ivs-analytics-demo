"use client";

import React, { Suspense, lazy } from "react";

import type { AreaChartProps } from "@cloudscape-design/components";
import type { ChartDataTypes } from "@cloudscape-design/components/mixed-line-bar-chart/interfaces";

const LazyAreaChart = lazy(
	() => import("@cloudscape-design/components/area-chart")
);

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function ClientAreaChart({
	fallback,
	...props
}: AreaChartProps<ChartDataTypes> & { fallback: JSX.Element }) {
	return (
		<Suspense fallback={fallback}>
			<LazyAreaChart {...props} />
		</Suspense>
	);
}
