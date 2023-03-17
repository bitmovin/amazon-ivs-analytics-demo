'use client';

import AppLayout, { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';

if (typeof window === 'undefined') {
	React.useLayoutEffect = () => ({});
}

const QUERY = {
	nav: {
		open: { key: 'nav', value: 'open' },
		closed: { key: 'nav', value: 'closed' }
	},
	tools: {
		open: { key: 'tools', value: 'open' },
		closed: { key: 'tools', value: 'closed' }
	}
};

export default function ClientAppLayout(props: AppLayoutProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const tools = searchParams.get('tools') === 'open';
	const nav = searchParams.get('nav') === 'open';

	const createQueryString = useCallback(
		({key, value}: {key: string, value: string}) => {
			const params = new URLSearchParams(searchParams);
			params.set(key, value);
			return `${params}`;
		},
		[searchParams],
	);

	return (
		<AppLayout {...props}
			navigation={nav}
			toolsOpen={tools}
			onNavigationChange={(event) => {
				if (props.onNavigationChange) {
					props.onNavigationChange(event);
				}

				const query = createQueryString(
					event.detail.open ? QUERY.nav.open : QUERY.nav.closed
				);

				router.replace(`/${pathname}?${query}`);
			}}
			onToolsChange={(event) => {
				if (props.onToolsChange) {
					props.onToolsChange(event);
				}

				const query = createQueryString(
					event.detail.open ? QUERY.tools.open : QUERY.tools.closed
				);
					
				router.replace(`${pathname}?${query}`);
			}}
		/>
	);
}