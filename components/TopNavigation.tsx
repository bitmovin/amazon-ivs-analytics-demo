import dynamic from 'next/dynamic'

export const TopNavigation = dynamic(() => import('./client/TopNavigation'));