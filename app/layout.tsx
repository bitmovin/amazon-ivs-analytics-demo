import "@cloudscape-design/global-styles/index.css";
import "./globals.scss";
import TopNavigation from "./top-navigation";

export const metadata = {
	title: {
		default: "Bitmovin IVS",
		template: "%s | Bitmovin IVS",
	},
	applicationName: "Bitmovin IVS",
	description: "Bitmovin and Amazon IVS Demo",
	viewport: { width: "device-width", initialScale: 1 },
};

export default async function RootLayout(props: { children: JSX.Element }) {
	return (
		<html lang="en">
			<TopNavigation />
			<body>{props.children}</body>
		</html>
	);
}
