import "server-only";

import type { Route } from "next";
import * as navigation from "next/navigation";


export function route<const T extends string>(route: Route<T>) {
	return route;
}

export function redirect<const T extends string>(route: Route<T>): never {
	navigation.redirect(route);
}

