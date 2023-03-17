import BitmovinApi from '@bitmovin/api-sdk';
import { List } from '@/components/List';

export const metadata = {
	title: 'Sessions',
	description: 'Bitmovin and Amazon IVS Demo',
};

const {
	BITMOVIN_API_KEY,
	BITMOVIN_TENANT_ORG_ID,
	BITMOVIN_ANALYTICS_LICENSE_KEY
} = process.env;

if (!BITMOVIN_API_KEY) {
	throw new Error('Could not initialize Bitmovin API Client', { cause: 'Missing API Key' });
}

const api = new BitmovinApi({ apiKey: BITMOVIN_API_KEY, tenantOrgId: BITMOVIN_TENANT_ORG_ID });

if (!BITMOVIN_ANALYTICS_LICENSE_KEY) {
	throw new Error('Could not find Bitmovin Analytics license key', { cause: 'Missing License Key' });
}

async function getData() {
	const now = Date.now();
	const response = await api.analytics.impressions.getImpressions({
		start: new Date(now - 1000 * 60 * 60 * 24 * 10),
		end: new Date(now),
		limit: 10,
		licenseKey: BITMOVIN_ANALYTICS_LICENSE_KEY
	});

	if (typeof response.impressions === 'undefined') {
		throw new Error('Could not fetch impressions', {
			cause: 'Impressions API call was unsuccessful'
		});
	}
	
	return response.impressions.map(i => ({...i}));
}

export default async function Page() {
	const items = await getData();

	return (<List rows={items} loadingText='Loading sessions...' />);
}