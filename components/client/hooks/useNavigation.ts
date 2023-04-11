import { Route } from "next";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export type Router = ReturnType<typeof useRouter>;

export function useNavigation<T extends Partial<Event>, K extends keyof Router, R extends string>(
  key: K,
  href: Route<R>,
  handler?: (event: T) => void,
  options?: Parameters<Router[K]>[1]
) {
  const router = useRouter();
  return useCallback(
    (event: T) => {
      if (handler) handler(event);
      if (event.preventDefault) event.preventDefault();
      router[key](href, options);
    },
    [router]
  );
}
