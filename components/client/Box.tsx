"use client";

import React, { Suspense, lazy } from "react";
import type { BoxProps } from "@cloudscape-design/components/box";

const LazyBox = lazy(() => import("@cloudscape-design/components/box"));

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function Box(props: BoxProps) {
	return (
		<Suspense fallback={<div>{props.children}</div>}>
			<LazyBox {...props} />
		</Suspense>
	);
}
