import { Organization } from "@bitmovin/api-sdk";
import { fetchChannels } from "./aws";
import {
	fetchInformation,
	fetchLicenses,
	fetchOrganizations,
} from "./bitmovin";
import { redirect } from "next/navigation";

async function fetchOrgs() {
	const response = await fetchOrganizations();

	const orgs = (response.items || []).flatMap(({ id, ...org }) =>
		id ? [{ ...org, id }] : []
	);

	return {
		...response,
		orgs,
	};
}

async function fetchOrgLicenses(org: Organization & { id: string }) {
	const response = await fetchLicenses({}, org.id);

	const items = response.items ?? [];

	const licenses = items.flatMap(({ licenseKey, ...license }) =>
		licenseKey ? [{ ...license, licenseKey }] : []
	);

	return {
		...org,
		licenses,
	};
}

export async function getSession(params?: {
	orgId?: string;
	channelArn?: string;
	licenseKey?: string;
}) {
	const information = await fetchInformation();
	const response = await fetchOrgs();
	const organizations = await Promise.all(
		response.orgs.map((org) => fetchOrgLicenses(org))
	);
	const { channels } = await fetchChannels();

	const orgId = params?.orgId ?? organizations?.at(0)?.id;
	const licenseKey =
		params?.licenseKey ?? organizations?.at(0)?.licenses.at(0)?.licenseKey;
	const channelArn = params?.channelArn ?? channels?.at(0)?.arn;

	if (!channels || !orgId || !licenseKey || !channelArn) {
		redirect("/");
	}

	const selectedChannel = channels.find(
		(channel) => channel.arn === channelArn
	);

	if (!selectedChannel) {
		redirect("/");
	}

	return {
		bitmovin: {
			information,
			organizations,
		},
		aws: {
			selectedChannel,
			channels,
		},
		searchParams: {
			orgId,
			licenseKey,
			channelArn,
			...params,
		},
	};
}
