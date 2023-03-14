import dynamic from 'next/dynamic';

export const List = dynamic(() => import('./client/List'));