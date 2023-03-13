"use client"

import { usePathname, useSelectedLayoutSegment } from "next/navigation";

export function Title(): JSX.Element {
    const pathname = usePathname();
    const segment =  useSelectedLayoutSegment();
    const name = (pathname.split('/').at(-1) || segment) || 'Home';
    const title = name?.at(0)?.toUpperCase().concat(name.slice(1).toLowerCase());
    return <>{title}</>
}