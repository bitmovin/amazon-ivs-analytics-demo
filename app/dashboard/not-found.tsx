"use client";

import Alert from "@/client/Alert";

export default function NotFound() {
	return (
		<Alert type="error" fallback={<p>Not Found</p>}>
			<p>Not Found</p>
		</Alert>
	);
}
