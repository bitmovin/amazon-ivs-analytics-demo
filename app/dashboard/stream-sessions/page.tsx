import { PageProps } from "@/app/types";
import Table from "../ivs-stream-sessions-table";
import { redirect } from "next/navigation";
import Header from "@/client/Header";

export default async function Page(props: PageProps<"/dashboard/stream-sessions">) {
	const channelArn = props.searchParams.channelArn;

	if (!channelArn) {
		redirect("/");
	}

	return (
		<Table
			header={
				<Header variant="h2" fallback={<h2>{"Stream Sessions"}</h2>}>
					Stream Sessions
				</Header>
			}
      channelArn={channelArn}
			stickyHeader
			variant="container"
			limit={100}
			columns={{
        streamId: {
          header: <>{"Stream ID"}</>,
          type: "text",
        },
        startTime: {
					header: <>{"Start Time"}</>,
					type: "text",
				},
        endTime: {
					header: <>{"End Time"}</>,
					type: "text",
				},
				error: {
					header: <>{"Error"}</>,
					type: "text",
				},
				detailLink: {
					header: <>{""}</>,
					type: "text",
				},
			}}
		/>
	);
}
