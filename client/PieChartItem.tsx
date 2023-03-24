"use client";

import type { PieChartProps } from "@cloudscape-design/components/pie-chart";
import React from "react";
import PieChart from "./PieChart";

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function PieChartItem({
	fallback,
	...props
}: PieChartProps & { fallback: JSX.Element }) {
	return (
		<div
			className="pie-chart-container"
			{...{
				style: {
					height: "100%",
					width: "100%",
				},
			}}
		>
			<PieChart {...props} fallback={fallback} />
		</div>
	);
}
