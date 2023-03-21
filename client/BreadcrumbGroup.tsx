"use client";

import BreadcrumbGroup, {
	BreadcrumbGroupProps,
} from "@cloudscape-design/components/breadcrumb-group";
import { useRouter } from "next/navigation";
import React from "react";

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function ClientBreadcrumbGroup<
	T extends BreadcrumbGroupProps.Item
>(props: BreadcrumbGroupProps<T>) {
	const router = useRouter();

	return (
		<BreadcrumbGroup
			{...props}
			onFollow={(e) => {
				if (props.onFollow) {
					props.onFollow(e);
				}
				e.preventDefault();
				router.replace(e.detail.href);
			}}
			onClick={(e) => {
				if (props.onClick) {
					props.onClick(e);
				}
				e.preventDefault();
				router.replace(e.detail.href);
			}}
		/>
	);
}
