"use client";

import type { BoardItemProps } from "@cloudscape-design/board-components/board-item";
import React, { Suspense, lazy } from "react";
import Spinner from "./Spinner";

const LazyBoardItem = lazy(
	() => import("@cloudscape-design/board-components/board-item")
);

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function BoardItem({ ...props }: BoardItemProps) {
	return (
		<Suspense fallback={<Spinner />}>
			<LazyBoardItem {...props} />
		</Suspense>
	);
}