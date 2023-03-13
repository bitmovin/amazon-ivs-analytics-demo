import '@/app/globals.css';
import '@cloudscape-design/global-styles/index.css';

import { Metadata } from "next";
import { AppLayout } from "@/components/AppLayout";
import { TopNavigation } from "@/components/TopNavigation";
import { SideNavigation } from "@/components/SideNavigation";
import { BreadcrumbGroup } from '@/components/BreadcrumbGroup';
import { ContentLayout } from '@/components/ContentLayout';

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

  const navigation = (
    <SideNavigation
      name='Home'
      route='/'
      sections={[
        {
          name: 'Lists',
          route: '/lists',
          items: [
            {
              name: 'Channels',
              route: '/lists/channels',
            },
            {
              name: 'Sessions',
              route: '/lists/sessions',
            }
          ]
        }
      ]}
    />
  );

  const content = (
    <ContentLayout>{props.children}</ContentLayout>
  );

  const appLayout = (
    <AppLayout
      navigation={navigation}
      content={content}
    />
  );

  return (
    <html lang="en">
      <body className="awsui-dark-mode">
        <main>
          {topNavigation}
          {appLayout}
        </main>
      </body>
    </html>
  );
}
