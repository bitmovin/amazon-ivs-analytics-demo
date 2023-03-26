import { Suspense } from "react";
import { fetchImpression, fetchImpressions } from "@/server/bitmovin";
import {
	AnalyticsAbstractFilter,
	AnalyticsAttribute,
	AnalyticsContainsFilter,
	AnalyticsEqualFilter,
	AnalyticsGreaterThanFilter,
	AnalyticsGreaterThanOrEqualFilter,
	AnalyticsInFilter,
	AnalyticsLessThanFilter,
	AnalyticsLessThanOrEqualFilter,
	AnalyticsNotContainsFilter,
	AnalyticsNotEqualFilter,
	AnalyticsQueryOperator,
} from "@bitmovin/api-sdk";
import ClientTable from "@/client/Table";
import Spinner from "@/client/Spinner";
import { Route } from "next";

type Attribute = keyof typeof AnalyticsAttribute;
type Operator = typeof AnalyticsQueryOperator;
type GroupOperators = "IN" | "CONTAINS" | "NOTCONTAINS";
type ElementOperator = keyof Omit<Operator, GroupOperators>;
type ListOperator = keyof Pick<Operator, GroupOperators>;
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

type ElementFilter = {
	name: Attribute;
	operator: ElementOperator;
	value: unknown;
};

type ListFilter = {
	name: Attribute;
	operator: ListOperator;
	value: unknown[];
};

type Filter = ElementFilter | ListFilter;

export type AnalyticsTableProps = {
	licenseKey: string;
	orgId: string;
	dimension: keyof typeof AnalyticsAttribute;
	columns: ColumnList;
	filters: Filter[];
	limit: number;
	footer?: JSX.Element;
};

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
			loading={true}
			loadingText="Loading sessions"
			items={[{}]}
			stickyHeader
			variant="embedded"
			resizableColumns
			columnDefinitions={[]}
			columns={props.columns}
			footer={props.footer}
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
			loading={false}
			stickyHeader
			items={items}
			variant="embedded"
			resizableColumns
			columnDefinitions={[]}
			columns={props.columns}
			footer={props.footer}
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
function mapFilters(filter: Filter) {
	const name = AnalyticsAttribute[filter.name];
	const operator = AnalyticsQueryOperator[filter.operator];
	const value = filter.value;
	const obj = { name, operator, value };

	if (filter.operator === "NE") {
		return new AnalyticsNotEqualFilter(obj);
	}

	if (filter.operator === "CONTAINS") {
		return new AnalyticsContainsFilter(obj);
	}

	if (filter.operator === "GT") {
		return new AnalyticsGreaterThanFilter(obj);
	}

	if (filter.operator === "GTE") {
		return new AnalyticsGreaterThanOrEqualFilter(obj);
	}

	if (filter.operator === "LT") {
		return new AnalyticsLessThanFilter(obj);
	}

	if (filter.operator === "LTE") {
		return new AnalyticsLessThanOrEqualFilter(obj);
	}

	if (filter.operator === "EQ") {
		return new AnalyticsEqualFilter(obj);
	}

	if (filter.operator === "IN") {
		return new AnalyticsInFilter({
			name,
			operator,
			value: filter.value,
		});
	}

	if (filter.operator === "NOTCONTAINS") {
		return new AnalyticsNotContainsFilter({
			name,
			operator,
			value: filter.value,
		});
	}

	return new AnalyticsAbstractFilter(obj);
}
