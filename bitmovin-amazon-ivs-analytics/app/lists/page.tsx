import { Cards } from "@/components/Cards";
import { ContentLayout } from "@/components/ContentLayout";

export const metadata = {
  title: "Lists"
};

export default function Page() {
  return (
    <ContentLayout header={'Lists'}>
      <Cards items={[
        { name: "Channels", route: '/lists/channels', description: 'List of channels' },
        { name: "Sessions", route: '/lists/sessions', description: 'List of sessions' }
      ]} />
    </ContentLayout>
  );
}


