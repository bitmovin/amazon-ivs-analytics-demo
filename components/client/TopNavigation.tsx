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

export default function TopNavigation({ identity, ...props }: TopNavigationProps) {
	const router = useRouter();

	for (const utility of props.utilities || []) {
		if (utility.type === "button" && utility.href) {
			router.prefetch(utility.href);
			utility.onClick = (event) => {
				event.preventDefault();
				if (utility.href) {
					router.push(utility.href);
				}
			};
		} else if (utility.type === "menu-dropdown") {
			for (const item of utility.items) {
				if (item.href) {
					router.prefetch(item.href);
				}
			}

			utility.onItemClick = (event) => {
				event.preventDefault();
				if (event.detail.href) {
					router.push(event.detail.href);
				}
			};
		}
	}

	identity.onFollow = (event) => {
		event.preventDefault();
		router.push(identity.href);
	};

	return (
		<Suspense fallback={<p>Loading...</p>}>
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
