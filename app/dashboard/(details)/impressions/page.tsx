import Header from "@/components/client/Header";
import Table, { Column } from "@/components/table";

export default async function Page(props: {
  searchParams: {
    orgId: string;
    licenseKey: string;
  };
}) {
  return (
    <Table
      params={props.searchParams}
      header={<Header variant="h2">Errors</Header>}
      stickyHeader
      variant="container"
      limit={100}
    >
      <Column id="IMPRESSION_ID" filters={[{ not: "null" }]}>
        ID
      </Column>
      <Column id="ERROR_CODE" filters={[{ above: 0 }, { not: 10000 }]}>
        Error
      </Column>
      <Column id="PATH">Path</Column>
      <Column id="VIDEO_TITLE">Video</Column>
      <Column id="OPERATINGSYSTEM">OS</Column>
      <Column id="BROWSER">Browser</Column>
    </Table>
  );
}
