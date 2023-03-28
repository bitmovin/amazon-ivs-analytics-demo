import Board from "@/components/board";
import BoardItem from "@/components/board-item";
import { Fallback as BarChart } from "@/components/bar-chart";
import Bar from "@/components/bar";
import { Fallback as AreaChart } from "@/components/area-chart";
import Filter from "@/components/filter";
import Header from "@/components/client/Header";
import Area from "@/components/area";

export default async function Loading() {
	return (
		<Board>
			<BoardItem
				id="area-chart"
				header={<Header>Error Rate</Header>}
				columnSpan={2}
				rowSpan={3}
			>
				<AreaChart xScaleType="time">
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
				<BarChart interval="DAY" limit={100}>
					<Bar query="count" id="AVC" dimension="IMPRESSION_ID">
						<Filter field="SUPPORTED_VIDEO_CODECS" has="avc" />
						<Filter field="VIDEO_STARTUPTIME" above={0} />
					</Bar>
					<Bar query="count" id="HEVC" dimension="IMPRESSION_ID">
						<Filter field="SUPPORTED_VIDEO_CODECS" has="hevc" />
						<Filter field="VIDEO_STARTUPTIME" above={0} />
					</Bar>
					<Bar query="count" id="VP9" dimension="IMPRESSION_ID">
						<Filter field="SUPPORTED_VIDEO_CODECS" has="vp9" />
						<Filter field="VIDEO_STARTUPTIME" above={0} />
					</Bar>
					<Bar query="count" id="AV1" dimension="IMPRESSION_ID">
						<Filter field="SUPPORTED_VIDEO_CODECS" has="av1" />
						<Filter field="VIDEO_STARTUPTIME" above={0} />
					</Bar>
				</BarChart>
			</BoardItem>
		</Board>
	);
}
