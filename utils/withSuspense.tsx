import { ComponentType, Suspense } from "react";

export function withSuspense<P>(Component: ComponentType<P>, AsyncComponent: Promise<ComponentType<P>>) {
  return function WithSuspense(props: JSX.IntrinsicAttributes & P) {
    return (
      <Suspense fallback={<Component {...props} />}>
        {/* @ts-expect-error suspense */}
        <AsyncComponent {...props} />
      </Suspense>
    );
  };
}
