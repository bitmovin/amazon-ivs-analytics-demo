import { List } from "@/components/List";
import { AnalyticsImpressionsResponse } from "@bitmovin/api-sdk";
import { analytics } from "../../components/bitmovinApi";

export const metadata = {
  title: "Sessions",
  description: "Bitmovin and Amazon IVS Demo",
};

const config = ({
  title: metadata.title,
  loading: false
});

const params = {
  start: new Date(Date.now()  - 1000 * 60 * 60 * 24 * 10),
  end: new Date(Date.now()),
  limit: 10
}

export default async function Page() {
  const items = await getDependency(params) || [];
  return <List id='id' loading={false} route='/sessions' title='Sessions' items={items} />;
}

type Params = {
  start: Date;
  end: Date;
  limit: number;
};



const createContext = (params: Params) => ({
    licenseKey: process.env.BITMOVIN_ANALYTICS_LICENSE_KEY,
    ...params
});

const fetchData = async (params: Params) =>
  await analytics.impressions.getImpressions(createContext(params));

const prepareResult = async (result: AnalyticsImpressionsResponse) =>
  result.impressions?.map((item) => ({
    id: item.impressionId || '',
    start_time: null,
    end_time: null,
    error: null
}));

const getDependency = async (params: Params) => await prepareResult(
  await fetchData(
    createContext(params)
  )
)