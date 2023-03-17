'use client';

import { usePathname, useSelectedLayoutSegment, useSelectedLayoutSegments } from 'next/navigation';

export function useTitle() {
	return useSelectedLayoutSegments().at(-1) ||
		usePathname().split('/').at(-1) ||
		useSelectedLayoutSegment();
}