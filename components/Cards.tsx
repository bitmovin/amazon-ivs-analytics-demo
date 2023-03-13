"use client";

import Header from "@cloudscape-design/components/header";
import BaseCards from "@cloudscape-design/components/cards";
import { Route } from "next";
import Link from "next/link";

interface Item<R extends string> {
    name: string,
    description: string,
    route: Route<R>
}

type Props<R extends string> = {
    items: Item<R>[]
    loading?: undefined
} | {
    items?: undefined
    loading: true
}

export function Cards<R extends string>(props: Props<R>) {
    const header = (item: Item<R>) => (
        <Header>{item.route ?
            <Link href={item.route}>{item.name}</Link> : item.name
        }</Header>
    )

    const cardDefinition = {
        header,
        sections: [{
            id: 'description',
            header: 'Description',
            content: (item: Item<R>) => item.description
    }]};

    return (
        <BaseCards
            loading={props.loading ?? false}
            cardsPerRow={props.loading ? [] : [{cards: props.items.length}]}
            items={props.loading ? [] : props.items}
            cardDefinition={cardDefinition}
        />
    );
}