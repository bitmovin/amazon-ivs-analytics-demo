import { Suspense } from "react";
import AreaChartItem from "@/client/AreaChartItem";
import { fetchAvg } from "@/server/bitmovin";
import {
	AnalyticsAttribute,
	AnalyticsInterval,
	AnalyticsOrder,
} from "@bitmovin/api-sdk";
import Spinner from "@/client/Spinner";

export type SessionsChartProps = { licenseKey: string; orgId: string };

export default function SessionsChart(props: SessionsChartProps) {
	return (
		<Suspense fallback={<Fallback />}>
			{/* @ts-expect-error suspense */}
			<Component {...props} />
		</Suspense>
	);
}

function Fallback() {
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

async function Component(props: SessionsChartProps) {
	const now = Date.now();
	const start = new Date(now - 1000 * 60 * 60);
	const end = new Date(now);
	const orgId = props.orgId;
	const licenseKey = props.licenseKey;

	const avg = await fetchAvg({ next: { revalidate: 60 } }, orgId, {
		filters: [],
		groupBy: [],
		orderBy: [
			{
				name: AnalyticsAttribute.MINUTE,
				order: AnalyticsOrder.DESC,
			},
		],
		dimension: AnalyticsAttribute.REBUFFER_PERCENTAGE,
		includeContext: true,
		start,
		end,
		licenseKey,
		interval: AnalyticsInterval.MINUTE,
		limit: 200,
	});

	return (
		<AreaChartItem
			hideFilter={true}
			fallback={
				<div>
					<Spinner fallback={<p>Loading sessions</p>} />
					Loading sessions
				</div>
			}
			series={[
				{
					title: "Rebuffer %",
					type: "area",
					data:
						avg.rows?.map((row) => ({
							x: row[0] as number,
							y: (row[1] as number) * 100,
						})) || [],
				},
			]}
		/>
	);
}
