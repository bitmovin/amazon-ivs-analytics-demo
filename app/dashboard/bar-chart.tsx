import { Suspense } from "react";
import BarChartItem from "@/client/BarChartItem";
import {
	Filter,
	fetchQuery,
	mapFilters,
	Interval,
	Order,
} from "@/server/bitmovin";
import {
	AnalyticsAttribute,
	AnalyticsInterval,
	AnalyticsOrder,
} from "@bitmovin/api-sdk";
import Spinner from "@/client/Spinner";
import QueriesApi from "@bitmovin/api-sdk/dist/analytics/queries/QueriesApi";
import { BarChartProps } from "@cloudscape-design/components/bar-chart";
import { ChartDataTypes } from "@cloudscape-design/components/mixed-line-bar-chart/interfaces";

type Query<K extends keyof QueriesApi> = Parameters<typeof fetchQuery<K>>[0];
type Dimension = keyof typeof AnalyticsAttribute;

export type ChartProps<K extends keyof QueriesApi> = {
	licenseKey: string;
	orgId: string;
	dimension: Dimension;
	query: Query<K>;
	interval: Interval;
	orderBy: {
		name: Dimension;
		order: Order;
	}[];
	bars: {
		name: string;
		filters: Filter[];
	}[];
} & Partial<BarChartProps<ChartDataTypes>>;

export default function AnalyticsChart<K extends keyof QueriesApi>(
	props: ChartProps<K>
) {
	return (
		<Suspense fallback={<Fallback {...props} />}>
			{/* @ts-expect-error suspense */}
			<Component {...props} />
		</Suspense>
	);
}

function Fallback<K extends keyof QueriesApi>(props: ChartProps<K>) {
	return (
		<BarChartItem
			{...props}
			empty={
				<div>
					<Spinner fallback={<p>Loading sessions</p>} />
					Loading sessions
				</div>
			}
			fallback={
				<div>
					<Spinner fallback={<p>Loading sessions</p>} />
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
	const dimension = AnalyticsAttribute[props.dimension];
	const interval = AnalyticsInterval[props.interval];
	const orderBy = props.orderBy.map((orderBy) => ({
		name: AnalyticsAttribute[orderBy.name],
		order: AnalyticsOrder[orderBy.order],
	}));

	const result = await Promise.all(
		Object.values(props.bars).map((bar) =>
			fetchQuery(props.query, { next: { revalidate: 60 } }, orgId, {
				filters: bar.filters.map(mapFilters),
				dimension,
				includeContext: true,
				start,
				end,
				interval,
				licenseKey,
				orderBy,
			}).then((response) => ({
				name: bar.name,
				...response,
			}))
		)
	);

	const bars = result ?? [];

	return (
		<BarChartItem
			{...props}
			fallback={
				<div>
					<Spinner fallback={<p>Loading sessions</p>} />
					Loading sessions
				</div>
			}
			xScaleType="categorical"
			yScaleType="linear"
			series={bars.map((bar) => ({
				type: "bar",
				title: bar.name,
				data: [
					{
						x: bar.name,
						y: bar.rowCount || 0,
					},
				],
			}))}
		/>
	);
}
