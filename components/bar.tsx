import "server-only";

import type {
	AttributeKey,
	QueryType,
} from "@/server/bitmovin";

import type { FilterElement } from "./filter";

export type BarProps<K extends QueryType> = {
	id: string;
	query: K;
	dimension: AttributeKey;
	hidden?: boolean;
	color?: string;
	children: FilterElement | FilterElement[]
};

export type BarElement<K extends QueryType> = CustomElement<BarProps<K>>;
export default function Bar<const K extends QueryType, const P extends BarProps<K>>(
	props: P
): BarElement<K> {
	return {
		type: null,
		key: null,
		props,
	};
}
