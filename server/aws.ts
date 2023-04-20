import "server-only";

import {
  GetChannelCommandInput,
  GetStreamSessionCommandInput,
  Ivs,
  IvsClientConfig,
  ListChannelsCommandInput,
  ListStreamSessionsCommandInput,
} from "@aws-sdk/client-ivs";

import { requireEnv } from "./env";
import { cache } from "react";
import { CloudWatchClient, CloudWatchClientConfig, GetMetricWidgetImageCommand } from "@aws-sdk/client-cloudwatch";

export enum ImageMetric {
  IngestFramerate = "IngestFramerate",
  IngestAudioBitrate = "IngestAudioBitrate",
  KeyframeInterval = "KeyframeInterval",
  IngestVideoBitrate = "IngestVideoBitrate",
}

export type AwsClientConfig = IvsClientConfig | CloudWatchClientConfig;

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

function getCloudwatchClient(config: AwsClientConfig = {}) {
  return new CloudWatchClient({ ...defaultConfig, ...config });
}

export const getChannel = cache(async (channelArn: string, config: AwsClientConfig = {}) => {
  const input: GetChannelCommandInput = {
    arn: channelArn,
  };
  return await getIvs(config).getChannel(input);
});

export const fetchChannels = cache(
  async (listChannelInput: ListChannelsCommandInput = {}, config: AwsClientConfig = {}) => {
    return await getIvs(config).listChannels(listChannelInput);
  }
);

export const fetchStreamSessionsForChannel = cache(
  async (channelArn: string, limit: number = 100, config: AwsClientConfig = {}) => {
    const input: ListStreamSessionsCommandInput = {
      channelArn: channelArn,
      maxResults: limit,
    };

    return await getIvs(config).listStreamSessions(input);
  }
);

export const fetchStreamSessionDetails = cache(
  async (channelArn: string, streamId: string, config: AwsClientConfig = {}) => {
    const input: GetStreamSessionCommandInput = {
      channelArn: channelArn,
      streamId: streamId,
    };

    return await getIvs(config).getStreamSession(input);
  }
);

// TODO: Add support for getting metrics as data. Resources:
// https://docs.aws.amazon.com/ivs/latest/userguide/stream-health.html
// https://dev.to/aws/monitoring-amazon-ivs-live-stream-health-4bpb

export const getMetricImage = async (
  channelArn: string,
  startDate: Date,
  endDate: Date,
  metrics: ImageMetric[],
  config: AwsClientConfig = {}
) => {
  const period = calculateCloudwatchPeriod(startDate);

  if (!period) {
    return null;
  }
  
  // See https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/CloudWatch-Metric-Widget-Structure.html
  const getMetricWidgetImageInput = {
    MetricWidget: JSON.stringify({
      metrics: metrics.map((metric) => {
        return ["AWS/IVS", metric, "Channel", channelArn.split("/")[1]];
      }),
      start: startDate,
      end: endDate,
      period: period,
    }),
  };
  const getMetricWidgetImageRequest = new GetMetricWidgetImageCommand(getMetricWidgetImageInput);
  const getMetricWidgetImageResponse = await getCloudwatchClient(config).send(getMetricWidgetImageRequest);

  if (getMetricWidgetImageResponse.MetricWidgetImage) {
    const buffer = Buffer.from(getMetricWidgetImageResponse.MetricWidgetImage);
    const base64Image = buffer.toString("base64");
    return `data:image/png;base64,${base64Image}`;
  } else {
    return null;
  }
};

/**
 * Calculates the best possible period (in seconds) for metrics, based on data aging.
 * 
 * Valid Values: 1, 5, 10, 30, 60, and any multiple of 60. 1, 5, 10, and 30 are only for high-resolution metrics.
 * See also https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/CloudWatch-Metric-Widget-Structure.html
 */
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
    console.error("Data out of range, metrics not available anymore");
    return null;
  }
};
