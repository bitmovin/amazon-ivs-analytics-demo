"use client";

import React, { Suspense } from "react";
import { lazy } from "react";
import { type SpaceBetweenProps } from "@cloudscape-design/components/space-between";

const LazySpaceBetween = lazy(
	() => import("@cloudscape-design/components/space-between")
);

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function SpaceBetween({
	children,
	...props
}: SpaceBetweenProps) {
	return (
		<Suspense fallback={children}>
			<LazySpaceBetween {...props}>{children}</LazySpaceBetween>
		</Suspense>
	);
}
