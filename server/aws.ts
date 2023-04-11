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

export const getChannel = cache(
	async (config: AwsClientConfig = {}, input: GetChannelCommandInput) => {
		const channels = await getIvs(config).getChannel(input);

		return channels;
	}
);

export const fetchChannels = cache(
	async (
		config: AwsClientConfig = {},
		args: ListChannelsCommandInput = {}
	) => {
		return await getIvs(config).listChannels(args);
	}
);

export const fetchStreamSessionsForChannel = cache(
	async (
		config: AwsClientConfig = {},
		input: ListStreamSessionsCommandInput
	) => {
		return await getIvs(config).listStreamSessions(input);
	}
);

export const fetchStreamSessionDetails = cache(
	async (
		config: AwsClientConfig = {},
		input: GetStreamSessionCommandInput
	) => {
		return await getIvs(config).getStreamSession(input);
	}
);
