"use client";

import React, { Suspense, lazy, useState } from "react";

import type { BoardProps } from "@cloudscape-design/board-components/board";
import Spinner from "./Spinner";

const LazyBoard = lazy(() => import("@cloudscape-design/board-components/board"));

if (typeof window === "undefined") {
  React.useLayoutEffect = () => ({});
}

type Data = JSX.Element;
type Item<D = Data> = BoardProps.Item<D>;
type Items<D = Data> = Readonly<Item<D>[]>;
type Event<D = Data> = CustomEvent<BoardProps.ItemsChangeDetail<D>>;
type Props<D = Data> = BoardProps<D>;

export type I18nStrings = Partial<Record<keyof BoardProps["i18nStrings"], string>>;

export default function Board(
  props: Omit<Props, "renderItem" | "onItemsChange" | "i18nStrings"> & {
    i18nStrings?: I18nStrings;
  }
) {
  const [items, setItems] = useState(props.items as Items);

  return (
    <Suspense fallback={<Spinner />}>
      <LazyBoard
        {...props}
        items={items}
        onItemsChange={<D,>(event: Event<D>) => setItems(event.detail.items as Items)}
        renderItem={<D,>(item: Item<D>) => (item as Item).data}
        i18nStrings={{
          liveAnnouncementDndCommitted: () => props.i18nStrings?.liveAnnouncementDndCommitted ?? "",
          liveAnnouncementDndDiscarded: () => props.i18nStrings?.liveAnnouncementDndDiscarded ?? "",
          liveAnnouncementDndItemInserted: () => props.i18nStrings?.liveAnnouncementDndDiscarded ?? "",
          liveAnnouncementDndItemReordered: () => props.i18nStrings?.liveAnnouncementDndDiscarded ?? "",
          liveAnnouncementDndItemResized: () => props.i18nStrings?.liveAnnouncementDndDiscarded ?? "",
          liveAnnouncementDndStarted: () => props.i18nStrings?.liveAnnouncementDndDiscarded ?? "",
          liveAnnouncementItemRemoved: () => props.i18nStrings?.liveAnnouncementDndDiscarded ?? "",
          navigationItemAriaLabel: () => props.i18nStrings?.liveAnnouncementDndDiscarded ?? "",
          navigationAriaLabel: props.i18nStrings?.navigationAriaLabel ?? "",
          navigationAriaDescription: props.i18nStrings?.navigationAriaDescription ?? "",
        }}
      />
    </Suspense>
  );
}
