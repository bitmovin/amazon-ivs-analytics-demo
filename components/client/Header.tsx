"use client";

import type { HeaderProps } from "@cloudscape-design/components/header";
import React, { lazy, Suspense } from "react";

const LazyHeader = lazy(() => import("@cloudscape-design/components/header"));

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function Header(props: HeaderProps) {
	return (
		<Suspense fallback={props.children}>
			<LazyHeader {...props} />
		</Suspense>
	);
}
