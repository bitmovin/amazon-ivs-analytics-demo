import ContentLayout from "@/components/client/ContentLayout";
import SessionsTable, { SessionsColumn as Column } from "./sessions-table";
import Header from "@/components/client/Header";
import { getSession } from "@/server/session";
import { redirect } from "next/navigation";

export default async function Page(props: {
	searchParams: {
		orgId?: string;
		licenseKey?: string;
		channelArn?: string;
	};
}) {
	const { searchParams } = await getSession(props.searchParams);
	const { channelArn } = searchParams;

	if (!channelArn) {
		redirect("/");
	}

	return (
		<ContentLayout header={<Header>{"Stream Sessions"}</Header>}>
			<SessionsTable
				channelArn={channelArn}
				stickyHeader
				variant="container"
				limit={100}
			>
				<Column id="streamId">Path</Column>
				<Column id="startTime">Video</Column>
				<Column id="endTime">OS</Column>
				<Column id="error">Browser</Column>
				<Column id="detailLink" />
			</SessionsTable>
		</ContentLayout>
	);
}
