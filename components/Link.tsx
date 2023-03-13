
import { Route } from "next";
import BaseLink from "next/link";

export function Link<T extends string>(props: { href: Route<T> }) {
    return (
        <BaseLink href={props.href} />
    );
};