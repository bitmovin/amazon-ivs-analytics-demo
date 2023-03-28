import "server-only";

import { Suspense } from "react";
import AreaChartItem from "@/components/client/AreaChartItem";
import { fetchQuery } from "@/server/bitmovin";
import {
	AnalyticsAttribute,
	AnalyticsInterval,
	AnalyticsOrder,
} from "@bitmovin/api-sdk";
import Spinner from "@/components/client/Spinner";
import { AreaChartProps } from "@cloudscape-design/components";
import { ChartDataTypes } from "@cloudscape-design/components/internal/components/cartesian-chart/interfaces";
import { AreaElement } from "./area";
import { QueryType, mapFilter } from "./filter";

export type ChartProps = {
	licenseKey: string;
	orgId: string;
	children: AreaElement<QueryType> | AreaElement<QueryType>[];
} & Partial<AreaChartProps<ChartDataTypes>>;

export default function AreaChart(props: ChartProps) {
	return (
		<Suspense fallback={<Fallback {...props} />}>
			{/* @ts-expect-error suspense */}
			<Component {...props} />
		</Suspense>
	);
}

export function Fallback(props: Partial<ChartProps>) {
	return (
		<AreaChartItem
			{...props}
			empty={
				<div>
					<Spinner />
					Loading sessions
				</div>
			}
			fallback={
				<div>
					<Spinner />
					Loading sessions
				</div>
			}
			series={[]}
		/>
	);
}

async function Component(props: ChartProps) {
	const now = Date.now();
	const start = new Date(now - 1000 * 60 * 60);
	const end = new Date(now);
	const orgId = props.orgId;
	const licenseKey = props.licenseKey;

	const results = await Promise.all(
		[props.children]
			.flat()
			.flatMap((area) => (area ? [area] : []))
			.map((area) =>
				fetchQuery(
					area.props.query ?? "avg",
					{ next: { revalidate: 60 } },
					orgId,
					{
						filters: [area.props.children]
							.flat()
							.flatMap((filter) => (filter ? [filter] : []))
							.map(mapFilter),
						dimension: AnalyticsAttribute[area.props.dimension],
						includeContext: true,
						start,
						end,
						interval:
							AnalyticsInterval[area.props.interval ?? "MINUTE"],
						licenseKey,
						groupBy:
							area.props.groupBy?.map(
								(g) => AnalyticsAttribute[g]
							) ?? [],
						orderBy: [
							{
								name: AnalyticsAttribute[
									area.props.interval ?? "MINUTE"
								],
								order: AnalyticsOrder.DESC,
							},
						],
						limit: area.props.limit || 100,
					}
				)
					.then(
						({
							rowCount,
							columnLabels,
							rows,
							contextDescription,
						}) => ({
							rowCount: rowCount ?? 0,
							columnLabels: columnLabels ?? [],
							rows:
								rows?.map((row) => ({
									group:
										typeof row[1] === "string"
											? row[1]
											: undefined,

									x: row[0] as number,
									y: row[2] ?? row[1],
								})) || [],
							contextDescription: contextDescription ?? [],
						})
					)
					.then((p) => {
						console.log(p);
						return p;
					})
					.then((r) => {
						const groups = r.rows.map((r) => r.group);
						const uniqueGroups = groups.filter(
							(v, i, a) => a.indexOf(v) === i
						);

						const grouped = uniqueGroups.map((group) => {
							return {
								type: area.props.type ?? "area",
								title: group || "all",
								color: area.props.color || "",
								hidden: area.props.hidden === true,
								data: r.rows
									.filter((row) => row.group === group)
									.map((r) => r),
							} as const;
						});

						return grouped;
					})
			)
	);

	return (
		<AreaChartItem
			{...props}
			fallback={
				<div>
					<Spinner />
					Loading sessions
				</div>
			}
			series={results[0]}
		/>
	);
}
