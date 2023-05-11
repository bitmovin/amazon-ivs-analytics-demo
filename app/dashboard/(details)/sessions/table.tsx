import { Suspense } from "react";
import { fetchStreamSessionsForChannel } from "@/server/aws";
import ClientTable from "@/components/client/Table";
import { TableProps } from "@cloudscape-design/components/table";
import Link from "next/link";
import { Cell, ColumnElement, TableColumn } from "@/components/column";
import { Alert } from "@/components/alert";
import { z } from "zod";
import { Route } from "next";

export const SessionsColumn = TableColumn<keyof typeof StreamSessionDetail>;

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
  orgId: string;
  licenseKey: string;
  channelArn: string;
  maxResults: number;
  children: ColumnElement<keyof typeof StreamSessionDetail>[];
  footer?: JSX.Element;
} & Partial<TableProps>;

export default function SessionsTable(props: IvsStreamSessionsProps) {
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
    />
  );
}

async function Component(props: IvsStreamSessionsProps) {
  const columns = props.children.map(({ props }) => props);
  try {
    const results = await fetchData(props);

    return <ClientTable {...props} columns={columns} loading={false} items={results} empty="No elements to display" />;
  } catch (e) {
    const safeError = z.instanceof(Error).parse(e);

    return (
      <ClientTable
        {...props}
        columns={columns}
        loading={false}
        items={[]}
        empty={<Alert error={safeError} />}
      />
    );
  }
}

async function fetchData(props: IvsStreamSessionsProps) {
  const { channelArn, orgId, licenseKey, maxResults } = props;
  const { streamSessions } = await fetchStreamSessionsForChannel(channelArn, maxResults);

  const cells: Cell[] = [];

  if (streamSessions && streamSessions.length > 0) {
    for (const { streamId, startTime, endTime, hasErrorEvent } of streamSessions) {
      const pathname = "/dashboard/sessions/details" satisfies Route;
      const query = { orgId, licenseKey, channelArn, streamId };
      const href = { pathname, query };
      cells.push({
        streamId: <>{streamId}</>,
        startTime: startTime ? <>{startTime.toISOString()}</> : <>{"Missing"}</>,
        endTime: endTime ? <>{endTime.toISOString()}</> : <>{"Live"}</>,
        error: hasErrorEvent ? <>{"Error"}</> : <>{"None"}</>,
        detailLink: <Link href={href}>{"View Details"}</Link>,
      });
    }
  }

  return cells;
}
