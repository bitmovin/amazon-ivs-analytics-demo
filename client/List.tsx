"use client";

import Table, { TableProps } from "@cloudscape-design/components/table";
import React from "react";

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function ClientTable<T extends { [x: string]: unknown }>(
	props: TableProps<T>
) {
	return (
		<Table
			{...props}
			items={props.items}
			columnDefinitions={
				Object.keys(props.items?.at(0) || {}).map((column) => ({
					header: <>{column}</>,
					ariaLabel: (data) => `${data}${column}`,
					cell: (item: T) => {
						const cell =
							column in item && typeof item[column] === "string"
								? item[column]
								: "null";
						const data =
							typeof cell === "object"
								? JSON.stringify(cell)
								: cell;
						return <>{data}</>;
					},
				})) || []
			}
		/>
	);
}
