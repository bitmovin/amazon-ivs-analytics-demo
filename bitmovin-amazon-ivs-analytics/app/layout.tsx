import '@/app/globals.css';
import '@cloudscape-design/global-styles/index.css';

import { Metadata } from "next";
import { AppLayout } from "@/components/AppLayout";
import { TopNavigation } from "@/components/TopNavigation";
import { SideNavigation } from "@/components/SideNavigation";
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
    <SideNavigation
      name='Root'
      path='/'
      sections={[
        {
          name: 'Lists',
          path: '/lists',
          items: [
            {
              name: 'Channels',
              path: '/lists/channels',
            },
            {
              name: 'Sessions',
              path: '/lists/sessions',
            }
          ]
        }
      ]}
    />
  );

  const breadcrumbGroup = (
    <BreadcrumbGroup />
  )

  const appLayout = (
    <AppLayout
      breadcrumbs={breadcrumbGroup}
      navigation={sideNavigation}
      content={props.children}
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
