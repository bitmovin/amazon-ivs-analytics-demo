import "server-only";
import { AttributeKey, OperatorKey, fetchQuery } from "@/server/bitmovin";
import type QueriesApi from "@bitmovin/api-sdk/dist/analytics/queries/QueriesApi";
import { AnalyticsAttribute, AnalyticsImpressionSample, AnalyticsQueryOperator } from "@bitmovin/api-sdk";
import { FilteringProperty } from "@cloudscape-design/components/property-filter/interfaces";

export type QueryType = keyof QueriesApi;
export type QueryFunction<K extends QueryType> = typeof fetchQuery<K>;
export type QueryParameters<K extends QueryType> = Parameters<QueryFunction<K>>;
export type Query<K extends QueryType> = QueryParameters<K>[0];

export type Sample = typeof AnalyticsImpressionSample["prototype"];
export type Key = keyof Sample;
export type Value = string | number;
export type Values = string[] | number;

export type CommonOps<V extends number | string> = { is: V } |  { not: V } | { has: V } |  { lacks: V } | { in: V[] }
export type NumberOps<V extends number> = CommonOps<V> | { above: V }| { below: V } | { min: V } | { max: V };
export type Ops<V extends number | string = number | string> = V extends number ? NumberOps<V> : CommonOps<V>;


export default function Filter<V extends string | number, const A extends AttributeKey>(
	props: { field: A } & Ops<V>
) {
	return {
		type: null as JSX.Element["key"],
		key: null as JSX.Element["type"],
		props,
	};
}

export type FilterElement<V extends string | number = string | number, A extends AttributeKey = AttributeKey> = ReturnType<
	typeof Filter<V, A>
>;
export function mapFilter(filter: Partial<FilterElement["props"]>) {
	if (!filter.field) {
		return undefined;
	}
	
	const name = AnalyticsAttribute[filter.field];


	if ("is" in filter) {
		return { name, operator: AnalyticsQueryOperator.EQ, value: filter.is }
	} else if ("not" in filter) {
		return { name, operator: AnalyticsQueryOperator.NE, value: filter.not }
	} else if ("has" in filter) {
		return { name, operator: AnalyticsQueryOperator.CONTAINS, value: filter.has }
	} else if ("lacks" in filter) {
		return { name, operator: AnalyticsQueryOperator.NOTCONTAINS, value: filter.lacks }
	} else if ("min" in filter) {
		return { name, operator: AnalyticsQueryOperator.GTE, value: filter.min }
	} else if ("max" in filter) {
		return { name, operator: AnalyticsQueryOperator.LTE, value: filter.max }
	} else if ("above" in filter) {
		return { name, operator: AnalyticsQueryOperator.GT, value: filter.above }
	} else if ("below" in filter) {
		return { name, operator: AnalyticsQueryOperator.LT, value: filter.below }
	} else if ("in" in filter) {
		return { name, operator: AnalyticsQueryOperator.IN, value: filter.in }
	}

	return undefined;
}
