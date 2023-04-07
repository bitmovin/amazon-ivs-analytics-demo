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

export default function AreaChart({
	fallback,
	...props
}: AreaChartProps<ChartDataTypes> & { fallback: JSX.Element }) {
	const series = props.series.map((series) =>
		series.type === "area" && props.xScaleType === "time"
			? parseTimeSeries(series)
			: series
	);

	const xDomain =
		props.xDomain && props.xScaleType === "time"
			? [new Date(props.xDomain[0]), new Date(props.xDomain[1])]
			: undefined;

	const mappedProps = xDomain ? { xDomain, series } : { series };

	return (
		<Suspense fallback={fallback}>
			<LazyAreaChart {...props} {...mappedProps} />
		</Suspense>
	);

	function parseTimeSeries(
		series: AreaChartProps.Series<ChartDataTypes> & {
			type: "area";
		}
	) {
		return {
			...series,
			data: series.data.map((value) => ({
				x: new Date(value.x),
				y: value.y,
			})),
		};
	}
}
