"use client";

import type { PieChartProps } from "@cloudscape-design/components/pie-chart";
import React from "react";
import PieChart from "./PieChart";
import Spinner from "./Spinner";

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function PieChartItem(props: PieChartProps) {
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
			<PieChart
				{...props}
				fallback={
					<div>
						<Spinner />
						Loading data
					</div>
				}
			/>
		</div>
	);
}
