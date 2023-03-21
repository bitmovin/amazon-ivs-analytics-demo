import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useParams() {
	const params = useSearchParams();
	return [
		params,
		useCallback(
			(record: Record<string, string>) => {
				const _params = new URLSearchParams(params);
				const keys = Object.keys(record);
				for (const key in keys) {
					_params.set(key, record[key]);
				}
				return _params;
			},
			[params]
		),
	];
}
