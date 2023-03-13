import { List } from "@/components/List";
import { Spinner } from "@/components/Spinner";
import { fetchSession } from "@/utils/Bitmovin";
import { Suspense } from "react";

export const metadata = {
  title: "Session",
  description: "Bitmovin and Amazon IVS Demo",
};

export default async function Page(props: { params: { id: string }}) {
  const items = await fetchSession(props.params.id);
  return (
    <Suspense fallback={<List loading variant="embedded" />} >
      <List variant="embedded" items={items} />
    </Suspense>
  );
}
