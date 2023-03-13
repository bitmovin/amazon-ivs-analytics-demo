"use client"

import { usePathname, useSelectedLayoutSegment } from "next/navigation";

export function Title(): JSX.Element {
    const pathname = (usePathname().split('/').at(-1) || useSelectedLayoutSegment());
    const title = pathname?.at(0)?.toUpperCase().concat(pathname.slice(1).toLowerCase());
    return <>{title}</>
}