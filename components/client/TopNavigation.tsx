"use client";

import { useRouter } from "next/navigation";
import React, { Suspense, lazy } from "react";

import type { TopNavigationProps } from "@cloudscape-design/components/top-navigation";
import { Route } from "next";
import { ButtonDropdownProps } from "@cloudscape-design/components";

const LazyTopNavigation = lazy(
	() => import("@cloudscape-design/components/top-navigation")
);

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function TopNavigation(props: {
	username: string;
	organizations: {
		id: string;
		name: string;
		licenses: {
			name: string;
			licenseKey: string;
		}[];
	}[];
}) {
	const router = useRouter();

	return (
		<Suspense fallback={<p>Loading...</p>}>
			<LazyTopNavigation
				identity={{
					href: "/dashboard",
					title: "Bitmovin",
					logo: { src: "/favicon.ico", alt: "logo" },
					onFollow: (event) => {
						event.preventDefault;
						router.push("/dashboard");
					},
				}}
				i18nStrings={{
					overflowMenuTitleText: "Title",
					overflowMenuTriggerText: "Trigger",
				}}
				utilities={[
					{
						type: "menu-dropdown",
						text: props.username,
						iconName: "user-profile",
						disableTextCollapse: true,
						disableUtilityCollapse: true,
						onItemClick: (event) => {
							event.preventDefault();
							router.push(`/dashboard?${event.detail.href}`);
						},
						items: props.organizations.map((org) => ({
							id: org.id,
							text: org.name,
							items: org.licenses.map((license) => ({
								id: license.licenseKey,
								text: license.name,
								href: `orgId=${org.id}&licenseKey=${license.licenseKey}` as Route,
							})),
						})),
					},
				]}
			/>
		</Suspense>
	);
}
