"use client";

import React, { Suspense, lazy } from "react";
import type { ContainerProps } from "@cloudscape-design/components/container";

const LazyContainer = lazy(
	() => import("@cloudscape-design/components/container")
);

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function Container(props: ContainerProps) {
	return (
		<Suspense fallback={<div>{props.children}</div>}>
			<LazyContainer {...props} />
		</Suspense>
	);
}