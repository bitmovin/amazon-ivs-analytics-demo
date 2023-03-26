import Box from "@/client/Box";
import Table from "../analytics-table";
import Link from "next/link";

export default async function Page(props: PageProps<"/dashboard/sessions">) {
	return (
		<Table
			licenseKey={""}
			orgId={""}
			dimension={"IMPRESSION_ID"}
			columns={{
				impression_id: {
					header: <>{"ID"}</>,
					type: "text",
				},
			}}
			filters={[]}
			limit={0}
			footer={
				<Box textAlign="center">
					<Link href="/dashboard/sessions">View all</Link>
				</Box>
			}
		></Table>
	);
}
