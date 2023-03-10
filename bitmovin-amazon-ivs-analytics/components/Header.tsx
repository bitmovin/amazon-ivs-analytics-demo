"use client";

import BaseHeader from "@cloudscape-design/components/header"

export const Header = (props: {title: string}) => {
    return (
        <BaseHeader  variant="h1">
            {props.title}
        </BaseHeader>
    )
}