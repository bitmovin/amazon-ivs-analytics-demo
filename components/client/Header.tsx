"use client";

import Header, { HeaderProps } from "@cloudscape-design/components/header"

export default function(props: HeaderProps) {
    return (
        <Header {...props}>
            {props.children}
        </Header>
    );
}