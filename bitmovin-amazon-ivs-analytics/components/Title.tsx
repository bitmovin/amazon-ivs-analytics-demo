'use client';

import Header from "@cloudscape-design/components/header";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

export const Title = ({children}:{children:string}) => {
    const segments = useSelectedLayoutSegments();
    return <Header 
        key={children}
        info={<Link href='/' />}
        variant="h1"
    >
        {segments[0]}
    </Header>;
}