import dynamic from 'next/dynamic';

export const Alert = dynamic(() => import('./client/Alert'));