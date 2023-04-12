"use client";

import type { BadgeProps } from "@cloudscape-design/components";
import React, { Suspense, lazy } from "react";

const LazyBadge = lazy(() => import("@cloudscape-design/components/badge"));

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function Badge({ children, ...props }: BadgeProps) {
	return (
		<Suspense fallback={<span>{children}</span>}>
			<LazyBadge {...props}>{children}</LazyBadge>
		</Suspense>
	);
}
