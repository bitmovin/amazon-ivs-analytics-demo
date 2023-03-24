"use client";

import type { HeaderProps } from "@cloudscape-design/components/header";
import React, { lazy, Suspense } from "react";

const LazyHeader = lazy(() => import("@cloudscape-design/components/header"));

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function Header({
	fallback,
	...props
}: HeaderProps & { fallback: JSX.Element }) {
	return (
		<Suspense fallback={fallback}>
			<LazyHeader {...props} />
		</Suspense>
	);
}
