"use client";

import React, { memo, useLayoutEffect, useMemo, useState } from "react";

import type { BarChartProps } from "@cloudscape-design/components/bar-chart";
import type { ChartDataTypes } from "@cloudscape-design/components/mixed-line-bar-chart/interfaces";
import { useContainerQuery } from "@cloudscape-design/component-toolkit";
import BarChart from "./BarChart";
import Spinner from "./Spinner";

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function BarChartItem({
	...props
}: BarChartProps<ChartDataTypes>) {
	const [hideFilter, setHideFilter] = useState(props.hideFilter ?? false);
	const [hideLegend, setHideLegend] = useState(props.hideLegend ?? false);

	const [height, containerQueryRef] = useContainerQuery(
		(entry) => {
			const height = entry.contentBoxHeight;

			const filter = props.hideFilter ?? height > 300;
			const legend = props.hideLegend ?? height > 140;

			setHideFilter(!filter);
			setHideLegend(!legend);

			return height + (filter ? -30 : 30) + (legend ? -10 : 30);
		},
		[props.hideFilter, props.hideLegend]
	);

	return (
		<div
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
				hideFilter={hideFilter}
				hideLegend={hideLegend}
				fallback={
					<div>
						<Spinner />
						Loading data
					</div>
				}
				height={(height ?? 200) - 90}
			/>
		</div>
	);
}
