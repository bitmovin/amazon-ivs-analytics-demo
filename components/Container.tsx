import dynamic from "next/dynamic";

export const Container = dynamic(() => import("./client/Container"), {
  loading: () => <div>Loading</div>
});