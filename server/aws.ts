import "server-only";

import { 
  ListStreamSessionsCommand,
  IvsClient,
} from "@aws-sdk/client-ivs";

import { requireEnv } from "./env";
import { cache } from "react";

const awsCredentials = {
	accessKeyId: requireEnv("AWS_ACCESS_KEY"),
	secretAccessKey: requireEnv("AWS_SECRET_KEY"),
};

const awsRegion = requireEnv("AWS_REGION") || 'us-east-1';

function getClient() {
  const ivsClient = new IvsClient({
    credentials: awsCredentials,
    region: awsRegion
  });

  return ivsClient;
}

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
  const listStreamSessionsResponse = await getClient().send(listStreamSessionsRequest);

  return listStreamSessionsResponse;
}