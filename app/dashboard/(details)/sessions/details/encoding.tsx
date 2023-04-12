import BoardItem from "@/components/client/BoardItem";
import Header from "@/components/client/Header";
import Table from "@/components/client/Table";
import { getStreamSession, isError } from "@/server/aws";
import { StreamSessionComponent, StreamSessionProps } from "./page";
import { Suspense } from "react";
import { ErrorStatus } from "./status";

export default function Encoding(props: StreamSessionProps) {
	return (
		<BoardItem
			header={<Header variant="h3">Encoding Configuration</Header>}
		>
			<Suspense fallback={<Fallback />}>
				<EncodingAsync {...props} />
			</Suspense>
		</BoardItem>
	);
}

export function Fallback(props: { error?: unknown }) {
	return (
		<Table
			variant="embedded"
			loading={!props.error}
			items={[]}
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
			empty={<ErrorStatus />}
		/>
	);
}

export const EncodingAsync = async function EncodingAsync(props: {
	streamId: string;
	channelArn: string;
}) {
	const result = await getStreamSession({}, props);

	if (isError(result)) {
		return <Fallback {...result} />;
	}
	const config = result.streamSession?.ingestConfiguration;
	const items = [];

	if (config?.video) {
		for (const key of Object.keys(config.video)) {
			if (key in config.video) {
				const name = <>{key}</>;
				const value = (
					<>{config.video[key as keyof typeof config.video]}</>
				);
				items.push({ name, value });
			}
		}
	}
	if (config?.audio) {
		for (const key of Object.keys(config.audio)) {
			if (key in config.audio) {
				const name = <>{key}</>;
				const value = (
					<>{config.audio[key as keyof typeof config.audio]}</>
				);
				items.push({ name, value });
			}
		}
	}

	return (
		<Table
			variant="embedded"
			items={items}
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
	);
} as unknown as StreamSessionComponent;
