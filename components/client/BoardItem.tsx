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

export default function BoardItem(props: Omit<BoardItemProps, "i18nStrings">) {
	return (
		<Suspense fallback={<Spinner />}>
			<LazyBoardItem
				{...props}
				i18nStrings={{
					dragHandleAriaLabel: "",
					dragHandleAriaDescription: "",
					resizeHandleAriaLabel: "",
				}}
			/>
		</Suspense>
	);
}