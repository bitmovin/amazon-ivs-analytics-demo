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
	const org = params.orgs.at(0) ?? notFound();
	const license = org.licenses.at(0) ?? notFound();
	const query: SearchParams<"/dashboard"> = {
		orgId: org.orgId,
		licenseKey: license.licenseKey,
	};

	redirect(`/dashboard?orgId=${query.orgId}&licenseKey=${query.licenseKey}`);
}
