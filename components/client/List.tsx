'use client';

import Table, { TableProps } from '@cloudscape-design/components/table';
import React from 'react';

if (typeof window === 'undefined') {
	React.useLayoutEffect = () => ({});
}

export type Cell = string | number | boolean | string[] | Element;
export type Row = Record<string, Cell>
export type Props<T> = { rows: T[] } & TableProps<T>;
export default function ClientTable<T extends Row>(props: Partial<Props<T>>) {
	return (
		<Table
			{...props}
			items={props.rows || []}
			columnDefinitions={
				Object.keys(props.rows?.at(0) || {}).map(column => ({
					header: <>{column}</>,
					ariaLabel: (data) => `${data}${column}`,
					cell: (item: T) => {
						const cell = item[column] || 'null';
						const data = typeof cell === 'object' ? JSON.stringify(cell) : cell;
						return <>{data}</>;
					},
				})) || []
			}
		/>
	);
}

