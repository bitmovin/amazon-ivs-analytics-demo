import dynamic from 'next/dynamic';

export const Cards = dynamic(() => import('./client/Cards'), {
    loading: () => <div>Loading</div>
});