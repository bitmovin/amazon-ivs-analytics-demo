import { List } from "@/components/List";
import { Metadata } from "next";
import { Suspense } from "react";
import { analytics } from "../../../components/bitmovinApi";

export const metadata: Metadata = {
  title: "Session",
  description: "Bitmovin and Amazon IVS Demo",
};

const fetchSession = async (id: string) => (
  await analytics.impressions.create(id, {
    licenseKey: process.env.BITMOVIN_ANALYTICS_LICENSE_KEY
  })
).flatMap(e => e).flatMap(e => ({...e}));

export default async function Session({params: {id}}: {params: {id: string}}) {
  const items = await fetchSession(id)
  const it = items.map(i => ({...i, id: 'a'}))

  return <Suspense fallback={<p>Loading...</p>}>
    <List loading={false} route='/sessions' title={'Session Details'} items={it} id={"id"} />
  </Suspense>;
}
