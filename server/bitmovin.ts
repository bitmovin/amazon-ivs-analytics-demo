import "server-only";

import BitmovinApi, { AnalyticsImpressionsQuery } from "@bitmovin/api-sdk";

import { requireEnv } from "./env";
import { AnalyticsLicenseListQueryParams } from "@bitmovin/api-sdk/dist/analytics/licenses/AnalyticsLicenseListQueryParams";
import { cache } from "react";

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

export const fetchImpression = async (
	impressionId: string,
	licenseKey: string,
	requestInit?: RequestInit,
	tenantOrgId?: string
) => {
	const client = getClient(requestInit, tenantOrgId);
	const impressions = await client.analytics.impressions.create(
		impressionId,
		{ licenseKey }
	);
	return impressions?.flat() || [];
};

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



