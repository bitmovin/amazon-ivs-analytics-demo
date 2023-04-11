import { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { usePath } from "./usePath";

export function useRoute() {
	const searchParams = useSearchParams();
	const path = usePath();

	return [
		`${path}?${searchParams}`,
		useCallback(
			(query: Record<string, string | undefined>) => {
				const params = new URLSearchParams(searchParams);
				const keys = Object.keys(query);
				for (const key in keys) {
					const value = query[key];
					if (value) {
						params.set(key, value);
					}
				}
				return `${path}?${params}`;
			},
			[path, searchParams]
		),
	] as const;
}
