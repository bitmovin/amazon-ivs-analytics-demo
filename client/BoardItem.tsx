"use client";

import React from "react";

import ClientBoardItem, {
	BoardItemProps,
} from "@cloudscape-design/board-components/board-item";

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function BoardItem(props: BoardItemProps) {
	return <ClientBoardItem {...props} />;
}
