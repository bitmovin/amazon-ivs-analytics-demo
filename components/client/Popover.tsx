"use client";

import type { PopoverProps } from "@cloudscape-design/components/popover";
import React, { Suspense, lazy } from "react";

const LazyPopover = lazy(() => import("@cloudscape-design/components/popover"));

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function Popover({ children, ...props }: PopoverProps) {
	return (
		<Suspense fallback={children}>
			<LazyPopover {...props}>{children}</LazyPopover>
		</Suspense>
	);
}
