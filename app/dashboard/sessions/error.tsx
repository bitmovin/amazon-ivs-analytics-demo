"use client";

import Alert from "@/components/client/Alert";

export default function ErrorPage(props: ErrorProps) {
	return (
		<Alert type="error" fallback={<p>{props.error.message}</p>}>
			<p>{props.error.message}</p>
		</Alert>
	);
}
