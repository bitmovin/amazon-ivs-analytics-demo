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
import { 
  CloudWatchClient,
  CloudWatchClientConfig,
  GetMetricWidgetImageCommand
} from "@aws-sdk/client-cloudwatch";

export enum ImageMetric {
  IngestFramerate = 'IngestFramerate',
  IngestAudioBitrate = 'IngestAudioBitrate',
  KeyframeInterval = 'KeyframeInterval',
  IngestVideoBitrate = 'IngestVideoBitrate',
};

type AwsClientConfig = IvsClientConfig | CloudWatchClientConfig;

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

function getCloudwatchClient(clientConfig: AwsClientConfig) {
  return new CloudWatchClient(clientConfig);
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
}

export const getMetricImage = async (channelArn: string, startDate: Date, endDate: Date, metrics: ImageMetric[]) => {
  const getMetricWidgetImageInput = {
    MetricWidget: JSON.stringify({
      metrics: metrics.map(metric => {
        return [
          "AWS/IVS",
          metric,
          "Channel",
          channelArn.split("/")[1]
        ];
      }),
      start: startDate,
      end: endDate,
      // TODO: Adapt period based on how long ago the data was
      period: 60,
    })
  };
  const getMetricWidgetImageRequest = new GetMetricWidgetImageCommand(getMetricWidgetImageInput);
  const getMetricWidgetImageResponse = await getCloudwatchClient(clientConfig).send(getMetricWidgetImageRequest);

  if (getMetricWidgetImageResponse.MetricWidgetImage) {
    const buffer = Buffer.from(getMetricWidgetImageResponse.MetricWidgetImage);
    const base64Image = buffer.toString('base64');
    return `data:image/png;base64,${base64Image}`;
  } else {
    return null;
  }
};
