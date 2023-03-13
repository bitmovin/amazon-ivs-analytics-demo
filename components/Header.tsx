"use client";

import BaseHeader, { HeaderProps } from "@cloudscape-design/components/header"
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

export const Header = (props: { variant: HeaderProps.Variant }) => {
    const pathname = usePathname().split('/').slice(-1).at(0) || 'Home';
    const text = pathname[0].toUpperCase().concat(pathname.slice(1).toLowerCase());
    return (
        <BaseHeader variant={props.variant}>
            {text}
        </BaseHeader>
    );
}