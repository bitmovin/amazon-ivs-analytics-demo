import { List } from "@/components/List";

export default function Loading() {
    return <List
        id=''
        route={'/sessions'}
        loading={true}
        items={[]} 
        title={""}
        columns={[]}
    />
}