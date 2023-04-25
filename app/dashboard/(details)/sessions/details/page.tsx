import Board from "@/components/board";
import BoardItem from "@/components/board-item";
import Header from "@/components/client/Header";
import Table from "@/components/client/Table";
import type { IngestConfiguration } from "@aws-sdk/client-ivs";
import { getMetricImage, ImageMetric } from "@/server/aws";
import ContentLayout from "@/components/client/ContentLayout";
import { getSession } from "@/server/session";
import { intlFormat } from "date-fns";
import { redirect } from "next/navigation";
import ImpressionsTable, { ImpressionsColumn } from "../../impressions/table";

export default async function Page(props: {
  searchParams: {
    streamId?: string;
    channelArn?: string;
    orgId?: string;
    licenseKey?: string;
  };
}) {
  const {
    aws: { streamSession, channelName },
    searchParams,
  } = await getSession(props.searchParams);

  const { channelArn, orgId, licenseKey } = searchParams;

  if (!channelArn || !orgId || !licenseKey) {
    redirect("/dashboard");
  }

  if (!streamSession) {
    redirect("/dashboard/sessions");
  }

  if (!streamSession.startTime) {
    // Every session should have a start time, so this case should never occur.
    // Types indicate `startTime` is optional though, so adding some value just in case.
    streamSession.startTime = getFallbackDateNowMinusDaysAgo(14);
  }

  const encodingConfigItems = getEncodingConfigItems(streamSession.ingestConfiguration);

  const streamHealthImages = await getStreamHealthMetricImages(
    channelArn,
    streamSession.startTime,
    streamSession.endTime || new Date()
  );

  const { startTime, endTime } = streamSession;

  // Setting as any because there are no explicit types available
  const intlDateTimeFormatConfig = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  } as any;

  const from = startTime ? intlFormat(startTime, intlDateTimeFormatConfig) : "Unknown";
  const to = endTime ? intlFormat(endTime, intlDateTimeFormatConfig) : "LIVE";

  const description = (
    <>
      <time>{from}</time>
      <span> to </span>
      <time>{to}</time>
    </>
  );

  return (
    <ContentLayout header={<Header description={description}>Stream: {streamSession.streamId}</Header>}>
      <Board>
        <BoardItem
          id="StreamSessionHealth"
          header={<Header variant="h3">Stream Health</Header>}
          columnSpan={2}
          rowSpan={13}
        >
          <>
            <img src={streamHealthImages[0] ? streamHealthImages[0] : ""} alt="Ingest Frame Rate" width={"90%"}></img>
            <img
              src={streamHealthImages[1] ? streamHealthImages[1] : ""}
              alt="Ingest Video Bitrate"
              width={"90%"}
            ></img>
            <img
              src={streamHealthImages[2] ? streamHealthImages[2] : ""}
              alt="Ingest Audio Bitrate"
              width={"90%"}
            ></img>
          </>
        </BoardItem>
        <BoardItem
          id="StreamSessionEvents"
          header={<Header variant="h3">Stream Events</Header>}
          columnSpan={2}
          rowSpan={6}
        >
          <Table
            variant="embedded"
            items={
              streamSession?.truncatedEvents?.map((event) => {
                return {
                  name: <>{event.name || ""}</>,
                  time: (
                    <>{event.eventTime ? intlFormat(event.eventTime, intlDateTimeFormatConfig as any) : "Unknown"}</>
                  ),
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
          id="IngestCodecConfiguration"
          header={<Header variant="h3">Encoding Configuration</Header>}
          columnSpan={2}
          rowSpan={6}
        >
          <Table
            variant="embedded"
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
          id="StreamSessionMetrics"
          header={<Header variant="h3">Stream Metrics</Header>}
          columnSpan={1}
          rowSpan={3}
        >
          <h5>No data yet</h5>
        </BoardItem>
        <BoardItem
          id="PlaybackHealth"
          header={<Header variant="h3">Playback Health</Header>}
          columnSpan={1}
          rowSpan={3}
        >
          <h5>No data yet</h5>
        </BoardItem>
        <BoardItem
          id="PlaybackSessionList"
          header={<Header variant="h3">Latest Playback Sessions</Header>}
          columnSpan={4}
          rowSpan={5}
        >
          <ImpressionsTable
            orgId={orgId}
            licenseKey={licenseKey}
            startDate={streamSession.startTime.toISOString()}
            endDate={streamSession.endTime ? streamSession.endTime.toISOString() : undefined}
            variant="embedded"
            stickyHeader
            limit={15}
          >
            <ImpressionsColumn
              id="IMPRESSION_ID"
              filters={[{ not: "null" }]}
              type="link"
              href={`/dashboard/sessions/details/playback-session?${queryParamString}`}
            >
              ID
            </ImpressionsColumn>
            <ImpressionsColumn id="TIME" type="date">
              Latest Update
            </ImpressionsColumn>
            <ImpressionsColumn id="OPERATINGSYSTEM">OS</ImpressionsColumn>
            <ImpressionsColumn id="PLATFORM">Platform</ImpressionsColumn>
            <ImpressionsColumn id="BROWSER">Browser</ImpressionsColumn>
            <ImpressionsColumn id="ERROR_CODE">Error</ImpressionsColumn>
          </ImpressionsTable>
        </BoardItem>
        <BoardItem
          id="PlaybackErrorSessionList"
          header={<Header>Latest Playback Error Sessions</Header>}
          columnSpan={4}
          rowSpan={5}
        >
          <ImpressionsTable
            orgId={orgId}
            licenseKey={licenseKey}
            startDate={streamSession.startTime.toISOString()}
            endDate={streamSession.endTime ? streamSession.endTime.toISOString() : undefined}
            variant="embedded"
            stickyHeader
            limit={15}
          >
            <ImpressionsColumn id="IMPRESSION_ID" filters={[{ not: "null" }]}>
              ID
            </ImpressionsColumn>
            <ImpressionsColumn id="TIME" type="date">
              Error Time
            </ImpressionsColumn>
            <ImpressionsColumn id="ERROR_CODE" filters={[{ above: 0 }, { not: 10000 }]}>
              Error
            </ImpressionsColumn>
            <ImpressionsColumn id="OPERATINGSYSTEM">OS</ImpressionsColumn>
            <ImpressionsColumn id="BROWSER">Browser</ImpressionsColumn>
          </ImpressionsTable>
        </BoardItem>
        {/* TODO: Add Rebuffering %, etc from BM Analytics */}
      </Board>
    </ContentLayout>
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
