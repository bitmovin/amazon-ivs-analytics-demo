"use client";

import BaseContentLayout from "@cloudscape-design/components/content-layout";

export function ContentLayout(props: { header: JSX.Element, children: JSX.Element }) {
    return (
        <BaseContentLayout
            disableOverlap={false}
            header={props.header}
        >
            {props.children}
        </BaseContentLayout>
    );
}