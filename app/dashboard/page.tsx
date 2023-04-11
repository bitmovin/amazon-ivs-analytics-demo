import Board from "@/components/board";
import BoardItem from "@/components/board-item";
import BarChart from "@/components/bar-chart";
import Bar from "@/components/bar";
import AreaChart from "@/components/area-chart";
import Header from "@/components/client/Header";
import Filter from "@/components/filter";
import Area from "@/components/area";
import ImpressionsTable, {
	ImpressionsColumn as ImpressionsColumn,
} from "./(details)/impressions/impressions-table";
import SessionsTable, {
	SessionsColumn,
} from "./(details)/sessions/sessions-table";
import ContentLayout from "@/components/client/ContentLayout";
import { getSession } from "@/server/session";

function capitalizeString<T extends string>(literal: T): Capitalize<T> {
	const firstLetter = literal.charAt(0);
	const otherLetters = literal.slice(1);
	const letter = firstLetter.toUpperCase();
	return `${letter}${otherLetters}` as Capitalize<T>;
}

export default async function Page(props: {
	searchParams: {
		orgId?: string;
		licenseKey?: string;
		channelArn?: string;
	};
}) {
	const { searchParams, aws } = await getSession(props.searchParams);
	const { orgId, licenseKey, channelArn } = searchParams;
	const { selectedChannel } = aws;

	const name = selectedChannel.name;
	const parts = name?.split("-");

	const uppercase = parts?.map(capitalizeString);
	const title = uppercase?.join(" ");

	return (
		<ContentLayout header={<Header>{title}</Header>}>
			<Board>
				<BoardItem
					id="area-chart"
					header={<Header>Error Rate</Header>}
					columnSpan={2}
					rowSpan={3}
				>
					<AreaChart
						orgId={orgId}
						licenseKey={licenseKey}
						xScaleType="time"
					>
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
						orgId={orgId}
						licenseKey={licenseKey}
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
					id="impressions-table"
					header={<Header>Error Sessions</Header>}
					columnSpan={2}
					rowSpan={4}
				>
					<ImpressionsTable
						orgId={orgId}
						licenseKey={licenseKey}
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
						<ImpressionsColumn id="VIDEO_TITLE">
							Video
						</ImpressionsColumn>
						<ImpressionsColumn id="OPERATINGSYSTEM">
							OS
						</ImpressionsColumn>
						<ImpressionsColumn id="BROWSER">
							Browser
						</ImpressionsColumn>
					</ImpressionsTable>
				</BoardItem>
				<BoardItem
					id="sessions-table"
					header={<Header>Stream Sessions</Header>}
					columnSpan={2}
					rowSpan={4}
				>
					<SessionsTable
						channelArn={channelArn}
						variant="embedded"
						stickyHeader
						limit={100}
					>
						<SessionsColumn id="streamId">Stream ID</SessionsColumn>
						<SessionsColumn id="startTime">
							Start Time
						</SessionsColumn>
						<SessionsColumn id="endTime">End Time</SessionsColumn>
						<SessionsColumn id="error">Error</SessionsColumn>
						<SessionsColumn id="detailLink" />
					</SessionsTable>
				</BoardItem>
			</Board>
		</ContentLayout>
	);
}
