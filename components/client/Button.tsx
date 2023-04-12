"use client";

import type { ButtonProps } from "@cloudscape-design/components/button";
import { Route } from "next";
import { useSelectedLayoutSegments } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { Suspense, lazy } from "react";

const LazyButton = lazy(() => import("@cloudscape-design/components/button"));

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function Button(
	props: ButtonProps & { route?: Route; href?: string }
) {
	const router = useRouter();

	return (
		<Suspense fallback={<button type="button">{props.children}</button>}>
			<LazyButton
				href={props.href ?? props.route ?? "#"}
				onFollow={(event) => {
					if (props.route) {
						event.preventDefault();
						router.push(props.route);
					}
				}}
				{...props}
			/>
		</Suspense>
	);
}