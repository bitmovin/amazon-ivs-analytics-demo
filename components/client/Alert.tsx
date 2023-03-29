"use client";

import React, { Suspense, lazy } from "react";

import type { AlertProps } from "@cloudscape-design/components/alert";

const LazyAlert = lazy(
	() => import("@cloudscape-design/components/app-layout")
);

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function Alert({
	fallback,
	...props
}: AlertProps & { fallback: JSX.Element }) {
	return (
		<Suspense fallback={fallback}>
			<LazyAlert {...props} />
		</Suspense>
	);
}
