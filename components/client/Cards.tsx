'use client';

import Header from "@cloudscape-design/components/header";
import BaseCards from "@cloudscape-design/components/cards";
import { Route } from "next";
import Link from "next/link";

interface Item<R> {
    name: string,
    description: string,
    route: R
}

type Props<T> = {
    items: T[]
    loading?: undefined
} | {
    items?: undefined
    loading: true
}

export default function<R extends string>(props: Props<Item<Route<R>>>) {
    const header = (item: Item<Route<R>>) => (
        <Header>{item.route ?
            <Link href={item.route}>{item.name}</Link> : item.name
        }</Header>
    )

    return (
        <BaseCards
            loading={props.loading ?? false}
            cardsPerRow={props.loading ? [] : [{cards: props.items.length}]}
            items={props.loading ? [] : props.items}
            cardDefinition={{
                header,
                sections: [{
                    id: 'description',
                    header: 'Description',
                    content: (item) => item.description
            }]}}
        />
    );
}