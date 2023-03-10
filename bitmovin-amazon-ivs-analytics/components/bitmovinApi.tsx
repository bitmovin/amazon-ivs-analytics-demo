'use server';

import BitmovinApi from "@bitmovin/api-sdk";

const analytics = new BitmovinApi({
  apiKey: process.env.BITMOVIN_API_KEY || '',
  tenantOrgId: process.env.BITMOVIN_TENANT_ORG_ID
}).analytics;

export async function fetchSession(id: string) {
  return (await analytics.impressions.create(id, {
    licenseKey: process.env.BITMOVIN_ANALYTICS_LICENSE_KEY
  }))?.flatMap(e => e).flatMap(e => ({...e}))
}

type SessionsParams = {
  start: Date;
  end: Date;
  limit: number;
};

export async function fetchSessions(params: SessionsParams) {
  return await analytics.impressions.getImpressions({
    licenseKey: process.env.BITMOVIN_ANALYTICS_LICENSE_KEY,
    ...params
  });
}