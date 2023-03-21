"use client";

import dynamic from "next/dynamic";

const Spinner = dynamic(() => import("@/client/Spinner"), {
	loading: () => <p>Loading...</p>,
});

const Alert = dynamic(() => import("@/client/Alert"), {
	loading: () => <Spinner />,
});

export default function NotFoundPage() {
	return (
		<Alert type="error">
			<p>Tenant not Found</p>
		</Alert>
	);
}
