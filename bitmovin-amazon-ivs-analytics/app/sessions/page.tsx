import { List } from "@/components/List";
import { Metadata } from "next";
import { Suspense } from "react";
import { analytics } from "../../components/bitmovinApi";

export const metadata: Metadata = {
  title: "Sessions",
  description: "Bitmovin and Amazon IVS Demo",
};

async function fetchSessions(props: {
  start: number;
  end: number;
  limit: number;
}) {
  const impressions = await analytics.impressions.getImpressions({
    licenseKey: process.env.BITMOVIN_ANALYTICS_LICENSE_KEY,
    start: new Date(props.start),
    end: new Date(props.end),
    limit: props.limit,
  });
  
  return impressions.impressions?.map((item) => ({
    id: item.impressionId || '',
    start_time: null,
    end_time: null,
    error: null
  }));
}


export default async function Sessions() {
  const end = Date.now();
  const start = end - 1000*60*60*24*10;
  const limit = 100;

  const items = await fetchSessions({
      start,
      end,
      limit
  });

  return <List title={"Sessions"} route={"sessions"} items={items} />;
}

