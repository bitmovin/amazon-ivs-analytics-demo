import { Organization } from "@bitmovin/api-sdk";
import {
	listChannels,
	listStreamSessions,
	getStreamSession,
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

export const getSession = cache(async function getSession(params?: {
	orgId?: string | undefined;
	channelArn?: string | undefined;
	licenseKey?: string | undefined;
	streamId?: string | undefined;
}) {
	const [information, organizations, licenses, channels] =
		await getInformationAndOrganizations();

	const firstOrg = licenses?.at(0);
	const firstLicense = firstOrg?.licenses.at(0);
	const orgId = params?.orgId ?? firstOrg?.id;
	const licenseKey = params?.licenseKey ?? firstLicense?.licenseKey;

	const firstChannel = channels?.at(0);
	const channelArn = params?.channelArn ?? firstChannel?.arn;

	const [channel, streamSessions] = await getChannelsAndStreamSessions(
		channelArn
	);

	const firstStreamSession = streamSessions?.at(0);
	const streamId = params?.streamId ?? firstStreamSession?.streamId;

	const streamSession = await getStreamSession({}, { channelArn });

	return {
		bitmovin: {
			information,
			organizations,
			licenses,
		},
		aws: {
			channel,
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
async function getChannelsAndStreamSessions(channelArn?: string) {
	try {
		return await Promise.all([
			getChannel({}, { arn: channelArn }),
			listStreamSessions({}, { channelArn }),
		]);
	} catch {
		return [undefined, undefined] as const;
	}
}

async function getInformationAndOrganizations() {
	try {
		const [information, organizations, channels] = await Promise.all([
			fetchInformation(),
			fetchOrgs(),
			listChannels(),
		] as const);

		const licenses = await Promise.all(
			organizations.orgs.map(fetchOrgLicenses)
		);

		return [information, organizations, licenses, channels] as const;
	} catch {
		return [undefined, undefined, undefined] as const;
	}
}

function ok<T>(result: { ok: T } | { error: unknown }): result is { ok: T } {
	return "ok" in result;
}

