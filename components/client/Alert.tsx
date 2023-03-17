'use client';

import Alert, { AlertProps } from '@cloudscape-design/components/alert';
import React from 'react';

if (typeof window === 'undefined') {
	React.useLayoutEffect = () => ({});
}

export default function ClientAlert({ children, ...props}: AlertProps) {

	return (
		<Alert {...props}>
			{children}
		</Alert>
	);
}