import { Suspense } from "react";
import AreaChartItem from "@/client/AreaChartItem";
import { fetchQuery } from "@/server/bitmovin";
import {
	AnalyticsAttribute,
	AnalyticsInterval,
	AnalyticsOrder,
} from "@bitmovin/api-sdk";
import Spinner from "@/client/Spinner";
import QueriesApi from "@bitmovin/api-sdk/dist/analytics/queries/QueriesApi";

type Query<K extends keyof QueriesApi> = Parameters<typeof fetchQuery<K>>[0];
type Dimension = keyof typeof AnalyticsAttribute;
type Order = keyof typeof AnalyticsOrder;
type Interval = keyof typeof AnalyticsInterval;

export type AnalyticsChartProps<K extends keyof QueriesApi> = {
	licenseKey: string;
	orgId: string;
	dimension: Dimension;
	query: Query<K>;
	limit: number;
	interval: Interval;
	orderBy: {
		name: Dimension;
		order: Order;
	}[];
};

export default function AnalyticsChart<K extends keyof QueriesApi>(
	props: AnalyticsChartProps<K>
) {
	return (
		<Suspense fallback={<Fallback {...props} />}>
			{/* @ts-expect-error suspense */}
			<Component {...props} />
		</Suspense>
	);
}

function Fallback<K extends keyof QueriesApi>(props: AnalyticsChartProps<K>) {
	return (
		<AreaChartItem
			loadingText="Loading sessions"
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

async function Component<K extends keyof QueriesApi>(
	props: AnalyticsChartProps<K>
) {
	const now = Date.now();
	const start = new Date(now - 1000 * 60 * 60);
	const end = new Date(now);
	const orgId = props.orgId;
	const licenseKey = props.licenseKey;
	const dimension = AnalyticsAttribute[props.dimension];
	const interval = AnalyticsInterval[props.interval];
	const limit = props.limit;
	const orderBy = props.orderBy.map((orderBy) => ({
		name: AnalyticsAttribute[orderBy.name],
		order: AnalyticsOrder[orderBy.order],
	}));

	const result = await fetchQuery(
		props.query,
		{ next: { revalidate: 60 } },
		orgId,
		{
			filters: [],
			groupBy: [],
			orderBy,
			dimension,
			includeContext: true,
			start,
			end,
			licenseKey,
			interval,
			limit,
		}
	);

	const rows = result.rows ?? [];

	return (
		<AreaChartItem
			hideFilter={true}
			fallback={
				<div>
					<Spinner fallback={<p>Loading sessions</p>} />
					Loading sessions
				</div>
			}
			xScaleType="time"
			xDomain={[start.getTime(), end.getTime()]}
			series={[
				{
					title: dimension,
					type: "area",
					data: rows.map((row) => ({
						x: row[0] as number,
						y: row[1] as number,
					})),
				},
			]}
		/>
	);
}
