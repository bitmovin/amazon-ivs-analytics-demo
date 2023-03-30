"use client";

import Alert from "@/components/client/Alert";

export default function NotFoundPage() {
	return (
		<Alert type="error" fallback={<p>IVS Stream Session Not Found</p>}>
			<p>IVS Stream Session Not Found</p>
		</Alert>
	);
}
