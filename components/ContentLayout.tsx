"use client";

import Container from "@cloudscape-design/components/container";
import BaseContentLayout from "@cloudscape-design/components/content-layout";
import Header from '@cloudscape-design/components/header';
import { useSelectedLayoutSegments } from "next/navigation";

export function ContentLayout(props: {children: JSX.Element}) {
    const pathname = useSelectedLayoutSegments().pop()?.toUpperCase() || 'HOME';
    const text = pathname[0] + pathname.slice(1).toLowerCase();
    const header = (<Header key={'header'}>{text}</Header>);
    const children = (<Container fitHeight={true}>{props.children}</Container>);

    return (<BaseContentLayout header={header}>{children}</BaseContentLayout>);
}