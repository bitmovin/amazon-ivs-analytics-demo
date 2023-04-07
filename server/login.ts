import "server-only";

import {
	fetchInformation,
	fetchLicenses,
	fetchOrganizations,
} from "./bitmovin";
import type { Organization } from "@bitmovin/api-sdk";
import { fetchChannels } from "./aws";

export async function fetchOrgs(init: RequestInit) {
	const response = await fetchOrganizations(init);

	const orgs = (response.items || []).flatMap((org) =>
		org.id ? [{ ...org, orgId: org.id }] : []
	);

	return {
		...response,
		orgs,
	};
}

export async function fetchOrgLicenses(org: Organization & { orgId: string }) {
	const response = await fetchLicenses(
		{
			next: { revalidate: 10000 },
		},
		org.orgId
	);

	const items = response.items ?? [];

	const licenses = items.flatMap((license) =>
		license.licenseKey
			? [{ ...license, licenseKey: license.licenseKey }]
			: []
	);

	return {
		...org,
		licenses,
	};
}

export async function login() {
	const information = await fetchInformation({ next: { revalidate: 10000 } });
	const response = await fetchOrgs({ next: { revalidate: 10000 } });
	const orgs = await Promise.all(response.orgs.map(fetchOrgLicenses));
	const ivsChannels = await fetchChannels();
	return { information, orgs, ivsChannels };
}
