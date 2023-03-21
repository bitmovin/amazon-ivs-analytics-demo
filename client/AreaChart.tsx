"use client";

import AreaChart, {
	AreaChartProps,
} from "@cloudscape-design/components/area-chart";
import { ChartDataTypes } from "@cloudscape-design/components/mixed-line-bar-chart/interfaces";
import React from "react";

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function ClientAreaChart<T extends ChartDataTypes>(
	props: AreaChartProps<T>
) {
	return <AreaChart {...props} />;
}
