import { List } from "@/components/List";

export default function Loading() {
    return (
      <List
        loading={true}
        title={'Channels'}
        route={'/channels'}
        items={[]}
        id='id'
      />
    );
}