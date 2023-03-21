import { fetchImpressions } from "@/server/bitmovin";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const Spinner = dynamic(() => import("@/client/Spinner"), {
	loading: (props) => <p>Loading...</p>,
});

const List = dynamic(() => import("@/client/List"), {
	loading: (props) => <Spinner />,
});

export const metadata = {
	title: "Sessions",
};

export default async function Page({
	searchParams,
}: {
	searchParams: {
		start: string;
		end: string;
		limit: string;
		licenseKey: string;
		tenantOrgId: string;
	};
}) {
	// const { impressions } = await fetchImpressions(
	// 	{
	// 		next: { revalidate: 10 },
	// 	},
	// 	{
	// 		start: new Date(searchParams?.start ?? "start"),
	// 		end: new Date(searchParams?.end ?? "start"),
	// 		limit: Number.parseInt(searchParams?.limit ?? "10"),
	// 		licenseKey: searchParams?.licenseKey ?? "aaaa",
	// 	}
	// );
	// const items = impressions?.map((i) => ({ ...i }));
	// if (typeof items === "undefined") {
	// 	return notFound();
	// }
	return <List items={[]} columnDefinitions={[]} />;
}
