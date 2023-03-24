import Board from "@/client/Board";
import BarChartItem from "@/client/BarChartItem";
import { redirect } from "next/navigation";
import Header from "@/client/Header";
import SessionsChart from "./sessions-chart";
import AnalyticsChart from "./analytics-chart";
import SessionsTable from "./sessions-table";
import Spinner from "@/client/Spinner";
import { getDictionary } from "@/server/dictionaries";

export default async function Page(props: {
	searchParams: { orgId?: string; licenseKey?: string };
}) {
	const dict = await getDictionary("en");
	const orgId = props.searchParams.orgId;
	const licenseKey = props.searchParams.licenseKey;

	if (!licenseKey || !orgId) {
		redirect("/");
	}

	const params = { orgId, licenseKey };

	return (
		<Board
			fallback={<Spinner fallback={<p>{dict.loading}</p>} />}
			empty={<Spinner fallback={<p>{dict.loading}</p>} />}
			items={(
				[
					{
						id: "bar",
						dimension: "BAR_CHART",
						minColumnSpan: 1,
						minRowSpan: 3,
						disableContentPaddings: true,
					},
					{
						id: "sessions",
						dimension: "SESSIONS",
						minColumnSpan: 1,
						minRowSpan: 3,
						disableContentPaddings: true,
					},
					...(
						[
							"REBUFFER_PERCENTAGE",
							"ERROR_RATE",
							"DROPPED_FRAMES",
						] as const
					).map((dimension) => ({
						id: "analytics-chart",
						dimension,
						minColumnSpan:
							dimension === "REBUFFER_PERCENTAGE" ? 2 : 1,
						minRowSpan: 3,
						disableContentPaddings: false,
					})),
					{
						id: "sessions-table",
						dimension: "ERROR_SESSIONS",
						minColumnSpan: 2,
						minRowSpan: 3,
						disableContentPaddings: false,
					},
				] as const
			).map((chart, id) => ({
				id: `${chart}_${id}`,
				definition: {
					minColumnSpan: chart.minColumnSpan,
					minRowSpan: chart.minRowSpan,
				},
				data: {
					header: (
						<Header
							fallback={<Spinner fallback={<p>Loading...</p>} />}
						>
							{dict.dimensions[chart.dimension]}
						</Header>
					),
					disableContentPaddings: chart.disableContentPaddings,
					element:
						chart.id === "bar" ? (
							<BarChartItem
								fallback={
									<Spinner fallback={<p>Loading...</p>} />
								}
								hideFilter={true}
								hideLegend={true}
								yScaleType="linear"
								xScaleType="categorical"
								series={[
									{
										title: "Site 1",
										type: "bar",
										data: [
											{
												x: 1601089200000,
												y: 34503,
											},
											{
												x: 1601096400000,
												y: 25832,
											},
											{
												x: 1601103600000,
												y: 4012,
											},
											{
												x: 1601110800000,
												y: -5602,
											},
											{
												x: 1601118000000,
												y: 17839,
											},
										],
									},
									{
										title: "Average revenue",
										type: "threshold",
										y: 19104,
									},
								]}
								xDomain={[
									1601089200000, 1601096400000, 1601103600000,
									1601110800000, 1601118000000,
								]}
								yDomain={[-10000, 40000]}
							/>
						) : chart.id === "analytics-chart" ? (
							<AnalyticsChart
								{...params}
								dimension={chart.dimension}
							/>
						) : chart.id === "sessions-table" ? (
							<SessionsTable {...params} />
						) : (
							<SessionsChart {...params} />
						),
				},
			}))}
		/>
	);
}
