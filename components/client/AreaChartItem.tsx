"use client";

import React, { useState } from "react";

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
			<AreaChart
				{...props}
				hideFilter={hideFilter}
				hideLegend={hideLegend}
				fallback={fallback}
				height={(height ?? 200) - 90}
			/>
		</div>
	);
}
