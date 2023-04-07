"use client";

import SideNavigation, {
	SideNavigationProps,
} from "@cloudscape-design/components/side-navigation";
import { useRouter } from "next/navigation";
import React from "react";

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function ClientSideNavigation(props: SideNavigationProps) {
	const router = useRouter();

	return (
		<SideNavigation
			{...props}
			onFollow={(event) => {
				if (props.onFollow) {
					props.onFollow(event);
				}
				event.preventDefault();
				router.replace(event.detail.href);
			}}
			onChange={(event) => {
				if (props.onChange) {
					props.onChange(event);
				}
			}}
		/>
	);
}
