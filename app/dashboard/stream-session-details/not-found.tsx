"use client";

import Alert from "@/client/Alert";

export default function NotFoundPage() {
	return (
		<Alert type="error" fallback={<p>IVS Stream Session Details Not Found</p>}>
			<p>IVS Stream Session Details Not Found</p>
		</Alert>
	);
}
