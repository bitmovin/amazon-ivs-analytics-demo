import StatusIndicator from "@/components/client/StatusIndicator";
import { StatusIndicatorProps } from "@cloudscape-design/components";

export default function Status(props: {
	type?: StatusIndicatorProps.Type;
	children?: React.ReactNode;
}) {
	return (
		<StatusIndicator type={props.type ?? "info"}>
			{props.children}
		</StatusIndicator>
	);
}

export function PendingStatus(props: { label?: React.ReactNode }) {
	return <Status type="pending" label="pending" {...props} />;
}

export function ErrorStatus(props: { label?: React.ReactNode }) {
	return <Status type="error" label="error" {...props} />;
}

export function LoadingStatus(props: { label?: React.ReactNode }) {
	return <Status type="loading" label="loading..." {...props} />;
}

export function LiveStatus(props: { label?: React.ReactNode }) {
	return <Status type="success" label="live" {...props} />;
}
