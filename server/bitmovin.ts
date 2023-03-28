import "server-only";

import BitmovinApi, {
	AnalyticsAttribute,
	AnalyticsImpressionsQuery,
	AnalyticsInterval,
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

export type QueryType = keyof QueriesApi;
export type QueryParams<K extends QueryType> = Parameters<
	QueriesApi[K]["create"]
>[0];
export const fetchQuery = cache(
	async <K extends QueryType>(
		query: K,
		requestInit?: RequestInit,
		tenantOrgId?: string,
		params?: Parameters<QueriesApi[K]["create"]>[0]
	) => {
		const client = getClient(requestInit, tenantOrgId);
		return await client.analytics.queries[query].create(params);
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
export type OperatorKey = keyof Operator;
export type GroupOperators = "IN";
export type ElementOperator = keyof Omit<Operator, GroupOperators>;
export type ListOperator = keyof Pick<Operator, GroupOperators>;




