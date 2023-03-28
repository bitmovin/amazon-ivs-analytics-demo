import "server-only";

import { Suspense } from "react";
import {
	AttributeKey,
	fetchImpression,
	fetchImpressions,
} from "@/server/bitmovin";
import { Ops, mapFilter } from "@/components/filter";
import ClientTable from "@/components/client/Table";
import { Route } from "next";
import { TableProps } from "@cloudscape-design/components/table";

type Item = Record<string, string | number>;
type Cell = Partial<Record<string, JSX.Element>>;

type Attribute = Lowercase<AttributeKey>;
type ColumnProps<A extends Attribute> = {
	id: A;
	filters?: Ops[] | undefined;
	children: JSX.Element | string;
} & (
	| { type: "date" }
	| { type: "text" }
	| { type: "link"; href: Route }
	| { type?: undefined }
);

type ColumnElement<A extends Attribute = Attribute> = CustomElement<
	ColumnProps<A>
>;

export function Column<A extends Attribute>(
	props: ColumnElement<A>["props"]
): ColumnElement<A> {
	return {
		type: null as JSX.Element["type"],
		key: null as JSX.Element["key"],
		props,
	} as ColumnElement<A>;
}

export type AnalyticsTableProps = {
	licenseKey: string;
	orgId: string;
	children: ColumnElement[];
	limit: number;
	footer?: JSX.Element;
} & Partial<TableProps>;

export default function Table(props: AnalyticsTableProps) {
	return (
		<Suspense fallback={<Fallback {...props} />}>
			{/* @ts-expect-error suspense */}
			<Component {...props} />
		</Suspense>
	);
}

export function Fallback(props: AnalyticsTableProps) {
	return (
		<ClientTable
			{...props}
			columns={props.children.map(({ props }) => props)}
			loading={true}
			loadingText="Loading sessions"
			items={[{}]}
			resizableColumns
			columnDefinitions={[]}
		/>
	);
}

async function Component(props: AnalyticsTableProps) {
	const items = await updateProps(props);

	return (
		<ClientTable
			{...props}
			columns={props.children.map(({ props }) => props)}
			loading={false}
			items={items}
			resizableColumns
			columnDefinitions={[]}
		/>
	);
}
async function updateProps(props: AnalyticsTableProps) {
	const { licenseKey, orgId, limit } = props;
	const filters = props.children
		.flatMap(
			({ props }) =>
				props.filters?.map((ops) => ({
					field: props.id.toUpperCase() as AttributeKey,
					...ops,
				})) ?? []
		)
		.flat()
		.map(mapFilter)
		.flatMap((filter) => (filter ? [filter] : []));
	console.log(filters);
	const now = Date.now();
	const start = new Date(now - 1000 * 60 * 60);
	const end = new Date(now);

	const result = await fetchImpressions({ next: { revalidate: 60 } }, orgId, {
		licenseKey,
		start,
		end,
		filters,
		limit,
	});

	const cells: Cell[] = [];

	if ("impressions" in result) {
		const detailedImpressions = await Promise.all(
			result.impressions.flatMap((impression) => {
				if (impression.impressionId) {
					return fetchImpression(
						impression.impressionId,
						props.licenseKey,
						{ next: { revalidate: 10000 } },
						orgId
					).then((details) => ({
						impressionId: impression.impressionId,
						details,
					}));
				} else {
					return [];
				}
			})
		);

		for (const impression of detailedImpressions) {
			const item: Cell = {};

			for (const d in impression.details) {
				const detail = impression.details[d];
				for (const sample of detail as Item[]) {
					for (const column of props.children.map(
						(c) => c.props.id
					)) {
						const value = sample[column];
						//const value = sample[key];
						if (
							typeof value === "number" ||
							typeof value === "string"
						) {
							item[column] ??= <>{sample[column]}</>;
						}
					}
				}
			}

			cells.push(item);
		}
	}

	return cells;
}
