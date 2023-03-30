import Table, { Column } from "@/components/ivs-table";
import Header from "@/components/client/Header";
import { z } from "zod";

const Params = z.object({
	channelArn: z.string(),
});

export default async function Page(props: { searchParams: unknown }) {
	const params = Params.parse(props.searchParams);
	return (
		<Table
			header={<Header variant="h2">Stream Sessions</Header>}
			channelArn={params.channelArn}
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
