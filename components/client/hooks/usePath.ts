import { Route } from "next";
import { usePathname } from "next/navigation";

export function usePath() {
	const pathname = usePathname() as Route;

	return `${pathname}` as const;
}
