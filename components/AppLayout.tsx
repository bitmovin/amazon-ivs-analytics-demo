import dynamic from 'next/dynamic';

export const AppLayout = dynamic(() => import('./client/AppLayout'), {
    loading: () => <div>Loading</div>
});