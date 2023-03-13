import { List } from "@/components/List";
import { fetchSessions } from "@/utils/Bitmovin";
import { Suspense } from "react";

export const metadata = {
  title: "Sessions",
  description: "Bitmovin and Amazon IVS Demo",
};

export default async function Page() {
  const now = Date.now();
  const offset = 1000 * 60 * 60 * 24 * 10;
  const before = now - offset;
  const start = new Date(before);
  const end = new Date(now);
  const limit = 10;
  const query = { start, end, limit };
  const result = await fetchSessions(query);
  const impressions = result.impressions ?? [];
  const items = impressions.map((item) => ({...item}));

  return (
    <Suspense fallback={<List loading />}> 
      <List items={items} />
    </Suspense>
  );
}