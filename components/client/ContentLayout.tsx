"use client";

import ContentLayout, { ContentLayoutProps } from "@cloudscape-design/components/content-layout";
import React from "react";


export default function(props: ContentLayoutProps) {
    return (
        <ContentLayout {...{props}}>
            {props.children}
        </ContentLayout>
    );
}