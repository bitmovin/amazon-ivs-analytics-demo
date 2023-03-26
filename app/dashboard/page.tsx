import Board from "@/client/Board";
import { redirect } from "next/navigation";
import Header from "@/client/Header";
import AreaChart from "./area-chart";
import BarChart from "./bar-chart";
import Table from "./analytics-table";
import Spinner from "@/client/Spinner";
import getDictionary from "@/server/dictionaries";
import Link from "next/link";
import Box from "@/client/Box";
import { PageProps } from "../types";

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
					...(["SUPPORTED_VIDEO_CODECS"] as const).map((filter) => ({
						id: "bar" as const,
						filter,
						dimension: "IMPRESSION_ID",
						minColumnSpan: 1,
						minRowSpan: 3,
						disableContentPaddings: true,
					})),
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
						disableContentPaddings: true,
					})),
					...(["ERROR_CODE"] as const).map((dimension) => ({
						id: "analytics-table" as const,
						dimension,
						minColumnSpan: 2,
						minRowSpan: 3,
						disableContentPaddings: true,
						footer: (
							<Box textAlign="center">
								<Link
									href={{
										pathname: "/dashboard/sessions",
										query: {
											licenseKey,
											orgId,
											dimension,
										},
									}}
								>
									View all
								</Link>
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
								{
									dict.dimensions[
										"filter" in chart
											? chart["filter"]
											: chart.dimension
									]
								}
							</Header>
						),
						disableContentPaddings: chart.disableContentPaddings,
						footer: "footer" in chart ? chart.footer : <></>,
						element:
							chart.id === "bar" ? (
								<BarChart
									{...params}
									hideFilter={true}
									dimension="IMPRESSION_ID"
									interval="MINUTE"
									horizontalBars={false}
									orderBy={[
										{ name: "MINUTE", order: "DESC" },
									]}
									bars={[
										{
											name: "AVC",
											filters: [
												{
													name: chart.filter,
													operator: "CONTAINS",
													value: "avc",
												},

												{
													name: "VIDEO_STARTUPTIME",
													operator: "GT",
													value: 0,
												},
											],
										},
										{
											name: "HEVC",
											filters: [
												{
													name: chart.filter,
													operator: "CONTAINS",
													value: "hevc",
												},

												{
													name: "VIDEO_STARTUPTIME",
													operator: "GT",
													value: 0,
												},
											],
										},
										{
											name: "VP9",
											filters: [
												{
													name: chart.filter,
													operator: "CONTAINS",
													value: "vp9",
												},
												{
													name: "VIDEO_STARTUPTIME",
													operator: "GT",
													value: 0,
												},
											],
										},
										{
											name: "AV1",
											filters: [
												{
													name: chart.filter,
													operator: "CONTAINS",
													value: "av1",
												},

												{
													name: "VIDEO_STARTUPTIME",
													operator: "GT",
													value: 0,
												},
											],
										},
									]}
									query={"count"}
								/>
							) : chart.id === "analytics-chart" ? (
								<AreaChart
									{...params}
									query="avg"
									dimension={chart.dimension}
									limit={100}
									interval="MINUTE"
									orderBy={[
										{ name: "MINUTE", order: "DESC" },
									]}
									hideFilter={true}
									xScaleType="time"
								/>
							) : chart.id === "analytics-table" ? (
								<Table
									{...params}
									variant="embedded"
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
											type: "text",
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
