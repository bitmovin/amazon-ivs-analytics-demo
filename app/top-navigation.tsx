import { login } from "@/server/login";
import ClientTopNavigation from "@/components/client/TopNavigation";
import { Suspense } from "react";

export default function TopNavigation() {
	return (
		<Suspense fallback={<Fallback />}>
			{/* @ts-expect-error suspense */}
			<Component />
		</Suspense>
	);
}

function Fallback() {
	return <ClientTopNavigation username={"Loading..."} organizations={[]} />;
}

async function Component() {
	const log = await login();

	// TODO show option to switch IVS channels

	return (
		<ClientTopNavigation
			username={`${log.information.firstName} ${log.information.lastName}`}
			organizations={log.organizations.map((org) => ({
				id: org.id ?? "[error]",
				name: org.name ?? "[error]",
				licenses: org.licenses.map((license) => ({
					name: license.name ?? "[error]",
					licenseKey: license.licenseKey ?? "[error]",
				})),
			}))}
		/>
	);
}
