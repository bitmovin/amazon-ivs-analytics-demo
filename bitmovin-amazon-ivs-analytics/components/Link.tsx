
import { Route } from "next";
import Link from "next/link"

export default function <T>(props: { href: Route<T> }) {
    return (
        <Link href={props.href} />
    );
};