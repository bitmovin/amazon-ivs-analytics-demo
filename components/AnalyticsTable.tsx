import "server-only";

import { Suspense } from "react";
import { AttributeKey, fetchImpression, fetchImpressions } from "@/server/bitmovin";
import { mapFilter } from "@/components/filter";
import ClientTable from "./client/Table";
import { TableProps } from "@cloudscape-design/components/table";
import { Cell, ColumnElement, Item, TableColumn } from "./column";
import { z } from "zod";
import { Alert } from "./alert";

export const AnalyticsTableColumn = TableColumn<AttributeKey>;

export type AnalyticsTableProps = {
  params: unknown;
  children: ColumnElement<AttributeKey>[];
  limit: number;
  footer?: JSX.Element;
} & Partial<TableProps>;

export default function AnalyticsTable(props: AnalyticsTableProps) {
  return (
    <Suspense fallback={<Fallback {...props} />}>
      {/* @ts-expect-error suspense */}
      <Component {...props} />
    </Suspense>
  );
}

export function Fallback(props: AnalyticsTableProps) {
  return (
    <ClientTable
      {...props}
      columns={props.children.map(({ props }) => props)}
      loading
      loadingText="Loading sessions"
      items={[]}
      resizableColumns
    />
  );
}

async function Component(props: AnalyticsTableProps) {
  const columns = props.children.map(({ props }) => props);
  try {
    const results = await fetchData(props);

    return <ClientTable {...props} columns={columns} items={results} resizableColumns />;
  } catch (e) {
    const safeError = z.instanceof(Error).parse(e);

    return (
      <ClientTable
        {...props}
        columns={props.children.map(({ props }) => props)}
        items={[]}
        resizableColumns
        empty={<Alert error={safeError} />}
      />
    );
  }
}

async function fetchData(props: AnalyticsTableProps) {
  const Params = z.object({
    orgId: z.string().uuid(),
    licenseKey: z.string().uuid(),
  });
  const { orgId, licenseKey } = Params.parse(props.params);
  const columns = props.children.map((c) => c.props.id.toLowerCase() as Lowercase<AttributeKey>);
  const filters = props.children
    .flatMap(
      ({ props }) =>
        props.filters?.map((ops) => ({
          field: props.id,
          ...ops,
        })) ?? []
    )
    .flat()
    .map(mapFilter)
    .flatMap((filter) => (filter ? [filter] : []));

  const now = Date.now();
  const start = new Date(now - 1000 * 60 * 60);
  const end = new Date(now);

  const result = await fetchImpressions({ next: { revalidate: 60 } }, orgId, {
    licenseKey,
    start,
    end,
    filters,
    limit: props.limit,
  });

  const cells: Cell[] = [];

  if ("impressions" in result) {
    const detailedImpressions = await Promise.all(
      result.impressions.flatMap((impression) => {
        if (impression.impressionId) {
          return fetchImpression(impression.impressionId, licenseKey, { next: { revalidate: 10000 } }, orgId).then(
            (details) => ({
              impressionId: impression.impressionId,
              details,
            })
          );
        } else {
          return [];
        }
      })
    );

    for (const impression of detailedImpressions) {
      const item: Cell = {};

      for (const d in impression.details) {
        const detail = impression.details[d];
        for (const sample of detail as Item[]) {
          for (const column of columns) {
            const value = sample[column];
            //const value = sample[key];
            if (typeof value === "number" || typeof value === "string") {
              item[column.toUpperCase()] ??= <>{sample[column]}</>;
            }
          }
        }
      }

      cells.push(item);
    }
  }

  return cells;
}
