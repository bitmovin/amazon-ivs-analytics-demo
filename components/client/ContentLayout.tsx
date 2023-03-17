'use client';

import ContentLayout, { ContentLayoutProps } from '@cloudscape-design/components/content-layout';
import React from 'react';

if (typeof window === 'undefined') {
	React.useLayoutEffect = () => ({});
}

export default function ClientContentLayout(props: ContentLayoutProps) {
	return (
		<ContentLayout {...props} />
	);
}