import dynamic from 'next/dynamic';

export const Header = dynamic(() => import('./client/Header'));