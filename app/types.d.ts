type PageProps<T extends Route<string>> = {
	searchParams: Partial<SearchParams<T>>;
};

type SearchParams<T extends Route<string>> = T extends "/"
	? never
	: T extends "/dashboard"
	? { orgId: string; licenseKey: string }
	: T extends "/dashboard/sessions"
	? SearchParams<"/dashboard"> & { session: string }
	: never;
