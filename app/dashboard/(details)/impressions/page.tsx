import Header from "@/components/client/Header";
import AnalyticsTable, { AnalyticsTableColumn } from "@/components/AnalyticsTable";

export default async function Page(props: {
  searchParams: {
    orgId: string;
    licenseKey: string;
  };
}) {
  return (
    <AnalyticsTable
      params={props.searchParams}
      header={<Header variant="h2">Errors</Header>}
      stickyHeader
      variant="container"
      limit={100}
    >
      <AnalyticsTableColumn id="IMPRESSION_ID" filters={[{ not: "null" }]}>
        ID
      </AnalyticsTableColumn>
      <AnalyticsTableColumn id="ERROR_CODE" filters={[{ above: 0 }, { not: 10000 }]}>
        Error
      </AnalyticsTableColumn>
      <AnalyticsTableColumn id="PATH">Path</AnalyticsTableColumn>
      <AnalyticsTableColumn id="VIDEO_TITLE">Video</AnalyticsTableColumn>
      <AnalyticsTableColumn id="OPERATINGSYSTEM">OS</AnalyticsTableColumn>
      <AnalyticsTableColumn id="BROWSER">Browser</AnalyticsTableColumn>
    </AnalyticsTable>
  );
}
