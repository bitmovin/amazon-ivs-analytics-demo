import Board from "@/components/board";
import BoardItem from "@/components/board-item";
import BarChart from "@/components/bar-chart";
import Bar from "@/components/bar";
import AreaChart from "@/components/area-chart";
import Header from "@/components/client/Header";
import Filter from "@/components/filter";
import Area from "@/components/area";
import Table, { Column } from "@/components/table";

export default function Page(props: { searchParams: unknown }) {
	return (
		<Board>
			<BoardItem
				id="area-chart"
				header={<Header>Error Rate</Header>}
				columnSpan={2}
				rowSpan={3}
			>
				<AreaChart params={props.searchParams} xScaleType="time">
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
				id="bar-chart"
				header={<Header>Video Codecs</Header>}
				columnSpan={2}
				rowSpan={3}
			>
				<BarChart
					params={props.searchParams}
					interval="DAY"
					limit={100}
				>
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
				id="table"
				header={<Header>Error Sessions</Header>}
				columnSpan={2}
				rowSpan={4}
			>
				<Table
					params={props.searchParams}
					variant="embedded"
					stickyHeader
					limit={100}
				>
					<Column id="IMPRESSION_ID" filters={[{ not: "null" }]}>
						ID
					</Column>
					<Column
						id="ERROR_CODE"
						filters={[{ above: 0 }, { not: 10000 }]}
					>
						Error
					</Column>
					<Column id="PATH">Path</Column>
					<Column id="VIDEO_TITLE">Video</Column>
					<Column id="OPERATINGSYSTEM">OS</Column>
					<Column id="BROWSER">Browser</Column>
				</Table>
			</BoardItem>
		</Board>
	);
}


