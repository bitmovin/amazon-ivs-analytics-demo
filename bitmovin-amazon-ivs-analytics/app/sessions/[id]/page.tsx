import { List } from "@/components/List";
import { Metadata } from "next";
import { Suspense } from "react";
import { bitmovinApi } from "../../../components/bitmovinApi";

export const metadata: Metadata = {
  title: "Session",
  description: "Bitmovin and Amazon IVS Demo",
};

const fetchSession = async (id: string) => (
  await bitmovinApi.analytics.impressions.create(id, {
    licenseKey: process.env.BITMOVIN_ANALYTICS_LICENSE_KEY
  })
).flatMap(e => e).flatMap(e => ({...e}));

export default async function Session({params: {id}}: {params: {id: string}}) {
  const items = await fetchSession(id)

  return <Suspense fallback={<p>Loading...</p>}>
    <List route={'#'} title={'Session Details'} items={items} />
  </Suspense>;
}
