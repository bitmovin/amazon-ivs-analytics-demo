import "server-only";

import {
	fetchInformation,
	fetchLicenses,
	fetchOrganizations,
} from "./bitmovin";
import type { Organization } from "@bitmovin/api-sdk";

export async function fetchOrgs() {
	const response = await fetchOrganizations({
		next: { revalidate: 10000 },
	});

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

export async function fetchInfo() {
	return await fetchInformation({ next: { revalidate: 10000 } });
}

export async function login() {
	const information = await fetchInfo();
	const response = await fetchOrgs();
	const orgs = await Promise.all(response.orgs.map(fetchOrgLicenses));
	return { information, orgs: orgs };
}
