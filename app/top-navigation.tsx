import { login } from "@/server/login";
import ClientTopNavigation from "@/components/client/TopNavigation";
import { Suspense } from "react";

export default function TopNavigation() {
	return (
		<Suspense fallback={<Fallback />}>
			{/* @ts-expect-error suspense */}
			<Component />
		</Suspense>
	);
}

function Fallback() {
	return (
		<ClientTopNavigation
			identity={{
				href: "#",
				title: "Bitmovin",
				logo: { src: "/favicon.ico", alt: "logo" },
			}}
			i18nStrings={{
				overflowMenuTitleText: "Title",
				overflowMenuTriggerText: "Trigger",
			}}
			utilities={[
				{
					type: "menu-dropdown",
					text: "Loading...",
					iconName: "user-profile",
					disableTextCollapse: true,
					disableUtilityCollapse: true,
					items: [],
				},
			]}
		/>
	);
}

async function Component() {
	const log = await login();

	return (
		<ClientTopNavigation
			identity={{
				href: "#",
				title: "Bitmovin",
				logo: { src: "/favicon.ico", alt: "logo" },
			}}
			i18nStrings={{
				overflowMenuTitleText: "Title",
				overflowMenuTriggerText: "Trigger",
			}}
			utilities={[
				{
					type: "menu-dropdown",
					text: log.information.firstName ?? "",
					iconName: "user-profile",
					disableTextCollapse: true,
					disableUtilityCollapse: true,
					items: log.orgs.map((org) => ({
						id: org.id || "id",
						text: org.name || "name",
						items: org.licenses.map((license) => ({
							id: license.licenseKey,
							text: license.name || "name",
							href: `/dashboard?orgId=${org.orgId}&licenseKey=${license.licenseKey}`,
							items: undefined,
						})),
					})),
				},
			]}
		/>
	);
}
