import Board from "@/components/board";
import BoardItem from "@/components/board-item";
import BarChart from "@/components/bar-chart";
import Bar from "@/components/bar";
import AreaChart from "@/components/area-chart";
import { redirect } from "next/navigation";
import { PageProps } from "@/types/page";
import Header from "@/components/client/Header";
import Filter, { contains, greaterThan } from "@/components/filter";
import Area from "@/components/area";

export default async function Page(props: PageProps<"/dashboard">) {
	const orgId = props.searchParams.orgId;
	const licenseKey = props.searchParams.licenseKey;

	if (!licenseKey || !orgId) {
		redirect("/");
	}

	return (
		<Board>
			<BoardItem
				id="area-chart"
				header={<Header>Error Rate</Header>}
				columnSpan={3}
				rowSpan={2}
			>
				<AreaChart
					licenseKey={licenseKey}
					orgId={orgId}
					xScaleType="time"
				>
					<Area
						id="Error %"
						query="avg"
						dimension="ERROR_RATE"
						interval="MINUTE"
						factor={1000}
						limit={100}
					/>
				</AreaChart>
			</BoardItem>
			<BoardItem
				id="bar-chart"
				header={<Header>Video Codecs</Header>}
				rowSpan={3}
				columnSpan={2}
			>
				<BarChart
					licenseKey={licenseKey}
					orgId={orgId}
					query={"count"}
					interval="DAY"
					limit={100}
				>
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
