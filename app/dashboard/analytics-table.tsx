import { Suspense } from "react";
import {
	Attribute,
	Filter,
	fetchImpression,
	fetchImpressions,
	mapFilters,
} from "@/server/bitmovin";
import ClientTable from "@/client/Table";
import Spinner from "@/client/Spinner";
import { Route } from "next";
import { TableProps } from "@cloudscape-design/components/table";

type Item = Record<string, string | number>;
type Cell = Partial<Record<string, JSX.Element>>;

type Column = {
	header: JSX.Element;
} & (
	| {
			type: "date";
	  }
	| {
			type: "text";
	  }
	| {
			type: "link";
			href: Route;
	  }
);

type ColumnList = Partial<Record<Lowercase<Attribute>, Column>>;

export type AnalyticsTableProps = {
	licenseKey: string;
	orgId: string;
	dimension: Attribute;
	columns: ColumnList;
	filters: Filter[];
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

function Fallback(props: AnalyticsTableProps) {
	return (
		<ClientTable
			{...props}
			loading={true}
			loadingText="Loading sessions"
			items={[{}]}
			resizableColumns
			columnDefinitions={[]}
			fallback={
				<div>
					<Spinner fallback={<p>Loading...</p>} />
					Loading sessions
				</div>
			}
		/>
	);
}

async function Component(props: AnalyticsTableProps) {
	const items = await updateProps(props);

	return (
		<ClientTable
			{...props}
			loading={false}
			items={items}
			resizableColumns
			columnDefinitions={[]}
			fallback={
				<div>
					<Spinner fallback={<p>Loading...</p>} />
					Loading sessions
				</div>
			}
		/>
	);
}
async function updateProps(props: AnalyticsTableProps) {
	const { licenseKey, orgId, limit } = props;
	const filters = props.filters.map(mapFilters);

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
					for (const column in props.columns) {
						const value = sample[column as Lowercase<Attribute>];
						//const value = sample[key];
						if (
							typeof value === "number" ||
							typeof value === "string"
						) {
							item[column] ??= (
								<>{sample[column as Lowercase<Attribute>]}</>
							);
						}
					}
				}
			}

			cells.push(item);
		}
	}

	return cells;
}
