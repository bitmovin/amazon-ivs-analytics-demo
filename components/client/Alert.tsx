"use client";

import React, { Suspense, lazy } from "react";

import type { AlertProps } from "@cloudscape-design/components/alert";

const LazyAlert = lazy(() => import("@cloudscape-design/components/alert"));

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function Alert(props: AlertProps) {
	return (
		<Suspense fallback={props.children}>
			<LazyAlert {...props} />
		</Suspense>
	);
}
