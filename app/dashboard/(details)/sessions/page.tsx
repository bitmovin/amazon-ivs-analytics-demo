import ContentLayout from "@/components/client/ContentLayout";
import SessionsTable, { SessionsColumn as SessionsColumn } from "./table";
import Header from "@/components/client/Header";
import { getSession } from "@/server/session";

export default async function Page(props: {
  searchParams: {
    orgId?: string;
    licenseKey?: string;
    channelArn?: string;
  };
}) {
  const {
    searchParams: { channelArn, orgId, licenseKey },
    aws: { channel, channelName },
  } = await getSession(props.searchParams);

  const href = `/dashboard/sessions/details?channelArn=${channelArn}&orgId=${orgId}&licenseKey=${licenseKey}` as const;

  return (
    <ContentLayout header={<Header>{channelName}</Header>}>
      <SessionsTable
        header={<Header>{"Stream Sessions"}</Header>}
        channelArn={channelArn}
        stickyHeader
        variant="container"
        maxResults={100}
        orgId={orgId}
        licenseKey={licenseKey}
      >
        <SessionsColumn id="streamId">Path</SessionsColumn>
        <SessionsColumn id="startTime">Video</SessionsColumn>
        <SessionsColumn id="endTime">OS</SessionsColumn>
        <SessionsColumn id="error">Browser</SessionsColumn>
        <SessionsColumn id="detailLink" />
      </SessionsTable>
    </ContentLayout>
  );
}
