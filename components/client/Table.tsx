"use client";

import React, { Suspense, lazy } from "react";

import type { TableProps } from "@cloudscape-design/components/table";
import Spinner from "./Spinner";

const LazyTable = lazy(() => import("@cloudscape-design/components/table"));

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function Table(
	props: Omit<TableProps<unknown>, "trackBy" | "isItemDisabled"> & {
		columns: { id: string; children?: JSX.Element | string }[];
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
					(props.columns.map((column) => ({
						header: column.children ? (
							<>{column.children}</>
						) : (
							<></>
						),
						ariaLabel: (data) => `${data}${column}`,
						cell: <T extends { [x: string]: JSX.Element }>(
							item: T
						) => {
							return item[column.id];
						},
					})) || []) as TableProps<unknown>["columnDefinitions"]
				}
			/>
		</Suspense>
	);
}
