import "server-only";

import { Suspense } from "react";
import PieChartItem from "@/components/client/PieChartItem";
import { fetchImpressions } from "@/server/bitmovin";
import {
	AnalyticsAttribute,
	AnalyticsNotEqualFilter,
	AnalyticsQueryOperator,
} from "@bitmovin/api-sdk";
import Spinner from "@/components/client/Spinner";

export type PieChartProps = { licenseKey: string; orgId: string };

export default function PieChart(props: PieChartProps) {
	return (
		<Suspense fallback={<Fallback />}>
			{/* @ts-expect-error suspense */}
			<Component {...props} />
		</Suspense>
	);
}

function Fallback() {
	return (
		<PieChartItem
			loadingText="Loading sessions"
			empty={
				<div>
					<Spinner />
					Loading sessions
				</div>
			}
			data={[]}
		/>
	);
}

async function Component(props: PieChartProps) {
	const now = Date.now();
	const start = new Date(now - 1000 * 60 * 10);
	const end = new Date(now);

	const platformErrors = (platform: string) =>
		fetchImpressions({ next: { revalidate: 60 } }, props.orgId, {
			limit: 100,
			licenseKey: props.licenseKey,
			start,
			end,
			filters: [
				new AnalyticsNotEqualFilter({
					name: AnalyticsAttribute.ERROR_CODE,
					operator: AnalyticsQueryOperator.NE,
					value: null,
				}),
				new AnalyticsNotEqualFilter({
					name: AnalyticsAttribute.ERROR_CODE,
					operator: AnalyticsQueryOperator.NE,
					value: 10000,
				}),
				new AnalyticsNotEqualFilter({
					name: AnalyticsAttribute.PLATFORM,
					operator: AnalyticsQueryOperator.EQ,
					value: platform,
				}),
			],
		});

	const [ios, tvOS, web, androidTV, android, roku] = await Promise.all([
		platformErrors("iOS"),
		platformErrors("tvOS"),
		platformErrors("web"),
		platformErrors("androidTV"),
		platformErrors("android"),
		platformErrors("roku"),
	]);

	const total =
		(ios.impressions?.length || 0) +
		(tvOS.impressions?.length || 0) +
		(web.impressions?.length || 0) +
		(androidTV.impressions?.length || 0) +
		(android.impressions?.length || 0) +
		(roku.impressions?.length || 0);

	return (
		<PieChartItem
			empty={<p>Empty</p>}
			hideFilter={true}
			hideDescriptions={true}
			hideLegend={true}
			hideTitles={true}
			variant="donut"
			innerMetricValue={`${total}`}
			data={[
				{
					title: "iOS",
					value: ios.impressions?.length || 0,
				},
				{
					title: "tvOS",
					value: tvOS.impressions?.length || 0,
				},
				{
					title: "Web",
					value: web.impressions?.length || 0,
				},

				{
					title: "Android TV",
					value: androidTV.impressions?.length || 0,
				},
				{
					title: "Android",
					value: android.impressions?.length || 0,
				},
				{
					title: "Roku",
					value: roku.impressions?.length || 0,
				},
			]}
		/>
	);
}
