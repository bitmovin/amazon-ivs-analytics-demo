"use client";

import React from "react";

import AreaChart from "./AreaChart";

import type { AreaChartProps } from "@cloudscape-design/components";
import type { ChartDataTypes } from "@cloudscape-design/components/mixed-line-bar-chart/interfaces";
import { useContainerQuery } from "@cloudscape-design/component-toolkit";

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function AreaChartItem({
	fallback,
	...props
}: AreaChartProps<ChartDataTypes> & { fallback: JSX.Element }) {
	const [size, containerQueryRef] = useContainerQuery((entry) => ({
		height: entry.contentBoxHeight,
		width: entry.contentBoxWidth,
	}));
	return (
		<div
			className="line-chart-container"
			ref={containerQueryRef}
			{...{
				style: {
					height: "calc(100% - 10px)",
					width: "100%",
				},
			}}
		>
			<AreaChart
				{...props}
				fallback={fallback}
				height={(size?.height || props.height || 200) - 100}
			/>
		</div>
	);
}
