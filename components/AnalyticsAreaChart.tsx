import "server-only";

import { Suspense } from "react";
import AreaChartItem from "@/components/client/AreaChartItem";
import { fetchQuery } from "@/server/bitmovin";
import { AnalyticsAttribute, AnalyticsInterval, AnalyticsOrder } from "@bitmovin/api-sdk";
import Spinner from "@/components/client/Spinner";
import { AreaChartProps } from "@cloudscape-design/components";
import { ChartDataTypes } from "@cloudscape-design/components/internal/components/cartesian-chart/interfaces";
import { AreaElement } from "./area";
import { QueryType, mapFilter } from "./filter";
import { z } from "zod";
import { Alert } from "./alert";

export type AnalyticsChartProps = {
  orgId: string;
  licenseKey: string;
  children: AreaElement<QueryType> | AreaElement<QueryType>[];
  startTime: number;
  endTime: number;
} & Partial<AreaChartProps<ChartDataTypes>>;

export default function AnalyticsAreaChart(props: AnalyticsChartProps) {
  return (
    <Suspense fallback={<Fallback {...props} />}>
      {/* @ts-expect-error suspense */}
      <Component {...props} />
    </Suspense>
  );
}

export function Fallback(props: Partial<AnalyticsChartProps>) {
  return (
    <AreaChartItem
      {...props}
      empty={
        <div>
          <Spinner />
          Loading sessions
        </div>
      }
      series={[]}
    />
  );
}

async function Component(props: AnalyticsChartProps) {
  try {
    const results = await fetchData(props);

    return <AreaChartItem {...props} series={results[0]} />;
  } catch (e) {
    const safeError = z.instanceof(Error).parse(e);
    return <AreaChartItem series={[]} empty={<Alert error={safeError} />} />;
  }
}
async function fetchData(props: AnalyticsChartProps) {
  const { orgId, licenseKey, startTime, endTime } = props;

  const results = await Promise.all(
    [props.children]
      .flat()
      .flatMap((area) => (area ? [area] : []))
      .map((area) =>
        fetchQuery(area.props.query ?? "avg", { next: { revalidate: 60 } }, orgId, {
          filters: area.props.children
            ? [area.props.children]
                .flat()
                .flatMap((filter) => filter)
                .map((filter) => mapFilter(filter.props))
                .flatMap((filter) => (filter ? [filter] : []))
            : [],
          dimension: AnalyticsAttribute[area.props.field],
          includeContext: true,
          start: new Date(startTime),
          end: new Date(endTime),
          interval: AnalyticsInterval[area.props.interval ?? "MINUTE"],
          licenseKey,
          groupBy: area.props.groupBy?.map((g) => AnalyticsAttribute[g]) ?? [],
          orderBy: [
            {
              name: AnalyticsAttribute[area.props.interval ?? "MINUTE"],
              order: AnalyticsOrder.DESC,
            },
          ],
          limit: area.props.limit || 100,
        })
          .then(({ rowCount, columnLabels, rows, contextDescription }) => ({
            rowCount: rowCount ?? 0,
            columnLabels: columnLabels ?? [],
            rows:
              rows?.map((row) => ({
                group: typeof row[1] === "string" ? row[1] : undefined,

                x: row[0] as number,
                y: row[2] ?? row[1],
              })) || [],
            contextDescription: contextDescription ?? [],
          }))
          .then((r) => {
            const groups = r.rows.map((r) => r.group);
            const uniqueGroups = groups.filter((v, i, a) => a.indexOf(v) === i);

            const grouped = uniqueGroups.map((group) => {
              return {
                type: area.props.type ?? "area",
                title: group || "all",
                color: area.props.color || "",
                hidden: area.props.hidden === true,
                data: r.rows.filter((row) => row.group === group).map((r) => r),
              } as const;
            });

            return grouped;
          })
      )
  );
  return results;
}
