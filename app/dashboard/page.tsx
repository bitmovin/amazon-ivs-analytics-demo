import Board from "@/client/Board";
import BarChartItem from "@/client/BarChartItem";
import { redirect } from "next/navigation";
import Header from "@/client/Header";
import AnalyticsChart from "./analytics-chart";
import Table from "./analytics-table";
import Spinner from "@/client/Spinner";
import getDictionary from "@/server/dictionaries";
import Link from "next/link";
import Box from "@/client/Box";

export default async function Page(props: PageProps<"/dashboard">) {
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
					...(
						[
							"REBUFFER_PERCENTAGE",
							"ERROR_RATE",
							"DROPPED_FRAMES",
						] as const
					).map((dimension) => ({
						id: "analytics-chart" as const,
						dimension,
						minColumnSpan: 1,
						minRowSpan: 3,
						disableContentPaddings: false,
					})),
					...(["ERROR_CODE"] as const).map((dimension) => ({
						id: "analytics-table" as const,
						dimension,
						minColumnSpan: 2,
						minRowSpan: 3,
						disableContentPaddings: true,
						footer: (
							<Box textAlign="center">
								<Link href="/dashboard/sessions">View all</Link>
							</Box>
						),
					})),
				] as const
			).map((chart, id) => {
				return {
					id: `${chart}_${id}`,
					definition: {
						minColumnSpan: chart.minColumnSpan,
						minRowSpan: chart.minRowSpan,
					},
					data: {
						header: (
							<Header
								variant="h3"
								fallback={
									<Spinner fallback={<p>Loading...</p>} />
								}
							>
								{dict.dimensions[chart.dimension]}
							</Header>
						),
						disableContentPaddings: chart.disableContentPaddings,
						footer: "footer" in chart ? chart.footer : <></>,
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
										1601089200000, 1601096400000,
										1601103600000, 1601110800000,
										1601118000000,
									]}
									yDomain={[-10000, 40000]}
								/>
							) : chart.id === "analytics-chart" ? (
								<AnalyticsChart
									{...params}
									query="avg"
									dimension={chart.dimension}
									limit={100}
									orderBy={[
										{ name: "MINUTE", order: "DESC" },
									]}
									interval="MINUTE"
								/>
							) : chart.id === "analytics-table" ? (
								<Table
									{...params}
									filters={[
										{
											name: chart.dimension,
											operator: "NE",
											value: null,
										},
										{
											name: chart.dimension,
											operator: "NE",
											value: 10000,
										},
									]}
									limit={100}
									dimension={chart.dimension}
									columns={{
										time: {
											header: <>{"Time"}</>,
											type: "link",
											href: "/dashboard/sessions",
										},
										path: {
											header: <>{"Path"}</>,
											type: "text",
										},
										video_title: {
											header: <>{"Video"}</>,
											type: "text",
										},
										operatingsystem: {
											header: <>{"OS"}</>,
											type: "text",
										},
										browser: {
											header: <>{"Browser"}</>,
											type: "text",
										},
										error_code: {
											header: <>{"Error Code"}</>,
											type: "text",
										},
									}}
								/>
							) : (
								<></>
							),
					},
				};
			})}
		/>
	);
}