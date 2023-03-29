import { Suspense } from "react";
import {
  fetchStreamSessionsForChannel,
} from "@/server/aws";
import ClientTable from "@/components/client/Table";
import Spinner from "@/components/client/Spinner";
import { Route } from "next";
import { TableProps } from "@cloudscape-design/components/table";
import Link from "next/link";

type Item = Record<string, string | number>;
type Cell = Partial<Record<string, JSX.Element>>;

type ColumnProps<A extends string> = {
	id: A;
	children?: JSX.Element | string;
} & (
	| { type: "date" }
	| { type: "text" }
	| { type: "link"; href: Route }
	| { type?: undefined }
);

type ColumnElement<A extends string> = CustomElement<ColumnProps<A>>;

export function Column<A extends string>(
	props: ColumnElement<A>["props"]
): ColumnElement<A> {
	return {
		type: null as JSX.Element["type"],
		key: null as JSX.Element["key"],
		props,
	} as ColumnElement<A>;
}

export type AnalyticsTableProps = {
	licenseKey: string;
	orgId: string;
	children: ColumnElement<StreamSessionDetail>[];
	limit: number;
	footer?: JSX.Element;
} & Partial<TableProps>;

export declare enum StreamSessionDetail {
	streamId = "streamId",
	startTime = "startTime",
	endTime = "endTime",
	error = "error",
	detailLink = "detailLink",
}

export type IvsStreamSessionsProps = {
	channelArn: string;
	children: ColumnElement<StreamSessionDetail>[];
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
			columns={props.children.map((column) => column.props)}
			loading={true}
			loadingText="Loading stream sessions"
			items={[{}]}
			resizableColumns
			columnDefinitions={[]}
		/>
	);
}

async function Component(props: IvsStreamSessionsProps) {
	const items = await updateProps(props);

	return (
		<ClientTable
			{...props}
			columns={props.children.map((column) => column.props)}
			loading={false}
			items={items}
			resizableColumns
			columnDefinitions={[]}
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
      item['detailLink'] =
      <Link
        href={{
          pathname: "/dashboard/stream-session-details",
          query: {
            channelArn: channelArn,
            streamId: streamSession.streamId
          },
        }}
      >View Details</Link>

      cells.push(item);
    }
  }

  return cells;
}
