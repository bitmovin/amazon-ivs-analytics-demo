export const metadata = {
	title: "Channel",
	description: "Bitmovin and Amazon IVS Demo",
};

export default function Page(props: {params: {id: string}}) {
	return (<p>{`Channel: ${props.params.id}`}</p>);
}
