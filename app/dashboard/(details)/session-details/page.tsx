import { redirect } from "next/navigation";

import { fetchStreamSessionDetails, getMetricImage, ImageMetric } from "@/server/aws";
import Board from "@/components/board";
import BoardItem from "@/components/board-item";
import Header from "@/components/client/Header";
import Table from "@/components/client/Table";
import type { IngestConfiguration } from "@aws-sdk/client-ivs";

export default async function Page(props: {
  searchParams: {
    streamId: string;
    channelArn: string;
  };
}) {
  const { streamId, channelArn } = props.searchParams;

  if (!streamId || !channelArn) {
    redirect("/");
  }

  const details = await fetchStreamSessionDetails(channelArn, streamId);

  const encodingConfigItems = getEncodingConfigItems(details.streamSession?.ingestConfiguration);

  const streamHealthImages = await getStreamHealthMetricImages(
    channelArn,
    details.streamSession?.startTime || getFallbackDateNowMinusDaysAgo(14),
    details.streamSession?.endTime || new Date()
  );

  return (
    <Board>
      <BoardItem
        id="StreamSessionEvents"
        header={<Header variant="h3">Stream Events</Header>}
        columnSpan={2}
        rowSpan={3}
      >
        <Table
          items={
            details.streamSession?.truncatedEvents?.map((event) => {
              return {
                name: <>{event.name || ""}</>,
                time: <>{event.eventTime?.toISOString() || ""}</>,
              };
            }) || []
          }
          columns={[
            {
              id: "name",
              children: <>{"Event"}</>,
            },
            {
              id: "time",
              children: <>{"Time"}</>,
            },
          ]}
        />
      </BoardItem>
      <BoardItem
        id="StreamSessionMetrics"
        header={<Header variant="h3">Stream Metrics</Header>}
        columnSpan={1}
        rowSpan={3}
      >
        <h5>No data yet</h5>
      </BoardItem>
      <BoardItem
        id="IngestCodecConfiguration"
        header={<Header variant="h3">Encoding Configuration</Header>}
        columnSpan={1}
        rowSpan={6}
      >
        <Table
          items={encodingConfigItems}
          columns={[
            {
              id: "name",
              children: <>{"Name"}</>,
            },
            {
              id: "value",
              children: <>{"Details"}</>,
            },
          ]}
        />
      </BoardItem>
      <BoardItem
        id="StreamSessionHealth"
        header={<Header variant="h3">Stream Health</Header>}
        columnSpan={2}
        rowSpan={12}
      >
        <>
          <img src={streamHealthImages[0] ? streamHealthImages[0] : ""} alt="Ingest Frame Rate" width={"100%"}></img>
          <img src={streamHealthImages[1] ? streamHealthImages[1] : ""} alt="Ingest Video Bitrate" width={"100%"}></img>
          <img src={streamHealthImages[2] ? streamHealthImages[2] : ""} alt="Ingest Audio Bitrate" width={"100%"}></img>
        </>
      </BoardItem>
      <BoardItem id="PlaybackHealth" header={<Header variant="h3">Playback Health</Header>} columnSpan={1} rowSpan={3}>
        <h5>No data yet</h5>
      </BoardItem>
      <BoardItem
        id="PlaybackSessionList"
        header={<Header variant="h3">Playback Session List</Header>}
        columnSpan={1}
        rowSpan={3}
      >
        <h5>No data yet</h5>
      </BoardItem>
    </Board>
  );
}

function getEncodingConfigItems(encodingConfig: IngestConfiguration | undefined) {
  const encodingConfigItems = [];

  if (encodingConfig?.video) {
    for (const key of Object.keys(encodingConfig?.video)) {
      encodingConfigItems.push({
        name: <>{key}</>,
        value: <>{(encodingConfig.video as any)[key]}</>,
      });
    }
  }
  if (encodingConfig?.audio) {
    for (const key of Object.keys(encodingConfig?.audio)) {
      encodingConfigItems.push({
        name: <>{key}</>,
        value: <>{(encodingConfig.audio as any)[key]}</>,
      });
    }
  }

  return encodingConfigItems;
}

async function getStreamHealthMetricImages(
  channelArn: string,
  startTime: Date,
  endTime: Date
): Promise<(string | null)[]> {
  const promises = [
    getMetricImage(channelArn, startTime, endTime, [ImageMetric.IngestFramerate]),
    getMetricImage(channelArn, startTime, endTime, [ImageMetric.IngestVideoBitrate]),
    getMetricImage(channelArn, startTime, endTime, [ImageMetric.IngestAudioBitrate]),
  ];
  return Promise.all(promises);
}

function getFallbackDateNowMinusDaysAgo(days: number = 14): Date {
  const date = new Date();
  const day = date.getDate() - days;
  date.setDate(day);
  return date;
}
