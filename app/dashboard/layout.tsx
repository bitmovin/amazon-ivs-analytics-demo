import ContentLayout from "@/client/ContentLayout";
import Header from "@/client/Header";

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
			header={<Header fallback={<h1>Dashboard</h1>}>Dashboard</Header>}
		>
			{props.children}
		</ContentLayout>
	);
}
