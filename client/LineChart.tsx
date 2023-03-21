"use client";

import LineChart, {
	LineChartProps,
} from "@cloudscape-design/components/line-chart";
import { ChartDataTypes } from "@cloudscape-design/components/mixed-line-bar-chart/interfaces";
import React from "react";

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function ClientLineChart<T extends ChartDataTypes>(
	props: LineChartProps<T>
) {
	return <LineChart {...props} />;
}
