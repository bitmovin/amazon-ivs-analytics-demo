"use client";

import React, { Suspense, lazy } from "react";
import type { ContentLayoutProps } from "@cloudscape-design/components/content-layout";

const LazyContentLayout = lazy(
	() => import("@cloudscape-design/components/content-layout")
);

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function ContentLayout(props: ContentLayoutProps) {
	return (
		<Suspense fallback={props.children}>
			<LazyContentLayout {...props} />
		</Suspense>
	);
}
