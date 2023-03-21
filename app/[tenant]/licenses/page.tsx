import { fetchLicenseKeys } from "@/server/bitmovin";

export const metadata = {
	title: "Lists",
};

export default async function Page({
	params: { tenant },
}: {
	params: { tenant: string };
}) {
	const licenses = await fetchLicenseKeys({}, tenant, {
		next: { revalidate: 10000 },
	});

	return (
		<div>
			{licenses.items?.map((item, index) => (
				<div key={index}>{item.id}</div>
			))}
		</div>
	);
}
