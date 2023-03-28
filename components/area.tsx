import "server-only";

import type {
	Attribute,
	Interval,
	OperatorKey,
	QueryParams,
	QueryType,
} from "@/server/bitmovin";
import Filter from "./filter";

export type AreaProps<K extends QueryType> = {
	id: string;
	dimension: Attribute;
	interval?: Interval;
	type?: "area";
	groupBy?: Attribute[];
	query?: K;
	params?: QueryParams<K>;
	factor?: number;
	limit?: number;
	hidden?: boolean;
	color?: string;
	children?: ReturnType<typeof Filter> | ReturnType<typeof Filter>[];
};

export type AreaElement<K extends QueryType> = CustomElement<AreaProps<K>>;

export default function Area<K extends QueryType>(
	props: AreaProps<K>
): AreaElement<K> {
	return { type: null, key: null, props };
}
