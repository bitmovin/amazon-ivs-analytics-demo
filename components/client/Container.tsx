'use client';

import Container, { ContainerProps } from '@cloudscape-design/components/container';
import React from 'react';

if (typeof window === 'undefined') {
	React.useLayoutEffect = () => ({});
}

export default function ClientContainer(props: ContainerProps) {
	return (<Container {...props} />);
}
