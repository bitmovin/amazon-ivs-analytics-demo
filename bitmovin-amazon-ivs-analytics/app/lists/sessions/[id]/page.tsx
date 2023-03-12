import { ContentLayout } from "@/components/ContentLayout";
import { List } from "@/components/List";
import { fetchSession } from "@/utils/Bitmovin";

export const metadata = {
  title: "Session",
  description: "Bitmovin and Amazon IVS Demo",
};

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  let i = 0;
  const items = (await fetchSession(id)).map((m) => ({
    ...m,
    id: (i++).toString(),
  }));

  return (
    <ContentLayout header={"Session Details"}>
      <List
        loading={false}
        route="/sessions"
        title={"Session Details"}
        items={items}
        id={"id"}
      />
    </ContentLayout>
  );
}
