import { getSession } from "@/server/session";
import { redirect, notFound } from "next/navigation";

export const metadata = {
	title: {
		default: "Bitmovin IVS",
		template: "Bitmovin IVS",
	},
	applicationName: "Bitmovin IVS",
	description: "Bitmovin and Amazon IVS Demo",
	viewport: { width: "device-width", initialScale: 1 },
};

export default async function RootPage() {
	const session = await getSession();
	const { orgId, licenseKey, channelArn } = session.searchParams;

	redirect(
		`/dashboard?orgId=${orgId}&licenseKey=${licenseKey}&channelArn=${channelArn}`
	);
}
