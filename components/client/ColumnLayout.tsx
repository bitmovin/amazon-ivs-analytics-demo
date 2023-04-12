"use client";

import React, { Suspense, lazy } from "react";
import type { ColumnLayoutProps } from "@cloudscape-design/components/column-layout";

const LazyColumnLayout = lazy(
	() => import("@cloudscape-design/components/column-layout")
);

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function ColumnLayout(props: ColumnLayoutProps) {
	return (
		<Suspense fallback={props.children}>
			<LazyColumnLayout {...props} />
		</Suspense>
	);
}
