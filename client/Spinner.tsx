"use client";

import type { SpinnerProps } from "@cloudscape-design/components/spinner";
import React, { Suspense, lazy } from "react";

const LazySpinner = lazy(() => import("@cloudscape-design/components/spinner"));

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function Spinner({
	fallback,
	...props
}: SpinnerProps & { fallback: JSX.Element }) {
	return (
		<Suspense fallback={fallback}>
			<LazySpinner {...props} />
		</Suspense>
	);
}
