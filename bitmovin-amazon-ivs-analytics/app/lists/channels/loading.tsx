import { ContentLayout } from "@/components/ContentLayout";
import { List } from "@/components/List";

export default function Loading() {
    return (
        <ContentLayout header={'Channels'}>
            <List loading={true} />
        </ContentLayout>
    );
}