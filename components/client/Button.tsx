'use client';

import Button, { ButtonProps } from '@cloudscape-design/components/button';
import { useRouter } from 'next/navigation';
import React from 'react';

if (typeof window === 'undefined') {
	React.useLayoutEffect = () => ({});
}

export default function ClientButton({ href, ...props}: ButtonProps) {
	const router = useRouter();
	return (
		<Button {...props} onClick={() => { href && router.push(href); }}>
		</Button>
	);
}