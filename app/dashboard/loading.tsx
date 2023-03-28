import Board from "@/components/board";
import BoardItem from "@/components/board-item";
import { Fallback as BarChart } from "@/components/bar-chart";
import Bar from "@/components/bar";
import { Fallback as AreaChart } from "@/components/area-chart";
import Filter, { contains, equals, greaterThan } from "@/components/filter";

export default async function Loading() {
	return (
		<Board>
			<BoardItem id="area-chart" rowSpan={2} columnSpan={2}>
				<AreaChart />
			</BoardItem>
			<BoardItem id="area" rowSpan={2} columnSpan={2}>
				<BarChart>
					<Bar query="count" id="AVC" dimension="IMPRESSION_ID">
						<Filter
							name="SUPPORTED_VIDEO_CODECS"
							{...contains("avc")}
						/>
						<Filter name="VIDEO_STARTUPTIME" {...greaterThan(0)} />
					</Bar>
					<Bar query="count" id="HEVC" dimension="IMPRESSION_ID">
						<Filter
							name="SUPPORTED_VIDEO_CODECS"
							{...contains("hevc")}
						/>
						<Filter name="VIDEO_STARTUPTIME" {...greaterThan(0)} />
					</Bar>
					<Bar query="count" id="VP9" dimension="IMPRESSION_ID">
						<Filter
							name="SUPPORTED_VIDEO_CODECS"
							{...contains("vp9")}
						/>
						<Filter name="VIDEO_STARTUPTIME" {...greaterThan(0)} />
					</Bar>
					<Bar query="count" id="AV1" dimension="IMPRESSION_ID">
						<Filter
							name="SUPPORTED_VIDEO_CODECS"
							{...contains("av1")}
						/>
						<Filter name="VIDEO_STARTUPTIME" {...greaterThan(0)} />
					</Bar>
				</BarChart>
			</BoardItem>
		</Board>
	);
}
