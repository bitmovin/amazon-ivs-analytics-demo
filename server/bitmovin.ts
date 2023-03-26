import "server-only";

import BitmovinApi, {
	AnalyticsAbstractFilter,
	AnalyticsAttribute,
	AnalyticsAvgQueryRequest,
	AnalyticsContainsFilter,
	AnalyticsEqualFilter,
	AnalyticsGreaterThanFilter,
	AnalyticsGreaterThanOrEqualFilter,
	AnalyticsImpressionsQuery,
	AnalyticsInFilter,
	AnalyticsInterval,
	AnalyticsLessThanFilter,
	AnalyticsLessThanOrEqualFilter,
	AnalyticsNotContainsFilter,
	AnalyticsNotEqualFilter,
	AnalyticsOrder,
	AnalyticsQueryOperator,
} from "@bitmovin/api-sdk";

import { requireEnv } from "./env";
import { AnalyticsLicenseListQueryParams } from "@bitmovin/api-sdk/dist/analytics/licenses/AnalyticsLicenseListQueryParams";
import { cache } from "react";
import QueriesApi from "@bitmovin/api-sdk/dist/analytics/queries/QueriesApi";

const config = {
	apiKey: requireEnv("BITMOVIN_API_KEY"),
};

function getClient(requestInit?: RequestInit, tenantOrgId?: string) {
	const { apiKey } = config;

	if (tenantOrgId) {
		return new BitmovinApi({
			apiKey,
			tenantOrgId,
			fetch: async (url, init) => {
				return await fetch(url, { ...init, ...requestInit });
			},
		});
	} else {
		return new BitmovinApi({
			apiKey,
			fetch: async (url, init) => {
				return await fetch(url, { ...init, ...requestInit });
			},
		});
	}
}

export const fetchQuery = cache(
	async <K extends keyof QueriesApi>(
		type: K,
		requestInit?: RequestInit,
		tenantOrgId?: string,
		params?: Parameters<QueriesApi[K]["create"]>[0]
	) => {
		const client = getClient(requestInit, tenantOrgId);
		return await client.analytics.queries[type].create(params);
	}
);

export const preloadInformation = (
	requestInit?: RequestInit,
	tenantOrgId?: string
) => {
	void fetchInformation(requestInit, tenantOrgId);
};

export const fetchInformation = cache(
	async (requestInit?: RequestInit, tenantOrgId?: string) => {
		const client = getClient(requestInit, tenantOrgId);
		return await client.account.information.get();
	}
);

export const preloadOrganizations = (
	requestInit?: RequestInit,
	tenantOrgId?: string
) => {
	void fetchOrganizations(requestInit, tenantOrgId);
};

export const fetchOrganizations = cache(
	async (requestInit?: RequestInit, tenantOrgId?: string) => {
		const client = getClient(requestInit, tenantOrgId);
		return await client.account.organizations.list();
	}
);

export const preloadOrganization = (
	organizationId: string,
	requestInit?: RequestInit,
	tenantOrgId?: string
) => {
	void fetchOrganization(organizationId, requestInit, tenantOrgId);
};

export const fetchOrganization = cache(
	async (
		organizationId: string,
		requestInit?: RequestInit,
		tenantOrgId?: string
	) => {
		const client = getClient(requestInit, tenantOrgId);
		return await client.account.organizations.get(organizationId);
	}
);

export const preloadLicenses = (
	requestInit?: RequestInit,
	tenantOrgId?: string,
	params?: AnalyticsLicenseListQueryParams
) => {
	void fetchLicenses(requestInit, tenantOrgId, params);
};

export const fetchLicenses = cache(
	async (
		requestInit?: RequestInit,
		tenantOrgId?: string,
		params?: AnalyticsLicenseListQueryParams
	) => {
		const client = getClient(requestInit, tenantOrgId);
		return await client.analytics.licenses.list(params);
	}
);

export const preloadImpression = (
	requestInit: RequestInit,
	tenantOrgId: string,
	impressionId: string,
	licenseKey: string
) => {
	void fetchImpression(impressionId, tenantOrgId, requestInit, licenseKey);
};

export const fetchImpression = cache(
	async (
		impressionId: string,
		licenseKey: string,
		requestInit?: RequestInit,
		tenantOrgId?: string
	) => {
		const client = getClient(requestInit, tenantOrgId);
		return await client.analytics.impressions.create(impressionId, {
			licenseKey,
		});
	}
);

export const preloadImpressions = (
	requestInit?: RequestInit,
	tenantOrgId?: string,
	searchParams?: AnalyticsImpressionsQuery
) => {
	void fetchImpressions(requestInit, tenantOrgId, searchParams);
};

export const fetchImpressions = cache(
	async (
		requestInit?: RequestInit,
		tenantOrgId?: string,
		searchParams?: AnalyticsImpressionsQuery
	) => {
		const client = getClient(requestInit, tenantOrgId);
		const response = await client.analytics.impressions.getImpressions(
			searchParams
		);
		return response;
	}
);
export type Order = keyof typeof AnalyticsOrder;
export type Interval = keyof typeof AnalyticsInterval;
export type Attribute = keyof typeof AnalyticsAttribute;

export type Operator = typeof AnalyticsQueryOperator;
export type GroupOperators = "IN";
export type ElementOperator = keyof Omit<Operator, GroupOperators>;
export type ListOperator = keyof Pick<Operator, GroupOperators>;

export type ElementFilter = {
	name: Attribute;
	operator: ElementOperator;
	value: unknown;
};

export type ListFilter = {
	name: Attribute;
	operator: ListOperator;
	value: unknown[];
};

export type Filter = ElementFilter | ListFilter;

export function mapFilters(filter: Filter) {
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
