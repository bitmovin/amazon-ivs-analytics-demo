import Table, { Column } from "@/components/table";
import { redirect } from "next/navigation";
import Header from "@/components/client/Header";
import { PageProps } from "@/types/page";
import Filter from "@/components/filter";

export default async function Page(props: PageProps<"/dashboard/sessions">) {
	return (
		<Table
			{...props.searchParams}
			header="Errors"
			stickyHeader
			variant="container"
			limit={100}
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
