"use client";

import React, { Suspense, lazy, useState } from "react";

import type { AppLayoutProps } from "@cloudscape-design/components/app-layout";

const LazyAppLayout = lazy(
	() => import("@cloudscape-design/components/app-layout")
);

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function AppLayout({
	fallback,
	...props
}: AppLayoutProps & { fallback: JSX.Element }) {
	const [navigationOpen, setNavigationOpen] = useState(false);
	const [toolsOpen, setToolsOpen] = useState(false);
	return (
		<Suspense fallback={fallback}>
			<LazyAppLayout
				navigationOpen={navigationOpen}
				onNavigationChange={({ detail }) =>
					setNavigationOpen(detail.open)
				}
				toolsOpen={toolsOpen}
				onToolsChange={({ detail }) => setToolsOpen(detail.open)}
				{...props}
			/>
		</Suspense>
	);
}
