import "server-only";

import { 
  ListStreamSessionsCommand,
  IvsClient,
  GetStreamSessionCommand,
  Ivs,
  IvsClientConfig,
} from "@aws-sdk/client-ivs";

import { requireEnv } from "./env";
import { cache } from "react";

type AwsClientConfig = IvsClientConfig;

const clientConfig: AwsClientConfig = {
  credentials: {
    accessKeyId: requireEnv("AWS_ACCESS_KEY"),
    secretAccessKey: requireEnv("AWS_SECRET_KEY"),
  },
  region: requireEnv("AWS_REGION") || 'us-east-1',
};

function getIvsClient(clientConfig: AwsClientConfig) {
  return new IvsClient(clientConfig);
}

function getIvs(clientConfig: AwsClientConfig) {
  return new Ivs(clientConfig);
}

export const fetchChannels = cache(
  async (
    requestInit?: RequestInit
  ) => {
    const channels = await getIvs(clientConfig).listChannels({});

    return channels;
  }
);

export const fetchStreamSessionsForChannel = async (
  requestInit: RequestInit,
  channelArn: string,
  limit: number = 100
) => {
  const listStreamSessionsInput = {
    channelArn: channelArn,
    maxResults: limit,
  };

  const listStreamSessionsRequest = new ListStreamSessionsCommand(listStreamSessionsInput);
  const listStreamSessionsResponse = await getIvsClient(clientConfig).send(listStreamSessionsRequest);

  return listStreamSessionsResponse;
};

export const fetchStreamSessionDetails = async (
  requestInit: RequestInit,
  channelArn: string,
  streamId: string,
) => {
  const getStreamSessionInput = {
    channelArn: channelArn,
    streamId: streamId,
  };
  const getStreamSessionRequest = new GetStreamSessionCommand(getStreamSessionInput);
  const getStreamSessionResponse = await getIvsClient(clientConfig).send(getStreamSessionRequest);

  return getStreamSessionResponse;
};
