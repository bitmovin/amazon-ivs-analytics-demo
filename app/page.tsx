import { redirect } from "@/server/routes";
import { fetchOrganizations } from "@/server/bitmovin";
import { notFound } from "next/navigation";

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
	const orgs = await fetchOrganizations();
	const id = orgs.items?.at(0)?.id;
	if (id) {
		return redirect(`/${id}`);
	} else {
		return notFound();
	}
}
