

import BitmovinApi from "@bitmovin/api-sdk";


const licenseKey = process.env.BITMOVIN_ANALYTICS_LICENSE_KEY;

const client = new BitmovinApi({
  apiKey: process.env.BITMOVIN_API_KEY || '',
  tenantOrgId: process.env.BITMOVIN_TENANT_ORG_ID,
});

export async function fetchSession(id: string) {
  const details = await client.analytics.impressions.create(id, {licenseKey});
  return details?.flatMap(e => e).flatMap(e => ({...e}));
}

export async function fetchSessions(params:{start: Date, end: Date, limit: number}) {
  return await client.analytics.impressions.getImpressions({licenseKey, ...params});
}