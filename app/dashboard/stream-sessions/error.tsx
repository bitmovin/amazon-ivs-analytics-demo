"use client";

import Alert from "@/components/client/Alert";
import Button from "@/components/client/Button";

export default function Error(props: ErrorProps) {
	return (
		<Alert
			type="error"
			action={<Button onClick={() => props.reset()}>Retry</Button>}
		>
			<p>{props.error.message}</p>
		</Alert>
	);
}
