import ContentLayout from "@/components/client/ContentLayout";
import SessionHeader from "./header";
import SessionBoard from "./board";

export type StreamSessionProps = {
	streamId: string;
	channelArn: string;
};

export type StreamSessionComponent = (props: StreamSessionProps) => JSX.Element;

export default async function Page({
	searchParams,
}: {
	searchParams: StreamSessionProps;
}) {
	return (
		<ContentLayout header={<SessionHeader {...searchParams} />}>
			<SessionBoard {...searchParams} />
		</ContentLayout>
	);
}
