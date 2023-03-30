import { Column, Fallback as Table } from "@/components/table";
import Header from "@/components/client/Header";
import Spinner from "@/components/client/Spinner";

export default async function Loading() {
	return (
		<Table
			params={{}}
			header={
				<Header variant="h2">
					<Spinner />
				</Header>
			}
			stickyHeader
			loading
			variant="container"
			limit={100}
		>
			<Column id="IMPRESSION_ID" filters={[{ not: "null" }]}>
				ID
			</Column>
			<Column id="ERROR_CODE" filters={[{ above: 0 }, { not: 10000 }]}>
				Error
			</Column>
			<Column id="PATH">Path</Column>
			<Column id="VIDEO_TITLE">Video</Column>
			<Column id="OPERATINGSYSTEM">OS</Column>
			<Column id="BROWSER">Browser</Column>
		</Table>
	);
}
