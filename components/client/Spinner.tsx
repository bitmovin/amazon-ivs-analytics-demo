'use client';

import Spinner, { SpinnerProps } from '@cloudscape-design/components/spinner';
import React from 'react';

if (typeof window === 'undefined') {
	React.useLayoutEffect = () => ({});
}

export default function ClientSpinner(props: Partial<SpinnerProps>) {
	return (<Spinner {...props} />);
}