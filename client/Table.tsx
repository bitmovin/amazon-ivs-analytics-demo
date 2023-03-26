"use client";

import React, { Suspense, lazy } from "react";

import type { TableProps } from "@cloudscape-design/components/table";

const LazyTable = lazy(() => import("@cloudscape-design/components/table"));

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function Table<
	T extends { [x: string]: JSX.Element | undefined }
>({
	fallback,
	...props
}: TableProps<T> & { fallback: JSX.Element } & {
	columns: Record<string, { header: JSX.Element }>;
}) {
	return (
		<Suspense fallback={fallback}>
			<LazyTable
				items={props.items}
				variant={props.variant || "embedded"}
				loading={props.loading || false}
				loadingText={props.loadingText || ""}
				footer={props.footer}
				columnDefinitions={
					Object.keys(props.columns || {}).map((column) => ({
						header: <>{props.columns[column].header}</>,
						ariaLabel: (data) => `${data}${column}`,
						cell: (item: T) => {
							return item[column];
						},
					})) || []
				}
			/>
		</Suspense>
	);
}
