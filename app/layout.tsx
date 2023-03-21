import "@cloudscape-design/global-styles/index.css";
import "./globals.scss";
import { fetchInformation, fetchOrganizations } from "@/server/bitmovin";
import dynamic from "next/dynamic";
import { ButtonDropdownProps } from "@cloudscape-design/components/button-dropdown";
import { TopNavigationProps } from "@cloudscape-design/components/top-navigation";
import { route } from "@/server/routes";

export const metadata = {
	title: {
		default: "Dashboard",
		template: "%s | Dashboard",
	},
	applicationName: "Bitmovin IVS",
	description: "Bitmovin and Amazon IVS Demo",
	viewport: { width: "device-width", initialScale: 1 },
};

const Spinner = dynamic(() => import("@/client/Spinner"), {
	loading: () => <p>Loading...</p>,
});

const AppLayout = dynamic(() => import("@/client/AppLayout"), {
	loading: () => <Spinner />,
});

const ContentLayout = dynamic(() => import("@/client/ContentLayout"), {
	loading: () => <Spinner />,
});

const TopNavigation = dynamic(() => import("@/client/TopNavigation"), {
	loading: () => <Spinner />,
});

export default async function RootLayout(props: { children: JSX.Element }) {
	const fetchInfo = fetchInformation({ next: { revalidate: 10000 } });
	const fetchOrg = fetchOrganizations({ next: { revalidate: 10000 } });

	const [information, organizations] = await Promise.all([
		fetchInfo,
		fetchOrg,
	]);

	const org: ButtonDropdownProps.ItemGroup = {
		text: "Organization",
		iconName: "group",
		items: (organizations.items || []).map(({ id, name }) => ({
			id: id || "id",
			text: name || "name",
			href: id ? route(`/${id}`) : undefined,
			iconName: "group",
		})) as ButtonDropdownProps.Item[],
	};

	const organization = {
		type: "menu-dropdown",
		text: information.firstName || "" + " " + information.lastName || "",
		iconName: "user-profile",
		disableTextCollapse: true,
		disableUtilityCollapse: true,
		items: [org] as ButtonDropdownProps.ItemGroup[],
	} as TopNavigationProps.MenuDropdownUtility;

	const utilities = [organization] as TopNavigationProps.Utility[];

	return (
		<html lang="en">
			<body>
				<TopNavigation
					identity={{
						href: "#",
						title: "Bitmovin",
						logo: { src: "/favicon.ico", alt: "logo" },
					}}
					i18nStrings={{
						overflowMenuTitleText: "Title",
						overflowMenuTriggerText: "Trigger",
					}}
					utilities={utilities}
				/>
				<AppLayout
					content={<ContentLayout>{props.children}</ContentLayout>}
				/>
			</body>
		</html>
	);
}
