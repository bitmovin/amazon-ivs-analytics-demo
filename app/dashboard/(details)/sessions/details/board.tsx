import BoardItem from "@/components/client/BoardItem";
import Header from "@/components/client/Header";
import Board from "@/components/client/Board";
import Events from "./session-events";
import Encoding from "./encoding";

export default function SessionBoard({
	streamId,
	channelArn,
}: {
	streamId: string;
	channelArn: string;
}) {
	return (
		<Board
			items={[
				{
					id: "encoding",
					data: <Encoding {...{ streamId, channelArn }} />,
					definition: { minRowSpan: 5, minColumnSpan: 1 },
				},
				{
					id: "events",
					data: <Events {...{ streamId, channelArn }} />,
					definition: { minRowSpan: 2, minColumnSpan: 2 },
				},

				{
					id: "stream-metrics",
					data: <StreamMetrics />,
					definition: { minRowSpan: 2, minColumnSpan: 1 },
				},

				{
					id: "stream-health",
					data: <StreamHealth />,
					definition: { minRowSpan: 2, minColumnSpan: 1 },
				},
				{
					id: "playback-health",
					data: <PlaybackHealth />,
					definition: { minRowSpan: 2, minColumnSpan: 1 },
				},
				{
					id: "playback-sessions",
					data: <PlaybackSessions />,
					definition: { minRowSpan: 3, minColumnSpan: 1 },
				},
			]}
		/>
	);
}

function PlaybackSessions() {
	return (
		<BoardItem header={<Header variant="h3">Playback Session List</Header>}>
			<h5>No data yet</h5>
		</BoardItem>
	);
}

function PlaybackHealth() {
	return (
		<BoardItem header={<Header variant="h3">Playback Health</Header>}>
			<h5>No data yet</h5>
		</BoardItem>
	);
}

function StreamHealth() {
	return (
		<BoardItem header={<Header variant="h3">Stream Health</Header>}>
			<h5>No data yet</h5>
		</BoardItem>
	);
}

function StreamMetrics() {
	return (
		<BoardItem header={<Header variant="h3">Stream Metrics</Header>}>
			<h5>No data yet</h5>
		</BoardItem>
	);
}
