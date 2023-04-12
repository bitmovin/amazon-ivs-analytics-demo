import BoardItem from "@/components/client/BoardItem";
import { getStreamSession, isError } from "@/server/aws";
import { StreamSessionComponent, StreamSessionProps } from "./page";
import Header from "@/components/client/Header";
import Table from "@/components/client/Table";
import Time from "./time";
import { ErrorStatus } from "./status";
import { Suspense } from "react";
import Popover from "@/components/client/Popover";
import Button from "@/components/client/Button";
import Box from "@/components/client/Box";

export default function SessionEvents(props: StreamSessionProps) {
	return (
		<BoardItem
			header={
				<Header description="" variant="h3">
					Session Events
				</Header>
			}
		>
			<Suspense fallback={<SessionEventsFallback />}>
				<SessionEventsAsync {...props} />
			</Suspense>
		</BoardItem>
	);
}

export function SessionEventsFallback(props: { error?: unknown }) {
	return (
		<Table
			variant="embedded"
			contentDensity="compact"
			loading={!props.error}
			loadingText="Loading events..."
			items={[]}
			columns={[
				{
					id: "name",
					children: <>{"Name"}</>,
				},
				{
					id: "eventTime",
					children: <>{"Time"}</>,
				},
				{
					id: "type",
				},
			]}
			empty={
				<ErrorStatus
					label={
						props.error instanceof Error
							? props.error.message
							: "unknown error"
					}
				/>
			}
		/>
	);
}

export const SessionEventsAsync = async function StreamEventsAsync(
	props: StreamSessionProps
) {
	const result = await getStreamSession({}, props);

	if (isError(result)) {
		return <SessionEventsFallback />;
	}

	const events = result.streamSession?.truncatedEvents ?? [];

	return (
		<Table
			variant="embedded"
			contentDensity="compact"
			items={events.map(({ type, name, eventTime }) => {
				return {
					name: name ?? <ErrorStatus />,
					eventTime: eventTime ? (
						<Time time={eventTime} />
					) : (
						<ErrorStatus />
					),
					type: type ? (
						<Popover
							triggerType="custom"
							content={<Box>Type: {type}</Box>}
						>
							<Button
								variant="inline-icon"
								iconName="status-info"
							/>
						</Popover>
					) : (
						<ErrorStatus />
					),
				};
			})}
			columns={[
				{
					id: "name",
					children: <>{"Event"}</>,
				},
				{
					id: "eventTime",
					children: <>{"Time"}</>,
				},
				{
					id: "type",
				},
			]}
		/>
	);
} as unknown as StreamSessionComponent;
