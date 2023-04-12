"use client";

import { type CardsProps } from "@cloudscape-design/components/cards";
import React, { lazy, Suspense } from "react";

const LazyCards = lazy(() => import("@cloudscape-design/components/cards"));

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function Cards(props: CardsProps) {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<LazyCards {...props} />
		</Suspense>
	);
}
