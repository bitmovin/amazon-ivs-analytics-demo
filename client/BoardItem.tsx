"use client";

import type { BoardItemProps } from "@cloudscape-design/board-components/board-item";
import React, { Suspense, lazy } from "react";

const LazyBoardItem = lazy(
	() => import("@cloudscape-design/board-components/board-item")
);

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function BoardItem({
	fallback,
	...props
}: BoardItemProps & { fallback: JSX.Element }) {
	return (
		<Suspense fallback={fallback}>
			<LazyBoardItem {...props} />
		</Suspense>
	);
}