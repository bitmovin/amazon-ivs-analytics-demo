import { Column, Fallback as Table } from "@/components/table";
import Header from "@/components/client/Header";
import Spinner from "@/components/client/Spinner";

export default async function Loading() {
	return (
		<Table
			header={
				<Header variant="h2">
					<Spinner />
				</Header>
			}
			stickyHeader
			loading
			variant="container"
			limit={100}
			licenseKey={""}
			orgId={""}
		>
			<Column id="impression_id" filters={[{ not: "null" }]}>
				ID
			</Column>
			<Column id="error_code" filters={[{ above: 0 }, { not: 10000 }]}>
				Error
			</Column>
			<Column id="path">Path</Column>
			<Column id="video_title">Video</Column>
			<Column id="operatingsystem">OS</Column>
			<Column id="browser">Browser</Column>
		</Table>
	);
}
