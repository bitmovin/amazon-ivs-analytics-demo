"use client";

import { useRouter } from "next/navigation";
import React, { Suspense, lazy } from "react";

import { Route } from "next";
import { usePath } from "./hooks/usePath";

const LazyTopNavigation = lazy(
	() => import("@cloudscape-design/components/top-navigation")
);

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function TopNavigation(props: {
	title: string;
	href: Route;
	firstName: string;
	channelArn?: string | undefined;
	licenseKey?: string | undefined;
	orgId?: string | undefined;
	channelName: {};
	channels: {
		arn: string;
		name: string;
	}[];
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
	const pathname = usePath();
	const { orgId, channelArn, licenseKey } = props;

	return (
		<Suspense fallback={<p>Loading...</p>}>
			<LazyTopNavigation
				identity={{
					href: props.href,
					title: props.title,
					logo: { src: "/favicon.ico", alt: "logo" },
					onFollow: (event) => {
						event.preventDefault();
						router.push(props.href);
					},
				}}
				i18nStrings={{
					overflowMenuTitleText: "Title",
					overflowMenuTriggerText: "Trigger",
				}}
				utilities={[
					{
						type: "menu-dropdown",
						text: "Channels",
						iconName: "video-on",
						disableTextCollapse: true,
						disableUtilityCollapse: true,
						onItemClick: (event) => {
							const href = event.detail.href;
							if (href) {
								event.preventDefault();
								router.push(href as Route);
							}
						},
						items: props.channels.map((channel) => ({
							id: channel.arn,
							text: channel.name,
							href: `${pathname}?orgId=${orgId}&licenseKey=${licenseKey}&channelArn=${channel.arn}`,
						})),
					},
					{
						type: "menu-dropdown",
						text: props.firstName,
						iconName: "user-profile",
						disableTextCollapse: true,
						disableUtilityCollapse: true,
						onItemClick: (event) => {
							const href = event.detail.href;
							if (href) {
								event.preventDefault();
								router.push(href as Route);
							}
						},
						items: props.organizations.map(
							({ id, name, licenses }) => ({
								id,
								text: name,
								items: licenses.map(({ licenseKey, name }) => ({
									id: licenseKey,
									text: name,
									href: `${pathname}?orgId=${id}&licenseKey=${licenseKey}&channelArn=${channelArn}`,
								})),
							})
						),
					},
				]}
			/>
		</Suspense>
	);
}
