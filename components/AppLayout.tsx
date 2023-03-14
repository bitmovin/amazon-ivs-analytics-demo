import dynamic from 'next/dynamic';

export const AppLayout = dynamic(() => import('./client/AppLayout'));