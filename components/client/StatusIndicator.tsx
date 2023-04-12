"use client";

import type { StatusIndicatorProps } from "@cloudscape-design/components/status-indicator";
import React, { Suspense, lazy } from "react";

const LazyStatusIndicator = lazy(
	() => import("@cloudscape-design/components/status-indicator")
);

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function StatusIndicator(props: StatusIndicatorProps) {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<LazyStatusIndicator {...props} />
		</Suspense>
	);
}
