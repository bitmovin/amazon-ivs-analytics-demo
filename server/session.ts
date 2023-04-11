import { Organization } from "@bitmovin/api-sdk";
import {
	fetchChannels,
	fetchStreamSessionDetails,
	fetchStreamSessionsForChannel,
	getChannel,
} from "./aws";
import {
	fetchInformation,
	fetchLicenses,
	fetchOrganizations,
} from "./bitmovin";
import { redirect } from "next/navigation";
import { cache } from "react";

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

function capitalizeString<T extends string>(literal: T): Capitalize<T> {
	const firstLetter = literal.charAt(0);
	const otherLetters = literal.slice(1);
	const letter = firstLetter.toUpperCase();
	return `${letter}${otherLetters}` as Capitalize<T>;
}

function getTitle(name: string) {
	const parts = name?.split("-");

	const uppercase = parts?.map(capitalizeString);
	const title = uppercase?.join(" ");
	return title;
}

export const getSession = cache(async function (params?: {
	orgId?: string;
	channelArn?: string;
	licenseKey?: string;
	streamId?: string;
}) {
	const information = await fetchInformation();
	const response = await fetchOrgs();
	const organizations = await Promise.all(
		response.orgs.map((org) => fetchOrgLicenses(org))
	);
	const { channels } = await fetchChannels({}, {});

	const orgId = params?.orgId ?? organizations?.at(0)?.id;
	const licenseKey =
		params?.licenseKey ?? organizations?.at(0)?.licenses.at(0)?.licenseKey;
	const channelArn = params?.channelArn ?? channels?.at(0)?.arn;

	if (!channels || !orgId || !licenseKey || !channelArn) {
		redirect("/");
	}

	const { channel } = await getChannel({}, { arn: channelArn });

	const { streamSessions } = await fetchStreamSessionsForChannel(
		{},
		{ channelArn }
	);

	const streamId = params?.streamId ?? streamSessions?.at(0)?.streamId;

	const { streamSession } = streamId
		? await fetchStreamSessionDetails(
				{},
				{
					channelArn,
					streamId,
				}
		  )
		: { streamSession: undefined };

	const channelName = channel?.name
		? getTitle(channel.name)
		: "Channel (no name)";

	return {
		bitmovin: {
			information,
			organizations,
		},
		aws: {
			channel,
			channelName,
			channels,
			streamSession,
			streamSessions,
		},
		searchParams: {
			orgId,
			licenseKey,
			channelArn,
			streamId,
			...params,
		},
	};
});
