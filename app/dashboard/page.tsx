import Board from "@/components/client/Board";
import BoardItem from "@/components/client/BoardItem";
import BarChart from "@/components/bar-chart";
import Bar from "@/components/bar";
import AreaChart from "@/components/area-chart";
import Header from "@/components/client/Header";
import Filter from "@/components/filter";
import Area from "@/components/area";
import ImpressionsTable, {
	ImpressionsColumn,
} from "./(details)/impressions/table";
import SessionsTable, { SessionsColumn } from "./(details)/sessions/table";
import ContentLayout from "@/components/client/ContentLayout";
import { getSession } from "@/server/session";
import Button from "@/components/client/Button";
import { Route } from "next";

interface SearchParams {
	orgId?: string | undefined;
	licenseKey?: string | undefined;
	channelArn?: string | undefined;
}

export default async function Page(props: { searchParams?: SearchParams }) {
	const session = await getSession(props?.searchParams);

	const {
		searchParams,
		aws: { channel },
	} = session;

	return (
		<ContentLayout header={<DashboardHeader {...channel} />}>
			<Board
				items={[
					{
						id: "channel-sessions",
						data: <ChannelSessions {...searchParams} />,
						definition: {
							defaultColumnSpan: 2,
							defaultRowSpan: 2,
						},
					},
					{
						id: "video-codecs",
						data: <VideoCodecs {...searchParams} />,
						definition: {
							defaultColumnSpan: 2,
							defaultRowSpan: 2,
						},
					},
					{
						id: "error-rate",
						data: <ErrorRate {...searchParams} />,
						definition: {
							defaultColumnSpan: 2,
							defaultRowSpan: 2,
						},
					},
					{
						id: "error-sessions",
						data: <ErrorSessions {...searchParams} />,
						definition: {
							defaultColumnSpan: 2,
							defaultRowSpan: 2,
						},
					},
				]}
			/>
		</ContentLayout>
	);
}

function DashboardHeader(props: {
	name?: string | undefined;
	playbackUrl?: string | undefined;
}) {
	return (
		<Header
			description={
				<Button
					href={props.playbackUrl ?? ""}
					variant="inline-icon"
					iconName="external"
					disabled={!props.playbackUrl}
				/>
			}
		>
			{props.name ?? "Channel"}
		</Header>
	);
}

function ErrorSessions(props: SearchParams) {
	return (
		<BoardItem header={<Header>Error Sessions</Header>}>
			<ImpressionsTable
				{...props}
				variant="embedded"
				stickyHeader
				limit={100}
			>
				<ImpressionsColumn
					id="IMPRESSION_ID"
					filters={[{ not: "null" }]}
				>
					ID
				</ImpressionsColumn>
				<ImpressionsColumn
					id="ERROR_CODE"
					filters={[{ above: 0 }, { not: 10000 }]}
				>
					Error
				</ImpressionsColumn>
				<ImpressionsColumn id="PATH">Path</ImpressionsColumn>
				<ImpressionsColumn id="VIDEO_TITLE">Video</ImpressionsColumn>
				<ImpressionsColumn id="OPERATINGSYSTEM">OS</ImpressionsColumn>
				<ImpressionsColumn id="BROWSER">Browser</ImpressionsColumn>
			</ImpressionsTable>
		</BoardItem>
	);
}

function VideoCodecs(props: SearchParams) {
	return (
		<BoardItem header={<Header>Video Codecs</Header>}>
			<BarChart {...props} interval="DAY" limit={100}>
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
	);
}

function ErrorRate(props: SearchParams) {
	return (
		<BoardItem header={<Header>Error Rate</Header>}>
			<AreaChart {...props} xScaleType="time">
				<Area
					query="avg"
					field="ERROR_RATE"
					interval="MINUTE"
					factor={1000}
					limit={100}
				/>
			</AreaChart>
		</BoardItem>
	);
}

function ChannelSessions(props: SearchParams) {
	const { orgId, licenseKey, channelArn } = props;
	const href =
		`/dashboard/sessions?orgId=${orgId}&licenseKey=${licenseKey}&channelArn=${channelArn}` satisfies Route;
	return (
		<BoardItem
			header={
				<Header
					actions={
						<Button
							route={href}
							variant="inline-icon"
							iconName="view-full"
						/>
					}
				>
					Stream Sessions
				</Header>
			}
		>
			<SessionsTable
				channelArn={channelArn}
				variant="embedded"
				stickyHeader
				maxResults={100}
			>
				<SessionsColumn id="streamId">Stream ID</SessionsColumn>
				<SessionsColumn id="startTime">Start Time</SessionsColumn>
				<SessionsColumn id="endTime">End Time</SessionsColumn>
				<SessionsColumn id="error">Error</SessionsColumn>
				<SessionsColumn id="detailLink" />
			</SessionsTable>
		</BoardItem>
	);
}
