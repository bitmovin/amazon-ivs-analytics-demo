"use client";

import PieChart, {
	PieChartProps,
} from "@cloudscape-design/components/pie-chart";
import React from "react";

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function ClientAreaChart<T extends PieChartProps.Datum>(
	props: PieChartProps<T>
) {
	return <PieChart {...props} />;
}
