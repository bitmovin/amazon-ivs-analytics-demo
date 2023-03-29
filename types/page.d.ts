import { Attribute } from "../components/filter";

declare type PageProps<T extends Route<string>> = {
	searchParams: SearchParams<T>;
};

declare type SearchParams<T extends Route<string>> = T extends "/"
	? never
	: T extends "/dashboard"
	? { orgId: string; licenseKey: string }
	: T extends "/dashboard/sessions"
	? { orgId: string; licenseKey: string; dimension: Attribute }
	: T extends "/dashboard/stream-sessions"
	? SearchParams<"/dashboard"> & { channelArn: string }
	: never;

declare type ErrorProps = { error: Error; reset: () => void };
