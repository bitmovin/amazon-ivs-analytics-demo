"use client";

import React, { Suspense, lazy } from "react";

import type { TableProps } from "@cloudscape-design/components/table";
import Spinner from "./Spinner";

const LazyTable = lazy(() => import("@cloudscape-design/components/table"));

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function Table<
	T extends { [x: string]: JSX.Element | undefined }
>(
	props: Omit<TableProps<unknown>, "trackBy" | "isItemDisabled"> & {
		columns: Record<string, { header: JSX.Element }>;
	}
) {
	return (
		<Suspense
			fallback={
				<div>
					<Spinner />
					Loading sessions
				</div>
			}
		>
			<LazyTable
				{...props}
				items={props.items}
				columnDefinitions={
					(Object.keys(props.columns || {}).map((column) => ({
						header: <>{props.columns[column].header}</>,
						ariaLabel: (data) => `${data}${column}`,
						cell: (item: T) => {
							return item[column];
						},
					})) || []) as TableProps<unknown>["columnDefinitions"]
				}
			/>
		</Suspense>
	);
}
