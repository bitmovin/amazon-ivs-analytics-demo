"use client";

import React, { Suspense, lazy } from "react";
import type { ContentLayoutProps } from "@cloudscape-design/components";

const ContentLayout = lazy(
	() => import("@cloudscape-design/components/content-layout")
);

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function ClientContentLayout(props: ContentLayoutProps) {
	return (
		<Suspense fallback={props.children}>
			<ContentLayout {...props} />
		</Suspense>
	);
}
