import "server-only";
import { Attribute, OperatorKey, fetchQuery } from "@/server/bitmovin";
import type QueriesApi from "@bitmovin/api-sdk/dist/analytics/queries/QueriesApi";
import { AnalyticsAttribute, AnalyticsQueryOperator } from "@bitmovin/api-sdk";

export type QueryType = keyof QueriesApi;
export type QueryFunction<K extends QueryType> = typeof fetchQuery<K>;
export type QueryParameters<K extends QueryType> = Parameters<QueryFunction<K>>;
export type Query<K extends QueryType> = QueryParameters<K>[0];

export type Value = number | string;

export type Predicate<O extends OperatorKey, V extends Value> = {
	operator: O;
	value: V;
};
export type PredicateFactory<O extends OperatorKey> = <V extends Value>(
	operator: O,
	value: V
) => Predicate<O, V>;
export type CreatePredicateFactory = <O extends OperatorKey>(
	operator: O
) => <V extends Value>(value: Value) => Predicate<O, V>;

export const createPredicate = function (operator) {
	return function predicate(value) {
		return {
			operator,
			value,
		};
	};
} as CreatePredicateFactory;

export const equals = createPredicate("EQ");
export const notEquals = createPredicate("NE");
export const lessThan = createPredicate("LT");
export const lessThanOrEquals = createPredicate("LTE");
export const greaterThan = createPredicate("GT");
export const greaterThanOrEquals = createPredicate("GTE");
export const contains = createPredicate("CONTAINS");
export const notContains = createPredicate("NOTCONTAINS");

export default function Filter<O extends OperatorKey, V extends Value>(
	props: {
		name: Attribute;
	} & Predicate<O, V>
) {
	return {
		type: null as JSX.Element["key"],
		key: null as JSX.Element["type"],
		props,
	};
}

export type FilterElement = ReturnType<typeof Filter>;
export function mapFilter(filter: FilterElement) {
	console.log(filter);
	const name = AnalyticsAttribute[filter.props.name];
	const operator = AnalyticsQueryOperator[filter.props.operator];
	const value = filter.props.value;

	return { name, operator, value };
}
