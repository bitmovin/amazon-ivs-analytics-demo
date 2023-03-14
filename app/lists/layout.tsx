import { Container } from "@/components/Container";

export default function Layout(props: {children: JSX.Element}) {
    return (
        <Container>{props.children}</Container>
    );
}