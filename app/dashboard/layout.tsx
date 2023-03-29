import ContentLayout from "@/components/client/ContentLayout";
import Header from "@/components/client/Header";

export const metadata = {
	title: {
		default: "Dashboard",
		template: "%s | Dashboard",
	},
	applicationName: "Bitmovin IVS",
	description: "Bitmovin and Amazon IVS Demo",
	viewport: { width: "device-width", initialScale: 1 },
};

export default async function DashboardLayout(props: {
	children: JSX.Element;
}) {
	return (
		<ContentLayout
			fallback={props.children}
			header={<Header>Dashboard</Header>}
		>
			{props.children}
		</ContentLayout>
	);
}
