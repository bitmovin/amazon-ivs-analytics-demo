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
				{...props}
				navigationOpen={
					props.navigationHide === false && navigationOpen
				}
				onNavigationChange={({ detail }) => {
					if (props.navigationHide === false) {
						setNavigationOpen(detail.open);
					}
				}}
				toolsOpen={props.toolsHide === false && toolsOpen}
				onToolsChange={({ detail }) => {
					if (props.toolsHide === false) {
						setToolsOpen(detail.open);
					}
				}}
			/>
		</Suspense>
	);
}
