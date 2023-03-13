import { Cards } from "@/components/Cards";

export const metadata = {
  title: "Lists"
};

export default function Page() {
  return (
      <Cards items={[
        { name: "Channels", route: '/lists/channels', description: 'List of channels' },
        { name: "Sessions", route: '/lists/sessions', description: 'List of sessions' }
      ]} />
  );
}


