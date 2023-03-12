"use client";

import { Header } from "@cloudscape-design/components";
import BaseCards from "@cloudscape-design/components/cards";
import { Route } from "next";
import Link from "next/link";

interface Item<R> {
    name: string,
    description: string,
    route?: Route<R>
}

export function Cards<R, T extends Item<R>>(props: { items: T[] }) {
    const header = (item: T) => (
        <Header>{item.route ?
            <Link href={item.route}>{item.name}</Link> : item.name
        }</Header>
    )


    return (
        <BaseCards
            cardsPerRow={[{cards: props.items.length}]}
            items={props.items}
            cardDefinition={{
            header,
            sections: [{
                id: 'description',
                header: 'Description',
                content: item => item.description
            }]}}
        />
    )
}