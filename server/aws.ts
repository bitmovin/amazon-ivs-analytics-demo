import "server-only";

import {
	Ivs,
	IvsClientConfig,
	GetChannelCommandInput,
	ListChannelsCommandInput,
	ListStreamSessionsCommandInput,
	GetStreamSessionCommandInput,
} from "@aws-sdk/client-ivs";

import { requireEnv } from "./env";
import { cache } from "react";

type AwsClientConfig = IvsClientConfig;

const defaultConfig: AwsClientConfig = {
	credentials: {
		accessKeyId: requireEnv("AWS_ACCESS_KEY"),
		secretAccessKey: requireEnv("AWS_SECRET_KEY"),
	},
	region: requireEnv("AWS_REGION") || "us-east-1",
};

function getIvs(config: AwsClientConfig = {}) {
	return new Ivs({ ...defaultConfig, ...config });
}

export const getChannel = cache(async function getChannel(
	config: AwsClientConfig = {},
	input: GetChannelCommandInput
) {
	try {
		return (await getIvs(config).getChannel(input)).channel;
	} catch (error) {
		console.error(error);
		return undefined;
	}
});

export const listChannels = cache(async function listChannels(
	config: AwsClientConfig = {},
	args: ListChannelsCommandInput = {}
) {
	try {
		return (await getIvs(config).listChannels(args)).channels ?? [];
	} catch (error) {
		console.error(error);
		return [];
	}
});

export const listStreamSessions = cache(async function listStreamSessions(
	config: AwsClientConfig,
	input: ListStreamSessionsCommandInput
) {
	try {
		return (
			(await getIvs(config).listStreamSessions(input)).streamSessions ??
			[]
		);
	} catch (error) {
		console.error(error);
		return [];
	}
});

export const getStreamSession = cache(async function getStreamSession(
	config: AwsClientConfig = {},
	input: GetStreamSessionCommandInput
) {
	try {
		return await getIvs(config).getStreamSession(input);
	} catch (error) {
		return { error };
	}
});

export function isError<T extends object>(
	result: T | { error: unknown }
): result is { error: unknown } {
	return "error" in result;
}

export function isOk<T extends object>(
	result: T | { error: unknown }
): result is T {
	return !("error" in result);
}