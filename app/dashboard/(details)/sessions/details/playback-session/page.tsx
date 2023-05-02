import Board from "@/components/board";
import BoardItem from "@/components/board-item";
import ContentLayout from "@/components/client/ContentLayout";
import Header from "@/components/client/Header";
import Table from "@/components/client/Table";
import { getSession } from "@/server/session";
import { getMetricImage, ImageMetric } from "@/server/aws";
import { intlFormat } from "date-fns";
import { redirect } from "next/navigation";
import UserSession from "@/components/UserSession";
import { fetchImpression } from "@/server/bitmovin";

export default async function Page(props: {
  searchParams: {
    orgId?: string;
    licenseKey?: string;
    channelArn?: string;
    analyticsSessionId?: string;
  };
}) {
  const {
    aws: { streamSession, channelName },
    searchParams,
  } = await getSession(props.searchParams);

  const { channelArn, orgId, licenseKey, analyticsSessionId } = searchParams;

  if (!channelArn || !orgId || !licenseKey) {
    redirect("/dashboard");
  }

  if (!streamSession) {
    redirect("/dashboard/sessions");
  }

  if (!analyticsSessionId) {
    redirect("/dashboard/sessions/details");
  }

  // TODO: Put into central place
  // Setting as any because there are no explicit types available
  const intlDateTimeFormatConfig = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  } as any;

  if (!streamSession.startTime) {
    // Every session should have a start time, so this case should never occur.
    // Types indicate `startTime` is optional though, so adding some value just in case.
    streamSession.startTime = getFallbackDateNowMinusDaysAgo(14);
  }

  const streamHealthImages = await getStreamHealthMetricImages(
    channelArn,
    streamSession.startTime,
    streamSession.endTime || new Date()
  );

  const analyticsImpression = (await getAnalyticsImpression(licenseKey, analyticsSessionId)) as any;

  return (
    <ContentLayout header={<Header>Playback Session {analyticsSessionId}</Header>}>
      <Board>
        <BoardItem
          id="UserSessionInfo"
          header={<Header variant="h3">User Session Details</Header>}
          columnSpan={4}
          rowSpan={4}
        >
          <UserSession data={analyticsImpression[0]}></UserSession>
        </BoardItem>
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
      </Board>
    </ContentLayout>
  );
}

async function getStreamHealthMetricImages(
  channelArn: string,
  startTime: Date,
  endTime: Date
): Promise<(string | null)[]> {
  return Promise.all([
    getMetricImage(channelArn, startTime, endTime, [ImageMetric.IngestFramerate]),
    getMetricImage(channelArn, startTime, endTime, [ImageMetric.IngestVideoBitrate]),
    getMetricImage(channelArn, startTime, endTime, [ImageMetric.IngestAudioBitrate]),
  ]);
}

function getFallbackDateNowMinusDaysAgo(days: number = 14): Date {
  const date = new Date();
  const day = date.getDate() - days;
  date.setDate(day);
  return date;
}

async function getAnalyticsImpression(licenseKey: string, sessionId: string) {
  return await fetchImpression(sessionId, licenseKey);
}
