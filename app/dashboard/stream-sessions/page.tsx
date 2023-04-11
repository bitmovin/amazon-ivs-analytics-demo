import Table, { Column } from "@/components/ivs-table";
import Header from "@/components/client/Header";

export default async function Page(props: {
	searchParams: {
		channelArn: string;
	};
}) {
	const { channelArn } = props.searchParams;
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
