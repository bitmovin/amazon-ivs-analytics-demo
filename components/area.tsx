import "server-only";

import type { AttributeKey, Interval, QueryParams, QueryType } from "@/server/bitmovin";
import type { FilterElement } from "./filter";

export type AreaProps<K extends QueryType> = {
  field: AttributeKey;
  interval?: Interval;
  type?: "area";
  groupBy?: AttributeKey[];
  query?: K;
  params?: QueryParams<K>;
  factor?: number;
  limit?: number;
  hidden?: boolean;
  color?: string;
  children?: FilterElement | FilterElement[];
};

export type AreaElement<K extends QueryType> = CustomElement<AreaProps<K>>;

export default function Area<K extends QueryType>(props: AreaProps<K>): AreaElement<K> {
  return { type: null, key: null, props };
}
