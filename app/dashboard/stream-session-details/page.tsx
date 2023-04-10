import { redirect } from "next/navigation";

import {
  fetchStreamSessionDetails,
} from "@/server/aws";
import Board from "@/components/board";
import BoardItem from "@/components/board-item";
import Header from "@/components/client/Header";
import Table from "@/components/client/Table";
import type { IngestConfiguration } from "@aws-sdk/client-ivs";

export default async function Page(props: {
	searchParams: {
		streamId: string;
		channelArn: string;
	};
}) {
	const { streamId, channelArn } = props.searchParams;
	const details = await fetchStreamSessionDetails(
		{
			next: { revalidate: 60 },
		},
		channelArn,
		streamId
	);

	const encodingConfigItems = getEncodingConfigItems(
		details.streamSession?.ingestConfiguration
	);

	return (
		<Board>
			<BoardItem
				id="StreamSessionEvents"
				header={<Header variant="h3">Stream Events</Header>}
				columnSpan={2}
				rowSpan={3}
			>
				<Table
					items={
						details.streamSession?.truncatedEvents?.map((event) => {
							return {
								name: <>{event.name || ""}</>,
								time: (
									<>{event.eventTime?.toISOString() || ""}</>
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
				header={<Header variant="h3">Encoding Configuration</Header>}
				columnSpan={1}
				rowSpan={6}
			>
				<Table
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
	);
}

function getEncodingConfigItems(encodingConfig: IngestConfiguration | undefined) {
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
