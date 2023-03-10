import { List } from "@/components/List";
import { Metadata } from "next";
import { Suspense } from "react";
import { fetchSession } from "../../../components/bitmovinApi";

export const metadata: Metadata = {
  title: "Session",
  description: "Bitmovin and Amazon IVS Demo",
};



export default async function Page({params: {id}}: {params: {id: string}}) {
  const items = await fetchSession(id)
  const it = items?.map(i => ({...i, id: ''})) || [];

  return <Suspense fallback={<p>Loading...</p>}>
    <List loading={false} route='/sessions' title={'Session Details'} items={it} id={"id"} />
  </Suspense>;
}
