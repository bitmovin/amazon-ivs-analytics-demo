import type { Attribute } from "@/server/bitmovin";
import { Route } from "next";

export type PageProps<T extends Route<string>> = {
	searchParams: Partial<SearchParams<T>>;
};

export type SearchParams<T extends Route<string>> = T extends "/"
	? never
	: T extends "/dashboard"
	? { orgId: string; licenseKey: string, channelArn: string }
	: T extends "/dashboard/sessions"
	? SearchParams<"/dashboard"> & { dimension: Attribute }
  : T extends "/dashboard/stream-sessions"
  ? SearchParams<"/dashboard">
  : T extends "/dashboard/stream-session-details"
  ? SearchParams<"/dashboard"> & { streamId: string }
	: never;
