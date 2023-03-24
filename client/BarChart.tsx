"use client";

import React, { Suspense, lazy } from "react";

import type { BarChartProps } from "@cloudscape-design/components/bar-chart";
import type { ChartDataTypes } from "@cloudscape-design/components/mixed-line-bar-chart/interfaces";

const LazyBarChart = lazy(
	() => import("@cloudscape-design/components/bar-chart")
);

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function ClientBarChart(
	props: BarChartProps<ChartDataTypes> & { fallback: JSX.Element }
) {
	return (
		<Suspense fallback={props.fallback}>
			<LazyBarChart {...props} />
		</Suspense>
	);
}
