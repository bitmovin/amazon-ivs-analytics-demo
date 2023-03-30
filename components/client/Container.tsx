"use client";

import React, { Suspense, lazy } from "react";
import type { ContainerProps } from "@cloudscape-design/components/container";

const Container = lazy(() => import("@cloudscape-design/components/container"));

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function ClientContainer(props: ContainerProps) {
	return (
		<Suspense fallback={<div>{props.children}</div>}>
			<Container {...props} />
		</Suspense>
	);
}