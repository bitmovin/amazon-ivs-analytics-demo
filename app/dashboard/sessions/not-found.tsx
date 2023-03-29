"use client";

import Alert from "@/components/client/Alert";

export default function NotFoundPage() {
	return (
		<Alert type="error" fallback={<p>Tenant not Found</p>}>
			<p>Tenant not Found</p>
		</Alert>
	);
}
