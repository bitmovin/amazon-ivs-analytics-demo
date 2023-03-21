"use client";

import ClientBoard, {
	BoardProps,
} from "@cloudscape-design/board-components/board";
import React, { useState } from "react";

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function Board<D extends { element: JSX.Element }>({
	items,
	...props
}: Omit<BoardProps<D>, "renderItem" | "i18nStrings" | "onItemsChange">) {
	const [state, setState] = useState({ items });

	return (
		<ClientBoard
			items={state.items}
			renderItem={(item) => item.data.element}
			onItemsChange={(event) => {
				setState({ items: event.detail.items });
			}}
			i18nStrings={{
				liveAnnouncementDndStarted: (operationType) => "",
				liveAnnouncementDndItemReordered: (operation) => "",
				liveAnnouncementDndItemResized: (operation) => "",
				liveAnnouncementDndItemInserted: (operation) => "",
				liveAnnouncementDndCommitted: (operationType) => "",
				liveAnnouncementDndDiscarded: (operationType) => "",
				liveAnnouncementItemRemoved: (op) => "",
				navigationAriaLabel: "",
				navigationAriaDescription: "",
				navigationItemAriaLabel: (item) => "",
			}}
			{...props}
		/>
	);
}
