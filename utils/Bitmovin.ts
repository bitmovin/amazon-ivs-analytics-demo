'use server';

import BitmovinApi from "@bitmovin/api-sdk";

const analytics = new BitmovinApi({
  apiKey: process.env.BITMOVIN_API_KEY || '',
  tenantOrgId: process.env.BITMOVIN_TENANT_ORG_ID
}).analytics;

const licenseKey = process.env.BITMOVIN_ANALYTICS_LICENSE_KEY;

export async function fetchSession(id: string) {
  const details = await analytics.impressions.create(id, {licenseKey});
  return details?.flatMap(e => e).flatMap(e => ({...e}));
}

export async function fetchSessions(params:{start: Date, end: Date, limit: number}) {
  return await analytics.impressions.getImpressions({licenseKey, ...params});
}