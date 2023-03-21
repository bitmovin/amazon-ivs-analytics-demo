export const metadata = {
	title: "Lists",
};

export default function Page({
	params: { license },
}: {
	params: { license: string };
}) {
	return <p>{license}</p>;
}
