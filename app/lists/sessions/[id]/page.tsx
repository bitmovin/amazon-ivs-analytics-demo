import { List } from '@/components/List';
import BitmovinApi from '@bitmovin/api-sdk';

export const metadata = {
	title: 'Session',
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

const api = new BitmovinApi({
	apiKey: BITMOVIN_API_KEY,
	tenantOrgId: BITMOVIN_TENANT_ORG_ID,
	fetch: async function(url, init) {
		return await fetch(url, {
			...init,
			cache: 'force-cache',
			next: {
				revalidate: 10,
			}
		});
	}
});

if (!BITMOVIN_ANALYTICS_LICENSE_KEY) {
	throw new Error('Could not find Bitmovin Analytics license key', { cause: 'Missing License Key' });
}

async function getData(id: string) {
	const response = await api.analytics.impressions.create(id, {
		licenseKey: BITMOVIN_ANALYTICS_LICENSE_KEY
	});
	
	return response.flat().map(item => ({...item}));
}

export default async function Page(props: {
	params: {
		id: string
	}
}) {
	const rows = await getData(props.params.id);
	return (<List rows={rows} />);
}