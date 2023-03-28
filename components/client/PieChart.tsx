"use client";

import type { PieChartProps } from "@cloudscape-design/components/pie-chart";
import React, { Suspense, lazy } from "react";

const PieChart = lazy(() => import("@cloudscape-design/components/pie-chart"));

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function ClientPieChart({
	fallback,
	...props
}: PieChartProps & { fallback: JSX.Element }) {
	return (
		<Suspense fallback={fallback}>
			<PieChart {...props} />
		</Suspense>
	);
}

