"use client";

import React, { Suspense, lazy, useState } from "react";

import type { AppLayoutProps } from "@cloudscape-design/components/app-layout";

const LazyAppLayout = lazy(
	() => import("@cloudscape-design/components/app-layout")
);

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function AppLayout(props: AppLayoutProps) {
	return (
		<Suspense fallback={props.content}>
			<LazyAppLayout {...props} />
		</Suspense>
	);
}
