"use client";

import BaseHeader, { HeaderProps } from "@cloudscape-design/components/header"
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

export const Header = (props: { variant: HeaderProps.Variant, children: JSX.Element }) => {
    return (
        <BaseHeader variant={props.variant}>
            {props.children}
        </BaseHeader>
    );
}