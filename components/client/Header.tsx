'use client';

import Header, { HeaderProps } from '@cloudscape-design/components/header';
import React from 'react';
import { useTitle } from './hooks/useTitle';

if (typeof window === 'undefined') {
	React.useLayoutEffect = () => ({});
}

export default function ClientHeader({ children, ...attrs }: Partial<HeaderProps>) {
	const title = useTitle();
	
	return (
		<Header {...attrs}>
			{children || title}
		</Header>
	);
}