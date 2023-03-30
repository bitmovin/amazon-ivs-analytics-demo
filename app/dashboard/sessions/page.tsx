import Table, { Column } from "@/components/table";
// import { PageProps } from "@/types/page";
import { z } from "zod";

const Params = z.object({
	orgId: z.string().uuid(),
	licenseKey: z.string().uuid(),
});

export default async function Page(props: { searchParams: unknown }) {
	const params = Params.parse(props.searchParams);
	return (
		<Table
			orgId={params.orgId}
			licenseKey={params.licenseKey}
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
