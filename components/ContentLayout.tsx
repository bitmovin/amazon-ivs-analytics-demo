import dynamic from "next/dynamic";

export const ContentLayout = dynamic(() => import('./client/ContentLayout'), {
    loading: () => <div>Loading</div>
});