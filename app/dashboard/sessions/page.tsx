import Table from "../table";
import { redirect } from "next/navigation";
import Header from "@/components/client/Header";
import { PageProps } from "@/types/page";
import Filter, { equals, notEquals } from "@/components/filter";

export default async function Page(props: PageProps<"/dashboard/sessions">) {
	const licenseKey = props.searchParams.licenseKey;
	const orgId = props.searchParams.orgId;
	const dimension = props.searchParams.dimension;

	if (!orgId || !licenseKey || !dimension) {
		redirect("/");
	}

	return (
		<Table
			header={<Header variant="h2">{dimension}</Header>}
			licenseKey={licenseKey}
			orgId={orgId}
			dimension={dimension}
			stickyHeader
			variant="container"
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
		>
			<Filter name={dimension} {...notEquals("null")} />
			<Filter name={dimension} {...notEquals(10000)} />
		</Table>
	);
}
