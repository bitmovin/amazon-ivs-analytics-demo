"use client";

import React from "react";

import type { BarChartProps } from "@cloudscape-design/components/bar-chart";
import type { ChartDataTypes } from "@cloudscape-design/components/mixed-line-bar-chart/interfaces";
import { useContainerQuery } from "@cloudscape-design/component-toolkit";
import BarChart from "./BarChart";

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function BarChartItem({
	fallback,
	...props
}: BarChartProps<ChartDataTypes> & { fallback: JSX.Element }) {
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
			<BarChart
				{...props}
				fallback={fallback}
				height={(size?.height || props.height || 200) - 100}
			/>
		</div>
	);
}
