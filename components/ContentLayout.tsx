"use client";

import BaseContentLayout from "@cloudscape-design/components/content-layout";

export function ContentLayout(props: { disableOverlap: boolean, header: JSX.Element, children: JSX.Element }) {
    return (
        <BaseContentLayout
            disableOverlap={props.disableOverlap}
            header={props.header}
        >
            {props.children}
        </BaseContentLayout>
    );
}