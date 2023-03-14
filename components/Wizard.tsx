import dynamic from 'next/dynamic';

export const Wizard = dynamic(() => import('./client/Wizard'));