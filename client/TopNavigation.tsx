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
			utility.onClick = (event) => {
				event.preventDefault();
				if (utility.href) {
					router.push(utility.href, {
						forceOptimisticNavigation: true,
					});
				}
			};
			router.prefetch(utility.href);
		} else if (utility.type === "menu-dropdown") {
			for (const item of utility.items) {
				if (item.href) router.prefetch(item.href);
			}

			utility.onItemClick = (event) => {
				event.preventDefault();
				if (event.detail.href)
					router.push(event.detail.href, {
						forceOptimisticNavigation: true,
					});
			};
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
