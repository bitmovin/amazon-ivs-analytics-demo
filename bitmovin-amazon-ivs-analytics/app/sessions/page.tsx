import { List } from "@/components/List";
import { fetchSessions } from "@/utils/Bitmovin";

export const metadata = {
  title: "Sessions",
  description: "Bitmovin and Amazon IVS Demo",
};

export default async function Page() {
  const now = Date.now();

  const result = await fetchSessions({
    start: new Date(now  - 1000 * 60 * 60 * 24 * 10),
    end: new Date(now),
    limit: 10
  });

  const items = result.impressions?.map((item) => ({
    id: item.impressionId || '',
    start_time: null,
    end_time: null,
    error: null
  })) || [];

  return <List
    id='id'
    loading={false}
    route='/sessions'
    title='Sessions'
    items={items}
  />;
}