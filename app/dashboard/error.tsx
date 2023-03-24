"use client";

import Alert from "@/client/Alert";

export default function ErrorPage(props: { error: Error }) {
	return (
		<Alert type="error" fallback={<p>{props.error.message}</p>}>
			<p>{props.error.message}</p>
		</Alert>
	);
}
