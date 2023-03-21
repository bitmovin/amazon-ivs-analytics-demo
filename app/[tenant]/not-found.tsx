"use client";

"use client";

import dynamic from "next/dynamic";

const Spinner = dynamic(() => import("@/client/Spinner"), {
	loading: (props) => <p>Loading...</p>,
});

const Alert = dynamic(() => import("@/client/Alert"), {
	loading: (props) => <Spinner />,
});

export default function ErrorPage(props: { error: Error }) {
	return (
		<Alert type="error">
			<p>Tenant not Found</p>
		</Alert>
	);
}
