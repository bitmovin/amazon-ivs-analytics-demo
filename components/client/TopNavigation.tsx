'use client';

import TopNavigation, { TopNavigationProps } from '@cloudscape-design/components/top-navigation';
import { useRouter } from 'next/navigation';
import React from 'react';

if (typeof window === 'undefined') {
	React.useLayoutEffect = () => ({});
}

export default function ClientTopNavigation(props: TopNavigationProps) {
	const router = useRouter();

	return (
		<TopNavigation
			{...props}
			identity={{
				...props.identity,
				onFollow(event) {
					if (props.identity.onFollow) {
						props.identity.onFollow(event);
					}
					event.preventDefault();
					router.replace(props.identity.href, {
						forceOptimisticNavigation: true
					});
				}
			}}
		/>
	);
}