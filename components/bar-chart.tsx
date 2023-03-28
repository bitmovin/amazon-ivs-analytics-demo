import "server-only";

import { Suspense } from "react";
import ClientBarChart from "@/components/client/BarChartItem";
import { fetchQuery, Interval, Order, Attribute } from "@/server/bitmovin";
import {
	AnalyticsAttribute,
	AnalyticsInterval,
	AnalyticsOrder,
} from "@bitmovin/api-sdk";
import Spinner from "@/components/client/Spinner";
import QueriesApi from "@bitmovin/api-sdk/dist/analytics/queries/QueriesApi";
import { BarChartProps } from "@cloudscape-design/components/bar-chart";
import { ChartDataTypes } from "@cloudscape-design/components/mixed-line-bar-chart/interfaces";
import { Query, QueryType, mapFilter } from "./filter";
import type { BarElement } from "./bar";
import React from "react";

export type ChartProps<K extends QueryType> = {
	licenseKey: string;
	orgId: string;
	query: Query<K>;
	limit: number;
	factor?: number;
	interval?: Interval;
	orderBy?: {
		name: Attribute;
		order: Order;
	}[];
	children: BarElement<QueryType>[];
} & Partial<BarChartProps<ChartDataTypes>>;

export default function BarChart<K extends QueryType>(props: ChartProps<K>) {
	return (
		<Suspense fallback={<Fallback {...props} />}>
			{/* @ts-expect-error suspense */}
			<Component {...props} />
		</Suspense>
	);
}

export function Fallback<K extends keyof QueriesApi>(
	props: Partial<ChartProps<K>>
) {
	return (
		<ClientBarChart
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

async function Component<K extends keyof QueriesApi>(props: ChartProps<K>) {
	const now = Date.now();
	const start = new Date(now - 1000 * 60 * 60 * 3);
	const end = new Date(now);
	const orgId = props.orgId;
	const licenseKey = props.licenseKey;
	const factor = props.factor || 1;
	const interval = AnalyticsInterval[props.interval ?? "DAY"];
	const limit = props.limit;
	const orderBy =
		props.orderBy?.map((orderBy) => ({
			name: AnalyticsAttribute[orderBy.name],
			order: AnalyticsOrder[orderBy.order],
		})) || [];

	const results = await Promise.all(
		props.children.map((bar) =>
			fetchQuery(bar.props.query, { next: { revalidate: 60 } }, orgId, {
				filters: bar.props.children.map(mapFilter),
				dimension: AnalyticsAttribute[bar.props.dimension],
				includeContext: true,
				start,
				end,
				interval,
				licenseKey,
				orderBy,
				limit,
			}).then((response) => ({
				type: "bar" as const,
				title: bar.props.id,
				color: bar.props.color || "",
				hidden: bar.props.hidden === true,
				data: [
					{
						x: bar.props.id,
						y: (response.rows?.at(0)?.at(0) ?? 0) * factor,
					},
				],
			}))
		)
	);

	return (
		<ClientBarChart
			{...props}
			xScaleType="categorical"
			series={results}
			visibleSeries={results.filter((visible) => !visible.hidden)}
		/>
	);
}
