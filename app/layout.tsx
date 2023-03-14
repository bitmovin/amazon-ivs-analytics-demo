import { TopNavigation } from '@/components/TopNavigation';
import { AppLayout } from '@/components/AppLayout';
import { SideNavigation } from '@/components/SideNavigation';
import { BreadcrumbGroup } from '@/components/BreadcrumbGroup';
import { ContentLayout } from '@/components/ContentLayout';
import { Header } from '@/components/Header';
import { Title } from '@/components/Title';

export const metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Dashboard",
  },
  applicationName: "Bitmovin IVS",
  description: "Bitmovin and Amazon IVS Demo",
};

export default function RootLayout(props: { children: JSX.Element }) {
  return (
    <html lang="en">
      <body>
        <TopNavigation />
        <AppLayout
          navigation={
            <SideNavigation header={{text: 'Bitmovin', href: '/'}}
              items={[{
                type: 'link-group',
                text: 'Lists',
                href: '/lists',
                    items: [{
                      type: 'link',
                      text: 'Channels',
                      href: '/lists/channels',
                    }, {
                      type: 'link',
                      text: 'Sessions',
                      href: '/lists/sessions',
                    }]
              }]}
            />
          }
          breadcrumbs={<BreadcrumbGroup />}
          content={props.children}
        />
      </body>
    </html>
  );
}
