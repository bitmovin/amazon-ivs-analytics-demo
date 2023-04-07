import "server-only";

import { Suspense } from "react";
import { fetchStreamSessionsForChannel } from "@/server/aws";
import ClientTable from "@/components/client/Table";
import { TableProps } from "@cloudscape-design/components/table";
import Link from "next/link";
import { Cell, ColumnElement, TableColumn } from "@/components/column";
import { Alert } from "./alert";
import { z } from "zod";

export const Column = TableColumn<keyof typeof StreamSessionDetail>;
export type IvsTableProps = {
	licenseKey: string;
	orgId: string;
	children: ColumnElement<StreamSessionDetail>[];
	limit: number;
	footer?: JSX.Element;
} & Partial<TableProps>;

export enum StreamSessionDetail {
	streamId = "streamId",
	startTime = "startTime",
	endTime = "endTime",
	error = "error",
	detailLink = "detailLink",
}

export type IvsStreamSessionsProps = {
	channelArn: string;
	children: ColumnElement<keyof typeof StreamSessionDetail>[];
	limit: number;
	footer?: JSX.Element;
} & Partial<TableProps>;

export default function Table(props: IvsStreamSessionsProps) {
	return (
		<Suspense fallback={<Fallback {...props} />}>
			{/* @ts-expect-error suspense */}
			<Component {...props} />
		</Suspense>
	);
}

export function Fallback(props: IvsStreamSessionsProps) {
	return (
		<ClientTable
			{...props}
			columns={props.children.map(({ props }) => props)}
			loading={true}
			loadingText="Loading sessions"
			items={[]}
			resizableColumns
		/>
	);
}

async function Component(props: IvsStreamSessionsProps) {
	const columns = props.children.map(({ props }) => props);
	try {
		const results = await fetchData(props);

		return (
			<ClientTable
				{...props}
				columns={columns}
				loading={false}
				items={results}
				resizableColumns
			/>
		);
	} catch (e) {
		const safeError = z.instanceof(Error).parse(e);

		return (
			<ClientTable
				{...props}
				columns={props.children.map(({ props }) => props)}
				loading={false}
				items={[]}
				resizableColumns
				empty={<Alert error={safeError} />}
			/>
		);
	}
}

async function fetchData(props: IvsStreamSessionsProps) {
	const { channelArn, limit } = props;

	const result = await fetchStreamSessionsForChannel(
		{ next: { revalidate: 60 } },
		channelArn,
		limit
	);

	const cells: Cell[] = [];

	if (result.streamSessions && result.streamSessions.length > 0) {
		for (const streamSession of result.streamSessions) {
			const item: Cell = {};

			item["streamId"] = <>{streamSession.streamId}</>;
			item["startTime"] = <>{streamSession.startTime?.toISOString()}</>;
			item["endTime"] = (
				<>{streamSession.endTime?.toISOString() || "Live now"}</>
			);
			item["error"] = (
				<>
					{streamSession.hasErrorEvent
						? "Error occurred"
						: "No error"}
				</>
			);
			item["detailLink"] = (
				<Link
					href={{
						pathname: "/dashboard/stream-session-details",
						query: {
							channelArn: channelArn,
							streamId: streamSession.streamId,
						},
					}}
				>
					View Details
				</Link>
			);

			cells.push(item);
		}
	}

	return cells;
}
