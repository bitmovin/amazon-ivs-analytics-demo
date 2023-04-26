import Board from "@/components/board";
import BoardItem from "@/components/board-item";
import AnalyticsBarChart from "@/components/AnalyticsBarChart";
import Bar from "@/components/bar";
import AnalyticsAreaChart from "@/components/AnalyticsAreaChart";
import Header from "@/components/client/Header";
import Filter from "@/components/filter";
import Area from "@/components/area";
import ImpressionsTable, { ImpressionsColumn } from "./(details)/impressions/table";
import SessionsTable, { SessionsColumn } from "./(details)/sessions/table";
import ContentLayout from "@/components/client/ContentLayout";
import { getSession } from "@/server/session";
import Link from "next/link";
import { ButtonDropdown } from "@cloudscape-design/components";

export default async function Page(props: {
  searchParams: {
    orgId?: string;
    licenseKey?: string;
    channelArn?: string;
  };
}) {
  const { searchParams, aws } = await getSession(props.searchParams);
  const { orgId, licenseKey } = searchParams;
  const { channelName } = aws;

  return (
    <ContentLayout header={<Header>{channelName}</Header>}>
      <Board>
        <BoardItem id="sessions-table" header={<Header>Stream Sessions</Header>} columnSpan={4} rowSpan={2}>
          <SessionsItem {...searchParams} />
        </BoardItem>
        <></>
        {/* <BoardItem id="area-chart" header={<Header>Error Rate</Header>} columnSpan={2} rowSpan={3}>
          <AreaChart orgId={orgId} licenseKey={licenseKey} xScaleType="time">
            <Area query="avg" field="ERROR_RATE" interval="MINUTE" factor={1000} limit={100} />
          </AreaChart>
        </BoardItem> */}
        {/* <BoardItem id="bar-chart" header={<Header>Video Codecs</Header>} columnSpan={2} rowSpan={3}>
          <BarChart orgId={orgId} licenseKey={licenseKey} interval="DAY" limit={100}>
            <Bar id="AVC" query="count" dimension="IMPRESSION_ID">
              <Filter field="SUPPORTED_VIDEO_CODECS" has="avc" />
              <Filter field="VIDEO_STARTUPTIME" above={0} />
            </Bar>
            <Bar id="HEVC" query="count" dimension="IMPRESSION_ID">
              <Filter field="SUPPORTED_VIDEO_CODECS" has="hevc" />
              <Filter field="VIDEO_STARTUPTIME" above={0} />
            </Bar>
            <Bar id="VP9" query="count" dimension="IMPRESSION_ID">
              <Filter field="SUPPORTED_VIDEO_CODECS" has="vp9" />
              <Filter field="VIDEO_STARTUPTIME" above={0} />
            </Bar>
            <Bar id="AV1" query="count" dimension="IMPRESSION_ID">
              <Filter field="SUPPORTED_VIDEO_CODECS" has="av1" />
              <Filter field="VIDEO_STARTUPTIME" above={0} />
            </Bar>
          </BarChart>
        </BoardItem> */}
        {/* <BoardItem id="impressions-table" header={<Header>Error Sessions</Header>} columnSpan={2} rowSpan={4}>
          <ImpressionsTable orgId={orgId} licenseKey={licenseKey} variant="embedded" stickyHeader limit={100}>
            <ImpressionsColumn id="IMPRESSION_ID" filters={[{ not: "null" }]}>
              ID
            </ImpressionsColumn>
            <ImpressionsColumn id="ERROR_CODE" filters={[{ above: 0 }, { not: 10000 }]}>
              Error
            </ImpressionsColumn>
            <ImpressionsColumn id="PATH">Path</ImpressionsColumn>
            <ImpressionsColumn id="VIDEO_TITLE">Video</ImpressionsColumn>
            <ImpressionsColumn id="OPERATINGSYSTEM">OS</ImpressionsColumn>
            <ImpressionsColumn id="BROWSER">Browser</ImpressionsColumn>
          </ImpressionsTable>
        </BoardItem> */}
      </Board>
    </ContentLayout>
  );
}

function SessionsItem(props: { orgId: string; licenseKey: string; channelArn: string }) {
  const { orgId, licenseKey, channelArn } = props;
  const href = `/dashboard/sessions?orgId=${orgId}&licenseKey=${licenseKey}&channelArn=${channelArn}` as const;
  return (
    <SessionsTable
      orgId={orgId}
      licenseKey={licenseKey}
      channelArn={channelArn}
      variant="embedded"
      stickyHeader
      maxResults={100}
    >
      <SessionsColumn id="streamId">Stream ID</SessionsColumn>
      <SessionsColumn id="startTime">Start Time</SessionsColumn>
      <SessionsColumn id="endTime">End Time</SessionsColumn>
      <SessionsColumn id="error">Error</SessionsColumn>
      <SessionsColumn id="detailLink" />
    </SessionsTable>
  );
}
