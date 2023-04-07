"use client";

import Alert from "@/components/client/Alert";

export default function ErrorPage(props: { error: Error }) {
	return (
		<Alert type="error">
			<p>{props.error.message}</p>
		</Alert>
	);
}
