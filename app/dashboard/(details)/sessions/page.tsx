import ContentLayout from "@/components/client/ContentLayout";
import SessionsTable, { SessionsColumn as SessionsColumn } from "./table";
import Header from "@/components/client/Header";
import { getSession } from "@/server/session";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Page(props: {
	searchParams: {
		orgId?: string;
		licenseKey?: string;
		channelArn?: string;
	};
}) {
	const session = await getSession(props.searchParams);

	const { searchParams, aws } = session;

	const { channelArn, orgId, licenseKey } = searchParams;
	const { channel } = aws;

	const channelName = channel?.name ?? "Unknown Channel";
	const href =
		`/dashboard/sessions/details?channelArn=${channelArn}&orgId=${orgId}&licenseKey=${licenseKey}` as const;

	return (
		<ContentLayout header={<Header>{channelName}</Header>}>
			<SessionsTable
				header={<Header>{"Stream Sessions"}</Header>}
				channelArn={channelArn}
				stickyHeader
				variant="container"
				maxResults={100}
			>
				<SessionsColumn id="streamId">Stream ID</SessionsColumn>
				<SessionsColumn id="startTime">Start Time</SessionsColumn>
				<SessionsColumn id="endTime">End Time</SessionsColumn>
				<SessionsColumn id="error">Error</SessionsColumn>
				<SessionsColumn id="detailLink" />
			</SessionsTable>
		</ContentLayout>
	);
}
function unwrap(channel: import("@aws-sdk/client-ivs").Channel | undefined) {
	throw new Error("Function not implemented.");
}

