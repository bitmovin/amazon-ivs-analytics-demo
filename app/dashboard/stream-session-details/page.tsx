import { redirect } from "next/navigation";

import {
  ImageMetric,
  fetchStreamSessionDetails,
  getMetricImage,
} from "@/server/aws";
import Board from "@/components/board";
import BoardItem from "@/components/board-item";
import Header from "@/components/client/Header";
import Table from "@/components/client/Table";
import type { IngestConfiguration } from "@aws-sdk/client-ivs";
import Image from "next/image";
import { z } from "zod";

const Params = z.object({
	channelArn: z.string(),
  streamId: z.string(),
});

export default async function Page(props: { searchParams: unknown }) {
  const params = Params.parse(props.searchParams);
  const channelArn = params.channelArn;
  const streamId = params.streamId;

  if (!streamId || !channelArn) {
    redirect("/");
  }

  const details = await fetchStreamSessionDetails({ next: { revalidate: 60 } }, channelArn, streamId);

  const encodingConfigItems = getEncodingConfigItems(details.streamSession?.ingestConfiguration);

  const ingestFrameRateImg = await getIngestFramerateImage(
    channelArn,
    details.streamSession?.startTime || getFallbackDateNowMinusDaysAgo(14),
    details.streamSession?.endTime || new Date(),
  );

  return (
    <Board>
      <BoardItem
        id='StreamSessionEvents'
        header={<Header variant="h3">Stream Events</Header>}
        columnSpan={2}
        rowSpan={3}
      >
        <Table
            items={(
              details.streamSession?.truncatedEvents?.map(event => {
                return {
                  name: <>{event.name || ''}</>,
                  time: <>{event.eventTime?.toISOString() || ''}</>,
                }
              }) || []
            )}
            columns={[
              {
                id: 'name',
                children: <>{"Event"}</>,
              },
              {
                id: 'time',
                children: <>{"Time"}</>,
              }
            ]}
          />
      </BoardItem>
      <BoardItem
        id="StreamSessionMetrics"
        header={ <Header variant="h3">Stream Metrics</Header>}
        columnSpan={1}
        rowSpan={3}
      >
        <h5>No data yet</h5>
      </BoardItem>
      <BoardItem
        id="IngestCodecConfiguration"
        header={ <Header variant="h3">Encoding Configuration</Header>}
        columnSpan={1}
        rowSpan={6}
      >
        <Table
          items={( encodingConfigItems )}
          columns={[
            {
              id: 'name',
              children: <>{"Name"}</>,
            },
            {
              id: 'value',
              children: <>{"Details"}</>,
            }
          ]}
        />
      </BoardItem>
      <BoardItem
        id="StreamSessionHealth"
        header={<Header variant="h3">Stream Health</Header>}
        columnSpan={1}
        rowSpan={3}
      >
        <Image
          src={ingestFrameRateImg ? `data:image/png;base64,${ingestFrameRateImg}` : ''}
          alt="Ingest Frame Rate"
          fill
        ></Image>
      </BoardItem>
      <BoardItem
        id="PlaybackHealth"
        header={ <Header variant="h3">Playback Health</Header>}
        columnSpan={1}
        rowSpan={3}
      >
        <h5>No data yet</h5>
      </BoardItem>
      <BoardItem
        id="PlaybackSessionList"
        header={ <Header variant="h3">Playback Session List</Header>}
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

async function getIngestFramerateImage(channelArn: string, startTime: Date, endTime: Date): Promise<string | null> {
  const base64imageOrNull = await getMetricImage(channelArn, startTime, endTime, ImageMetric.IngestFramerate);
  return base64imageOrNull
}

function getFallbackDateNowMinusDaysAgo(days: number = 14): Date {
  const date = new Date();
  const day = date.getDate() - days;
  date.setDate(day)
  return date;
}