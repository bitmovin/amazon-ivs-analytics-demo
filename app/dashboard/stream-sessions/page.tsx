import Table, { Column } from "../ivs-stream-sessions-table";
import { redirect } from "next/navigation";
import Header from "@/components/client/Header";
import { PageProps } from "@/types/page";

export default async function Page(
	props: PageProps<"/dashboard/stream-sessions">
) {
	const channelArn = props.searchParams.channelArn;

	if (!channelArn) {
		redirect("/");
	}

	return (
		<Table
			header={<Header variant="h2">Stream Sessions</Header>}
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
		</Table>
	);
}
