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
  const period = calculateCloudwatchPeriod(startDate);

  if (!period) {
    return null;
  }

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
      period: period,
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

const calculateCloudwatchPeriod = (startDate: Date, endDate = new Date()): number | null => {
  const nowHours = endDate.getTime() / 1000 / 60 / 60;
  const startHours = startDate.getTime() / 1000 / 60 / 60;

  // TODO: Double-check values
  if (nowHours - startHours < 3) {
    // 1-second metrics are available for 3 hours.
    return 1;
  } else if (nowHours - startHours < 15 * 24) {
    // 60-second metrics are available for 15 days.
    return 60;
  } else if (nowHours - startHours < 63 * 24) {
    // 5-minute metrics are available for 63 days.
    return 5 * 60;
  } else if (nowHours - startHours < 455 * 24) {
    // 1-hour metrics are available for 455 days (15 months).
    return 60 * 60;
  } else {
    console.error('Data out of range, metrics not available anymore');
    return null;
  }
}
