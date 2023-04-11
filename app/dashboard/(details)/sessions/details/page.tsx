import { fetchStreamSessionDetails } from "@/server/aws";
import Board from "@/components/board";
import BoardItem from "@/components/board-item";
import Header from "@/components/client/Header";
import Table from "@/components/client/Table";
import type { IngestConfiguration } from "@aws-sdk/client-ivs";
import ContentLayout from "@/components/client/ContentLayout";
import { getSession } from "@/server/session";
import { intlFormat } from "date-fns";
import { redirect } from "next/navigation";

export default async function Page(props: {
	searchParams: {
		streamId?: string;
		channelArn?: string;
		licenseKey?: string;
	};
}) {
	const {
		aws: { streamSession, channelName, channel },
	} = await getSession(props.searchParams);

	if (!streamSession) {
		redirect("/dashboard/sessions");
	}

	const encodingConfigItems = getEncodingConfigItems(
		streamSession.ingestConfiguration
	);

	const { startTime, endTime } = streamSession;

	const from = startTime
		? intlFormat(startTime, {
				year: "2-digit",
				month: "2-digit",
				day: "2-digit",
				weekday: "short",
				hour: "2-digit",
				minute: "2-digit",
		  })
		: "Unknown";
	const to = endTime
		? intlFormat(endTime, {
				year: "2-digit",
				month: "2-digit",
				day: "2-digit",
				weekday: "short",
				hour: "2-digit",
				minute: "2-digit",
		  })
		: "LIVE";

	const description = (
		<>
			<time>{from}</time>
			<span> to </span>
			<time>{to}</time>
		</>
	);

	return (
		<ContentLayout
			header={<Header description={description}>{channelName}</Header>}
		>
			<Board>
				<BoardItem
					id="StreamSessionEvents"
					header={<Header variant="h3">Stream Events</Header>}
					columnSpan={2}
					rowSpan={3}
				>
					<Table
						variant="embedded"
						items={
							streamSession?.truncatedEvents?.map((event) => {
								return {
									name: <>{event.name || ""}</>,
									time: (
										<>
											{event.eventTime?.toISOString() ||
												""}
										</>
									),
								};
							}) || []
						}
						columns={[
							{
								id: "name",
								children: <>{"Event"}</>,
							},
							{
								id: "time",
								children: <>{"Time"}</>,
							},
						]}
					/>
				</BoardItem>
				<BoardItem
					id="StreamSessionMetrics"
					header={<Header variant="h3">Stream Metrics</Header>}
					columnSpan={1}
					rowSpan={3}
				>
					<h5>No data yet</h5>
				</BoardItem>
				<BoardItem
					id="IngestCodecConfiguration"
					header={
						<Header variant="h3">Encoding Configuration</Header>
					}
					columnSpan={1}
					rowSpan={6}
				>
					<Table
						variant="embedded"
						items={encodingConfigItems}
						columns={[
							{
								id: "name",
								children: <>{"Name"}</>,
							},
							{
								id: "value",
								children: <>{"Details"}</>,
							},
						]}
					/>
				</BoardItem>
				<BoardItem
					id="StreamSessionHealth"
					header={<Header variant="h3">Stream Health</Header>}
					columnSpan={1}
					rowSpan={3}
				>
					<h5>No data yet</h5>
				</BoardItem>
				<BoardItem
					id="PlaybackHealth"
					header={<Header variant="h3">Playback Health</Header>}
					columnSpan={1}
					rowSpan={3}
				>
					<h5>No data yet</h5>
				</BoardItem>
				<BoardItem
					id="PlaybackSessionList"
					header={<Header variant="h3">Playback Session List</Header>}
					columnSpan={1}
					rowSpan={3}
				>
					<h5>No data yet</h5>
				</BoardItem>
			</Board>
		</ContentLayout>
	);
}

function getEncodingConfigItems(
	encodingConfig: IngestConfiguration | undefined
) {
	const encodingConfigItems = [];

	if (encodingConfig?.video) {
		for (const key of Object.keys(encodingConfig?.video)) {
			encodingConfigItems.push({
				name: <>{key}</>,
				value: <>{(encodingConfig.video as any)[key]}</>,
			});
		}
	}
	if (encodingConfig?.audio) {
		for (const key of Object.keys(encodingConfig?.audio)) {
			encodingConfigItems.push({
				name: <>{key}</>,
				value: <>{(encodingConfig.audio as any)[key]}</>,
			});
		}
	}

	return encodingConfigItems;
}
