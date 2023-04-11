import AppLayout from "@/components/client/AppLayout";
import TopNavigation from "../top-navigation";

export const metadata = {
	title: {
		default: "Dashboard",
		template: "%s | Dashboard",
	},
	applicationName: "Bitmovin IVS",
	description: "Bitmovin and Amazon IVS Demo",
	viewport: { width: "device-width", initialScale: 1 },
};

export default function Layout(props: { children: JSX.Element }) {
	return (
		<AppLayout
			toolsHide={true}
			navigationHide={true}
			content={props.children}
		/>
	);
}
