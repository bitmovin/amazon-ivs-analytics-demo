"use client";

import React, { Suspense, lazy, useState } from "react";

import type { BoardProps } from "@cloudscape-design/board-components/board";
import BoardItem from "./BoardItem";

const LazyBoard = lazy(
	() => import("@cloudscape-design/board-components/board")
);

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

type Data = {
	element: JSX.Element;
	header?: JSX.Element;
	footer?: JSX.Element;
	settings?: JSX.Element;
	disableContentPaddings: boolean;
};
type Item<D = Data> = BoardProps.Item<D>;
type Items<D = Data> = Readonly<Item<D>[]>;
type Event<D = Data> = CustomEvent<BoardProps.ItemsChangeDetail<D>>;
type Props<D = Data> = BoardProps<D>;

export default function Board({
	fallback,
	...props
}: Partial<Omit<Props, "renderItem" | "onItemsChange" | "i18nStrings">> & {
	fallback: JSX.Element;
}) {
	const [items, setItems] = useState(props.items as Items);

	return (
		<Suspense fallback={fallback}>
			<LazyBoard
				items={items}
				onItemsChange={<D,>(event: Event<D>) =>
					setItems(event.detail.items as Items)
				}
				renderItem={<D,>(item: Item<D>) => (
					<BoardItem
						fallback={(item as Item).data.element}
						header={(item as Item).data.header}
						footer={(item as Item).data.footer}
						settings={(item as Item).data.settings}
						disableContentPaddings={
							(item as Item).data.disableContentPaddings
						}
						i18nStrings={{
							dragHandleAriaLabel: "",
							resizeHandleAriaLabel: "",
						}}
					>
						{(item as Item).data.element}
					</BoardItem>
				)}
				i18nStrings={{
					liveAnnouncementDndCommitted: () => "",
					liveAnnouncementDndDiscarded: () => "",
					liveAnnouncementDndItemInserted: () => "",
					liveAnnouncementDndItemReordered: () => "",
					liveAnnouncementDndItemResized: () => "",
					liveAnnouncementDndStarted: () => "",
					liveAnnouncementItemRemoved: () => "",
					navigationAriaLabel: "",
					navigationItemAriaLabel: () => "",
				}}
				empty={props.empty}
			/>
		</Suspense>
	);
}

