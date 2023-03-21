"use client";

import BarChart, {
	BarChartProps,
} from "@cloudscape-design/components/bar-chart";
import { ChartDataTypes } from "@cloudscape-design/components/mixed-line-bar-chart/interfaces";
import React from "react";

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function ClientBarChart<T extends ChartDataTypes>(
	props: BarChartProps<T>
) {
	return <BarChart {...props} />;
}
