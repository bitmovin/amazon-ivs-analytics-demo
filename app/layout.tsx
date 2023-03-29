import "@cloudscape-design/global-styles/index.css";
import "./globals.scss";
import TopNavigation from "./top-navigation";
import AppLayout from "@/components/client/AppLayout";

export const metadata = {
	title: {
		default: "Dashboard",
		template: "%s | Dashboard",
	},
	applicationName: "Bitmovin IVS",
	description: "Bitmovin and Amazon IVS Demo",
	viewport: { width: "device-width", initialScale: 1 },
};

export default function RootLayout(props: { children: JSX.Element }) {
	return (
		<html lang="en">
			<body>
				<TopNavigation />
				<AppLayout
					toolsHide={true}
					navigationHide={true}
					fallback={<p>Loading...</p>}
					content={props.children}
				/>
			</body>
		</html>
	);
}
