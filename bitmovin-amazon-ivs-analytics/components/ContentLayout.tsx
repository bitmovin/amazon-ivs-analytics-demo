"use client";

import { Header } from "@cloudscape-design/components";
import BaseContentLayout from "@cloudscape-design/components/content-layout";


export function ContentLayout(props: {header: string, children: JSX.Element}) {
    return (
        <BaseContentLayout 
            disableOverlap={false}
            header={<Header>{props.header}</Header>}
        >
            {props.children}
        </BaseContentLayout>
    );
}