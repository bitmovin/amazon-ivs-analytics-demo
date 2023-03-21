import dynamic from "next/dynamic";

export const metadata = {
	title: "Session",
	description: "Bitmovin and Amazon IVS Demo",
};

const Spinner = dynamic(() => import("@/client/Spinner"), {
	loading: (props) => <p>Loading...</p>,
});

const List = dynamic(() => import("@/client/List"), {
	loading: (props) => <Spinner />,
});

export default async function Page({
	params,
	searchParams,
}: {
	params: { id: string };
	searchParams: { licenseKey: string };
}) {
	// const impression = await fetchImpression(
	// 	{ next: { revalidate: 10 } },
	// 	params,
	// 	searchParams
	// );
	return <List items={[]} columnDefinitions={[]} />;
}
