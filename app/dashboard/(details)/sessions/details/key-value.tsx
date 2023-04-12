import Box from "@/components/client/Box";

export function KeyValue(props: {
	label?: React.ReactNode;
	children?: React.ReactNode;
}) {
	return (
		<div>
			<Box variant="awsui-key-label">{props.label ?? "key"}</Box>
			<div>{props.children ?? "value"}</div>
		</div>
	);
}
