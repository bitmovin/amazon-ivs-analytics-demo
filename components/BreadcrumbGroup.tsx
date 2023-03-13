import dynamic from 'next/dynamic';

export const BreadcrumbGroup = dynamic(() => import('./client/BreadcrumbGroup'), {
    loading: () => <div>Loading</div>
});