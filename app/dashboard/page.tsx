import Board from "@/components/board";
import BoardItem from "@/components/board-item";
import Header from "@/components/client/Header";
import SessionsTable, { SessionsColumn } from "./(details)/sessions/table";
import ContentLayout from "@/components/client/ContentLayout";
import { getSession } from "@/server/session";

export default async function Page(props: {
  searchParams: {
    orgId?: string;
    licenseKey?: string;
    channelArn?: string;
  };
}) {
  const { searchParams, aws } = await getSession(props.searchParams);
  const { orgId, licenseKey, channelArn } = searchParams;
  const { channelName } = aws;

  return (
    <ContentLayout header={<Header>{channelName}</Header>}>
      <Board>
        <BoardItem id="sessions-table" header={<Header>Stream Sessions</Header>} columnSpan={4} rowSpan={6}>
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
        </BoardItem>
        <></>
      </Board>
    </ContentLayout>
  );
}
