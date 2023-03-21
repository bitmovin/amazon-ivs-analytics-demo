"use client";

import dynamic from "next/dynamic";

const Spinner = dynamic(() => import("@/client/Spinner"), {
	loading: () => <p>Loading...</p>,
});

const Alert = dynamic(() => import("@/client/Alert"), {
	loading: () => <Spinner />,
});

export default function ErrorPage(props: { error: Error }) {
	return (
		<Alert type="error">
			<p>{props.error.message}</p>
		</Alert>
	);
}
