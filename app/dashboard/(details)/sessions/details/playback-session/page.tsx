import ContentLayout from "@/components/client/ContentLayout";
import Header from "@/components/client/Header";
import { getSession } from "@/server/session";
import { redirect } from "next/navigation";

export default async function Page(props: {
  searchParams: {
    orgId?: string;
    licenseKey?: string;
    channelArn?: string;
    analyticsSessionId?: string;
  };
}) {
  const {
    aws: { streamSession, channelName },
    searchParams,
  } = await getSession(props.searchParams);

  const { channelArn, orgId, licenseKey, analyticsSessionId } = searchParams;

  if (!channelArn || !orgId || !licenseKey) {
    redirect("/dashboard");
  }

  if (!streamSession) {
    redirect("/dashboard/sessions");
  }

  if (!analyticsSessionId) {
    redirect("/dashboard/sessions/details");
  }

  return (
    <ContentLayout header={<Header>Playback Session {analyticsSessionId}</Header>}>
      <></>
    </ContentLayout>
  );
}
