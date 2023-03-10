import { List } from "@/components/List";
import { Metadata } from "next";
import { Suspense } from "react";
import { bitmovinApi } from "../../components/bitmovinApi";

export const metadata: Metadata = {
  title: "Sessions",
  description: "Bitmovin and Amazon IVS Demo",
};

const fetchSessions = async (props: {
  start: number;
  end: number;
  limit: number;
}) => (
  await bitmovinApi.analytics.impressions.getImpressions({
      licenseKey: process.env.BITMOVIN_ANALYTICS_LICENSE_KEY,
      start: new Date(props.start),
      end: new Date(props.end),
      limit: props.limit,
  })
).impressions?.map((item) => ({
      id: item.impressionId || '',
      start_time: null,
      end_time: null,
      error: null
}));


export default async function Sessions() {
  const end = Date.now();
  const start = end - 1000*60*60*24*10;
  const limit = 100;

  const items = await fetchSessions({
      start,
      end,
      limit
    });

  return (
      <Suspense fallback={
        <List title={"Sessions"} route={"sessions"} items={[]}/>
      }>
         <List title={"Sessions"} route={"sessions"} items={items ? items : []}/>
      </Suspense>
  );
}

