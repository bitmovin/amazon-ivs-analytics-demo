"use client";

import React, { Suspense, lazy } from "react";

import type { TableProps } from "@cloudscape-design/components/table";

const LazyTable = lazy(() => import("@cloudscape-design/components/table"));

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function Table<T extends { [x: string]: unknown }>({
	fallback,
	...props
}: TableProps<T> & { fallback: JSX.Element }) {
	return (
		<Suspense fallback={fallback}>
			<LazyTable
				items={props.items}
				variant={props.variant || "embedded"}
				loading={props.loading || false}
				loadingText={props.loadingText || ""}
				columnDefinitions={
					Object.keys(props.items?.at(0) || {}).map((column) => ({
						header: <>{column}</>,
						ariaLabel: (data) => `${data}${column}`,
						cell: (item: T) => {
							const cell =
								column in item &&
								(typeof item[column] === "string" ||
									typeof item[column] === "number")
									? item[column]
									: "test";
							const data =
								typeof cell === "object"
									? JSON.stringify(cell)
									: cell;
							return <>{data}</>;
						},
					})) || []
				}
			/>
		</Suspense>
	);
}
