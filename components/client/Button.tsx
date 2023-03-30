"use client";

import Button, { ButtonProps } from "@cloudscape-design/components/button";
import { useRouter } from "next/navigation";
import React, { Suspense, lazy } from "react";

const Container = lazy(() => import("@cloudscape-design/components/container"));

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function ClientButton(props: ButtonProps) {
	const router = useRouter();

	return (
		<Suspense fallback={<button type="button">{props.children}</button>}>
			<Button
				onFollow={(event) => {
					event.preventDefault();
					if (props.href) {
						router.push(props.href);
					} else {
						router.refresh();
					}
				}}
				{...props}
			/>
		</Suspense>
	);
}