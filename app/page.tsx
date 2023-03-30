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
	const { orgId, licenses } = params.orgs.at(0) ?? notFound();
	const { licenseKey } = licenses.at(0) ?? notFound();

	redirect(`/dashboard?orgId=${orgId}&licenseKey=${licenseKey}`);
}
