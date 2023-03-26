import { PageProps } from "@/app/types";
import Table from "../analytics-table";
import { redirect } from "next/navigation";
import Header from "@/client/Header";

export default async function Page(props: PageProps<"/dashboard/sessions">) {
	const licenseKey = props.searchParams.licenseKey;
	const orgId = props.searchParams.orgId;
	const dimension = props.searchParams.dimension || "ERROR_CODE";

	if (!orgId || !licenseKey) {
		redirect("/");
	}

	return (
		<Table
			header={
				<Header variant="h2" fallback={<h2>{dimension}</h2>}>
					{dimension}
				</Header>
			}
			licenseKey={licenseKey}
			orgId={orgId}
			dimension={dimension}
			stickyHeader
			variant="container"
			filters={[
				{
					name: dimension,
					operator: "NE",
					value: null,
				},
				{
					name: dimension,
					operator: "NE",
					value: 10000,
				},
			]}
			limit={100}
			columns={{
				time: {
					header: <>{"Time"}</>,
					type: "text",
				},
				path: {
					header: <>{"Path"}</>,
					type: "text",
				},
				video_title: {
					header: <>{"Video"}</>,
					type: "text",
				},
				operatingsystem: {
					header: <>{"OS"}</>,
					type: "text",
				},
				browser: {
					header: <>{"Browser"}</>,
					type: "text",
				},
				error_code: {
					header: <>{"Error Code"}</>,
					type: "text",
				},
			}}
		/>
	);
}
