import { List } from "@/components/List";
import { AnalyticsImpressionsResponse } from "@bitmovin/api-sdk";
import { fetchSessions } from "../../components/bitmovinApi";

export const metadata = {
  title: "Sessions",
  description: "Bitmovin and Amazon IVS Demo",
};

const config = ({
  title: metadata.title,
  loading: false
});


export default async function Page() {
  const items = prepareResult(await fetchSessions({
    start: new Date(Date.now()  - 1000 * 60 * 60 * 24 * 10),
    end: new Date(Date.now()),
    limit: 10
  }));

  return <List id='id' loading={false} route='/sessions' title='Sessions' items={items} />;
}


const prepareResult = (result: AnalyticsImpressionsResponse) =>
  result.impressions?.map((item) => ({
    id: item.impressionId || '',
    start_time: null,
    end_time: null,
    error: null
})) || [];