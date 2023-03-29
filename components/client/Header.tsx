"use client";

import type { HeaderProps } from "@cloudscape-design/components/header";
import React, { lazy, Suspense } from "react";
import Spinner from "./Spinner";

const LazyHeader = lazy(() => import("@cloudscape-design/components/header"));

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function Header(props: HeaderProps) {
	return (
		<Suspense
			fallback={
				<>
					<Spinner />
					{props.variant === "h1" && <h1>{props.children}</h1>}
					{props.variant === "h2" && <h2>{props.children}</h2>}
					{props.variant === "h3" && <h3>{props.children}</h3>}
					{props.variant === "awsui-h1-sticky" && (
						<h3>{props.children}</h3>
					)}
				</>
			}
		>
			<LazyHeader {...props} />
		</Suspense>
	);
}
