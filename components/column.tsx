import { Route } from "next";
import { Ops } from "./filter";

export type Item = Record<string, string | number>;
export type Cell = Partial<Record<string, JSX.Element>>;

export type ColumnProps<A extends string> = {
	id: A;
	filters?: Ops[] | undefined;
	children?: JSX.Element | string;
} & (
	| { type: "date" }
	| { type: "text" }
	| { type: "link"; href: Route }
	| { type?: undefined }
);

export type ColumnElement<A extends string> = CustomElement<ColumnProps<A>>;

export function TableColumn<A extends string>(
	props: ColumnElement<A>["props"]
): ColumnElement<A> {
	return {
		type: null as JSX.Element["type"],
		key: null as JSX.Element["key"],
		props,
	} as ColumnElement<A>;
}
