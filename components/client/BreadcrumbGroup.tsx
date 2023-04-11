"use client";

import type { BreadcrumbGroupProps } from "@cloudscape-design/components/breadcrumb-group";
import { Route } from "next";
import { useRouter } from "next/navigation";
import React, { Suspense, lazy } from "react";

const LazyBreadcrumbGroup = lazy(
	() => import("@cloudscape-design/components/breadcrumb-group")
);

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function ClientBreadcrumbGroup(props: {
	items: {
		text: string;
		href: Route;
		route: Route;
	}[];
}) {
	const router = useRouter();

	return (
		<Suspense fallback={<span>Loading...</span>}>
			<LazyBreadcrumbGroup
				items={props.items}
				onFollow={(e) => {
					e.preventDefault();
					router.replace(e.detail.href as Route);
				}}
				onClick={(e) => {
					e.preventDefault();
					router.replace(e.detail.href as Route);
				}}
			/>
		</Suspense>
	);
}
