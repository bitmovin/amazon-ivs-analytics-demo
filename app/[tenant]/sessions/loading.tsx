import dynamic from "next/dynamic";

const Spinner = dynamic(() => import("@/client/Spinner"), {
	loading: (props) => <p>Loading...</p>,
});

const Box = dynamic(() => import("@/client/Box"), {
	loading: (props) => <Spinner />,
});

export default function Loading() {
	return (
		<Box textAlign="center">
			<Spinner size="large" />
		</Box>
	);
}
