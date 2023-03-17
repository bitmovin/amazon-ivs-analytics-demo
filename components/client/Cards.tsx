'use client';

import Cards, { CardsProps } from '@cloudscape-design/components/cards';
import React from 'react';

if (typeof window === 'undefined') {
	React.useLayoutEffect = () => ({});
}

export default function ClientCards<T>(props: CardsProps<T>) {
	return <Cards {...props} />;
}