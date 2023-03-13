import dynamic from "next/dynamic";

export const Spinner = dynamic(() => import('./client/Spinner'), {
    loading: () => <div>Loading</div>
});