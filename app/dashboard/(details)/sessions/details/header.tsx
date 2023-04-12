import { getStreamSession, isError, isOk } from "@/server/aws";
import { StreamSessionComponent, StreamSessionProps } from "./page";
import Box from "@/components/client/Box";
import Button from "@/components/client/Button";
import Header from "@/components/client/Header";
import Status, { ErrorStatus, LiveStatus, LoadingStatus } from "./status";
import { Suspense } from "react";
import BoardItem from "@/components/client/BoardItem";
import ColumnLayout from "@/components/client/ColumnLayout";
import Time from "./time";
import SpaceBetween from "@/components/client/SpaceBetween";
import Container from "@/components/client/Container";
import { KeyValue } from "./key-value";

export default function SessionHeader(props: StreamSessionProps) {
	return (
		<Suspense fallback={<Fallback />}>
			<SessionHeaderAsync {...props} />
		</Suspense>
	);
}

export function Fallback(props: { error?: unknown }) {
	return (
		<SpaceBetween direction="vertical" size="s">
			<Header
				description={
					<Box>
						<Status type={props.error ? "error" : "in-progress"} />
						<Button variant="inline-icon" iconName="external" />
					</Box>
				}
			>
				Stream Session
			</Header>
			<SpaceBetween direction="horizontal" size="s">
				<KeyValue label="Start Time">
					{<Status type={props.error ? "error" : "in-progress"} />}
				</KeyValue>
				<KeyValue label="End Time">
					{<Status type={props.error ? "error" : "in-progress"} />}
				</KeyValue>
				<KeyValue label="Average Viewers">
					<Status type="info">
						{
							<Status
								type={props.error ? "error" : "in-progress"}
							/>
						}
					</Status>
				</KeyValue>
				<KeyValue label="Peak Viewers">
					<Status type="info">
						{
							<Status
								type={props.error ? "error" : "in-progress"}
							/>
						}
					</Status>
				</KeyValue>
			</SpaceBetween>
		</SpaceBetween>
	);
}

export const SessionHeaderAsync = async function SessionHeaderAsync(
	props: StreamSessionProps
) {
	const result = await getStreamSession({}, props);

	if (isError(result)) {
		return <Fallback error={result} />;
	}

	const { streamSession } = result;
	const { endTime, startTime } = streamSession ?? {};

	return (
		<SpaceBetween direction="vertical" size="s">
			<Header
				description={
					<Box>
						{streamSession?.streamId}{" "}
						<Button
							variant="inline-icon"
							iconName="external"
							href={streamSession?.channel?.playbackUrl ?? ""}
						/>
					</Box>
				}
			>
				Stream Session
			</Header>
			<SpaceBetween direction="horizontal" size="s">
				<KeyValue label="Start Time">
					{startTime ? <Time time={startTime} /> : <LiveStatus />}
				</KeyValue>
				<KeyValue label="End Time">
					{endTime ? <Time time={endTime} /> : <LoadingStatus />}
				</KeyValue>
				<KeyValue label="Average Viewers">
					<Status type="info">{"placeholder"}</Status>
				</KeyValue>
				<KeyValue label="Peak Viewers">
					<Status type="info">{"placeholder"}</Status>
				</KeyValue>
			</SpaceBetween>
		</SpaceBetween>
	);
} as unknown as StreamSessionComponent;
