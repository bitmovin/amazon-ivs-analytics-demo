
import BitmovinApi from "@bitmovin/api-sdk";

export const analytics = new BitmovinApi({
  apiKey: process.env.BITMOVIN_API_KEY || '',
  tenantOrgId: process.env.BITMOVIN_TENANT_ORG_ID
}).analytics;
