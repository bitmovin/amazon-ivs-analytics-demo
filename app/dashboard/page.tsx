import Board from "@/components/board";
import BoardItem from "@/components/board-item";
import BarChart from "@/components/bar-chart";
import Bar from "@/components/bar";
import AreaChart from "@/components/area-chart";
import { z } from "zod";
import Header from "@/components/client/Header";
import Filter from "@/components/filter";
import Area from "@/components/area";
import Table, { Column } from "@/components/table";
import Link from "next/link";

const Params = z.object({
	orgId: z.string().uuid(),
	licenseKey: z.string().uuid(),
});

export default async function Page(props: { searchParams: unknown }) {
	const params = Params.parse(props.searchParams);

	return (
		<Board>
			<BoardItem
				id="area-chart"
				header={<Header>Error Rate</Header>}
				columnSpan={2}
				rowSpan={3}
			>
				<AreaChart {...params} xScaleType="time">
					<Area
						query="avg"
						field="ERROR_RATE"
						interval="MINUTE"
						factor={1000}
						limit={100}
					/>
				</AreaChart>
			</BoardItem>
			<BoardItem
				{...params}
				id="bar-chart"
				header={<Header>Video Codecs</Header>}
				columnSpan={2}
				rowSpan={3}
			>
				<BarChart {...params} interval="DAY" limit={100}>
					<Bar id="AVC" query="count" dimension="IMPRESSION_ID">
						<Filter field="SUPPORTED_VIDEO_CODECS" has="avc" />
						<Filter field="VIDEO_STARTUPTIME" above={0} />
					</Bar>
					<Bar id="HEVC" query="count" dimension="IMPRESSION_ID">
						<Filter field="SUPPORTED_VIDEO_CODECS" has="hevc" />
						<Filter field="VIDEO_STARTUPTIME" above={0} />
					</Bar>
					<Bar id="VP9" query="count" dimension="IMPRESSION_ID">
						<Filter field="SUPPORTED_VIDEO_CODECS" has="vp9" />
						<Filter field="VIDEO_STARTUPTIME" above={0} />
					</Bar>
					<Bar id="AV1" query="count" dimension="IMPRESSION_ID">
						<Filter field="SUPPORTED_VIDEO_CODECS" has="av1" />
						<Filter field="VIDEO_STARTUPTIME" above={0} />
					</Bar>
				</BarChart>
			</BoardItem>
			<BoardItem
				{...params}
				id="table"
				header={<Header>Error Sessions</Header>}
				footer={
					<Link
						href={{
							pathname: "/dashboard/sessions",
							query: params,
						}}
					>
						View all
					</Link>
				}
				columnSpan={2}
				rowSpan={4}
			>
				<Table {...params} variant="embedded" stickyHeader limit={100}>
					<Column id="impression_id" filters={[{ not: "null" }]}>
						ID
					</Column>
					<Column
						id="error_code"
						filters={[{ above: 0 }, { not: 10000 }]}
					>
						Error
					</Column>
					<Column id="path">Path</Column>
					<Column id="video_title">Video</Column>
					<Column id="operatingsystem">OS</Column>
					<Column id="browser">Browser</Column>
				</Table>
			</BoardItem>
		</Board>
	);
}


