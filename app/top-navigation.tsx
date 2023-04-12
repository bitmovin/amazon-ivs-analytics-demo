import ClientTopNavigation from "@/components/client/TopNavigation";
import { Suspense } from "react";
import { getSession } from "@/server/session";

export default function TopNavigation() {
	return (
		<Suspense fallback={<Fallback />}>
			{/* @ts-expect-error suspense */}
			<Component />
		</Suspense>
	);
}

function Fallback() {
	return (
		<ClientTopNavigation
			href="/"
			title="Bitmovin"
			firstName={"Loading..."}
			organizations={[]}
			channelName="Loading..."
			channels={[]}
			channelArn={""}
			licenseKey={""}
			orgId={""}
		/>
	);
}

async function Component(params: {
	licenseKey?: string;
	orgId?: string;
	channelArn?: string;
}) {
	const session = await getSession(params);

	const { bitmovin, aws, searchParams } = session;
	const { information, organizations, licenses } = bitmovin;
	const { channels } = aws;
	const { orgId, licenseKey, channelArn } = searchParams;

	const source = information;
	const firstName = source?.firstName ?? "Unknown";

	const orgsWithLicenses = licenses ?? [];

	return (
		<ClientTopNavigation
			href="/"
			title="Bitmovin"
			firstName={firstName}
			orgId={orgId}
			licenseKey={licenseKey}
			channelArn={channelArn}
			organizations={orgsWithLicenses.map(
				({ id, name = "[error]", licenses }) => ({
					id,
					name,
					licenses: licenses.map(
						({ name = "[error]", licenseKey = "[error]" }) => ({
							name,
							licenseKey,
						})
					),
				})
			)}
			channelName={
				channelArn
					? channels?.find(({ arn }) => arn === channelArn)?.name ??
					  "Channels"
					: "Channels"
			}
			channels={
				channels?.map(({ arn = "[error]", name = "[error]" }) => ({
					arn,
					name,
				})) ?? []
			}
		/>
	);
}
