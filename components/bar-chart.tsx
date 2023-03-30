import "server-only";

import { Suspense } from "react";
import ClientBarChart from "@/components/client/BarChartItem";
import { fetchQuery, Interval, Order, AttributeKey } from "@/server/bitmovin";
import {
	AnalyticsAttribute,
	AnalyticsInterval,
	AnalyticsOrder,
} from "@bitmovin/api-sdk";
import Spinner from "@/components/client/Spinner";
import { BarChartProps } from "@cloudscape-design/components/bar-chart";
import { ChartDataTypes } from "@cloudscape-design/components/mixed-line-bar-chart/interfaces";
import { QueryType, mapFilter } from "./filter";
import type { BarElement } from "./bar";
import React from "react";
import { z } from "zod";
import { Alert } from "./alert";

export type ChartProps = {
	params: unknown;
	limit: number;
	factor?: number;
	interval?: Interval;
	orderBy?: {
		name: AttributeKey;
		order: Order;
	}[];
	children: BarElement<QueryType>[];
} & Partial<BarChartProps<ChartDataTypes>>;

export default function BarChart(props: ChartProps) {
	return (
		<Suspense fallback={<Fallback {...props} />}>
			{/* @ts-expect-error suspense */}
			<Component {...props} />
		</Suspense>
	);
}

export function Fallback(props: Partial<ChartProps>) {
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

async function Component(props: ChartProps) {
	try {
		const results = await fetchData(props);

		return (
			<ClientBarChart
				{...props}
				xScaleType="categorical"
				series={results}
				visibleSeries={results.filter((visible) => !visible.hidden)}
				statusType="finished"
			/>
		);
	} catch (e) {
		const safeError = z.instanceof(Error).parse(e);
		return (
			<ClientBarChart series={[]} empty={<Alert error={safeError} />} />
		);
	}
}

async function fetchData(props: ChartProps) {
	const Params = z.object({
		orgId: z.string().uuid(),
		licenseKey: z.string().uuid(),
	});
	const { orgId, licenseKey } = Params.parse(props.params);
	const now = Date.now();
	const start = new Date(now - 1000 * 60 * 60 * 3);
	const end = new Date(now);
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
				filters: [bar.props.children]
					.flat()
					.flatMap((filter) => filter)
					.map((filter) => mapFilter(filter.props))
					.flatMap((filter) => (filter ? [filter] : [])),
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
	return results;
}

