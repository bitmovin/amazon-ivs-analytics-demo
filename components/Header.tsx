"use client";

import BaseHeader, { HeaderProps } from "@cloudscape-design/components/header"

export const Header = (props: HeaderProps) => {
    return (
        <BaseHeader {...props}>
            {props.children}
        </BaseHeader>
    );
}