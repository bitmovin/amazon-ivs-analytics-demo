import { ContentLayout } from "@/components/ContentLayout";

export const metadata = {
  title: "Channel",
  description: "Bitmovin and Amazon IVS Demo",
};

export default function Page(props: {params: {id: string}}) {
  return (
    <ContentLayout header={'Channel'}>
        <p>{`Channel: ${props.params.id}`}</p>
    </ContentLayout>
  );
}
