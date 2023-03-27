import { Suspense } from "react";
import {
	fetchStreamSessionsForChannel,
} from "@/server/aws";
import ClientTable from "@/client/Table";
import Spinner from "@/client/Spinner";
import { Route } from "next";
import { TableProps } from "@cloudscape-design/components/table";

type Cell = Partial<Record<string, JSX.Element>>;

type Column = {
	header: JSX.Element;
} & (
  | {
      type: "text";
    }
  | {
      type: "text";
    }
	| {
			type: "text";
	  }
	| {
			type: "text";
	  }
	| {
			type: "link";
			href: Route;
	  }
);

export declare enum StreamSessionDetail {
  streamId = 'streamId',
  startTime = 'startTime',
  endTime = 'endTime',
  error = 'error',
}

export type ColumnList = Record<StreamSessionDetail, Column>;

export type IvsStreamSessionsProps = {
  channelArn: string;
  columns: ColumnList;
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

function Fallback(props: IvsStreamSessionsProps) {
	return (
		<ClientTable
			{...props}
			loading={true}
			loadingText="Loading stream sessions"
			items={[{}]}
			resizableColumns
			columnDefinitions={[]}
			fallback={
				<div>
					<Spinner fallback={<p>Loading...</p>} />
					Loading stream sessions
				</div>
			}
		/>
	);
}

async function Component(props: IvsStreamSessionsProps) {
	const items = await updateProps(props);

	return (
		<ClientTable
			{...props}
			loading={false}
			items={items}
			resizableColumns
			columnDefinitions={[]}
			fallback={
				<div>
					<Spinner fallback={<p>Loading...</p>} />
					Loading stream sessions
				</div>
			}
		/>
	);
}
async function updateProps(props: IvsStreamSessionsProps) {
	const { channelArn, limit } = props;

	const result = await fetchStreamSessionsForChannel({ next: { revalidate: 60 }}, channelArn, limit)

	const cells: Cell[] = [];

	if(result.streamSessions && result.streamSessions.length > 0) {
    for (const streamSession of result.streamSessions) {
      const item: Cell = {};

      item['streamId'] = <>{streamSession.streamId}</>;
      item['startTime'] = <>{streamSession.startTime?.toISOString()}</>;
      item['endTime'] = <>{streamSession.endTime?.toISOString() || 'Live now'}</>;
      item['error'] = <>{streamSession.hasErrorEvent ? 'Error occurred' : 'No error'}</>;

      cells.push(item);
	}

	return cells;
}
