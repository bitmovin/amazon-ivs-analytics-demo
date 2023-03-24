import { Suspense } from "react";
import { fetchImpression, fetchImpressions } from "@/server/bitmovin";
import {
	AnalyticsAttribute,
	AnalyticsNotEqualFilter,
	AnalyticsQueryOperator,
} from "@bitmovin/api-sdk";
import Table from "@/client/Table";
import format from "date-fns/format";
import Spinner from "@/client/Spinner";

export type SessionsTableProps = { licenseKey: string; orgId: string };

export default function SessionsTable(props: SessionsTableProps) {
	return (
		<Suspense fallback={<Fallback />}>
			{/* @ts-expect-error suspense */}
			<Component {...props} />
		</Suspense>
	);
}

function Fallback() {
	return (
		<Table
			loading={true}
			loadingText="Loading sessions"
			items={[]}
			columnDefinitions={[]}
			fallback={
				<div>
					<Spinner fallback={<p>Loading...</p>} />
					Loading sessions
				</div>
			}
		/>
	);
}

async function Component(props: SessionsTableProps) {
	const now = Date.now();
	const start = new Date(now - 1000 * 60 * 10);
	const end = new Date(now);

	const errorImpressions = await fetchImpressions(
		{ next: { revalidate: 60 } },
		props.orgId,
		{
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
			],
		}
	);

	const impressions = errorImpressions.impressions || [];

	const impressionIds = impressions.flatMap(({ impressionId }) =>
		impressionId ? [impressionId] : []
	);

	const details = impressionIds.map((id) =>
		fetchImpression(
			id,
			props.licenseKey,
			{ next: { revalidate: 60 } },
			props.orgId
		).then((details) => ({
			TIME: format(details[0].time || 0, "dd/LL/yyyy, hh:mm:ss"),
			PATH: details[0].path,
			VIDEO: details[0].videoTitle,
			OS: details[0].operatingsystem,
			PLATFORM: details[0].platform,
			BROWSER: details[0].browser,
		}))
	);

	const sessions = await Promise.all(details);

	return (
		<Table
			loading={false}
			items={sessions}
			variant="embedded"
			columnDefinitions={[]}
			fallback={
				<div>
					<Spinner fallback={<p>Loading...</p>} />
					Loading sessions
				</div>
			}
		/>
	);
}
