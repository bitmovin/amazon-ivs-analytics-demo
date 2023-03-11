import '@/app/globals.css';
import '@cloudscape-design/global-styles/index.css';

import { Metadata } from "next";
import { AppLayout } from "@/components/AppLayout";
import { TopNavigation } from "@/components/TopNavigation";
import { SideNavigation } from "@/components/SideNavigation";
import { ContentLayout } from "@/components/Content";
import { Header } from "@/components/Header";
import { BreadcrumbGroup } from '@/components/BreadcrumbGroup';

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Bitmovin IVS",
  },
  applicationName: "Bitmovin IVS",
  description: "Bitmovin and Amazon IVS Demo",
};

export default function RootLayout(props: {children: JSX.Element}) {
  const topNavigation = (
    <TopNavigation title="Bitmovin Analytics & Amazon IVS" />
  );

  const sideNavigation = (
    <SideNavigation  items={[
      {route: '/channels', text: 'Channels'},
      {route: '/sessions', text: 'Sessions'}
    ]}/>
  );

  const contentLayout = (
    <ContentLayout header={<Header title='Dashboard' />}>
      {props.children}
    </ContentLayout>
  );

  const breadcrumbGroup = (
    <BreadcrumbGroup />
  )

  const appLayout = (
    <AppLayout
      breadcrumbs={breadcrumbGroup}
      navigation={sideNavigation}
      content={contentLayout}
    />
  );

  return (
    <html lang="en">
      <body className="awsui-dark-mode awsui-compact-mode">
        <main>
          {topNavigation}
          {appLayout}
        </main>
      </body>
    </html>
  );
}
