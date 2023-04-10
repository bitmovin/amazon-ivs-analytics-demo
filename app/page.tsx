import { login } from "@/server/login";
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
	const params = await login();
	const { orgId, licenses } = params.organizations.at(0) ?? notFound();
	const { licenseKey } = licenses.at(0) ?? notFound();
	const ivsChannel = params.ivsChannels.channels && params.ivsChannels.channels.length > 0 
    ? params.ivsChannels.channels[0] 
    : notFound()

	redirect(`/dashboard?orgId=${orgId}&licenseKey=${licenseKey}&channelArn=${ivsChannel.arn}`);
}
