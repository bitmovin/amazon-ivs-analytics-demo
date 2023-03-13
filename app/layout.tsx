import '@/app/globals.css';
import '@cloudscape-design/global-styles/index.css';

import { TopNavigation } from '@/components/TopNavigation';
import { AppLayout } from '@/components/AppLayout';

export const metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Dashboard",
  },
  applicationName: "Bitmovin IVS",
  description: "Bitmovin and Amazon IVS Demo",
};

export default function RootLayout(props: {children: JSX.Element}) {
  return (
    <html lang="en">
      <body className="awsui-dark-mode awsui-motion-disabled">
        <main>
          <TopNavigation title={'Top Navigation'} />
          <AppLayout
            sections={[{
              name: 'Lists',
              route: '/lists',
              items: [{
                name: 'Channels',
                route: '/lists/channels',
              },{
                name: 'Sessions',
                route: '/lists/sessions',
              }]
            }]}
            content={props.children}
           />
        </main>
      </body>
    </html>
  );
}
