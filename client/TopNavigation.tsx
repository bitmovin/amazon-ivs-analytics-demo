"use client";

import { useRouter } from "next/navigation";
import React, { Suspense, lazy } from "react";

import type { TopNavigationProps } from "@cloudscape-design/components/top-navigation";

const LazyTopNavigation = lazy(
	() => import("@cloudscape-design/components/top-navigation")
);

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function TopNavigation({
	identity,
	fallback,
	...props
}: TopNavigationProps & { fallback: JSX.Element }) {
	const router = useRouter();

	for (const utility of props.utilities || []) {
		if (utility.type === "button" && utility.href) {
			router.prefetch(utility.href);
		} else if (utility.type === "menu-dropdown") {
			for (const item of utility.items) {
				if (item.href) {
					router.prefetch(item.href);
				}
			}
		}
	}

	return (
		<Suspense fallback={fallback}>
			<LazyTopNavigation
				identity={{
					...identity,
					onFollow: (event) => {
						event.preventDefault();
						router.replace(identity.href);
					},
				}}
				{...props}
			/>
		</Suspense>
	);
}
