import { ContentLayout } from "@/components/ContentLayout";
import { Header } from "@/components/Header";
import { Title } from "@/components/Title";

export default function Layout(props: {children: JSX.Element}) {
    return (
        <ContentLayout
            header={<Header variant='h2'><Title /></Header>}>
            {props.children}
        </ContentLayout>
    );
}