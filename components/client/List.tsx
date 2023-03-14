'use client';

import Table, { TableProps } from '@cloudscape-design/components/table';
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type Value = string[] | string | number | boolean | undefined;
export type Item = Record<string, Value>;
export type Props<T extends Item> = Omit<TableProps<T>, 'columnDefinitions'>

export default function<T extends Item>(props: Props<T>) {
  const pathname =  usePathname();
  const columnDefinitions = props.items?.at(0) ?
    Object.keys(props.items[0]).map((column) => ({
      header: <p>{column}</p>,
      cell: (item: T) => (
        <Link href={`${pathname}/${item[column]}` as Route}>
          {item[column]}
        </Link>
      )
    })) : [];

  return (
    <Table {...props}
      columnDefinitions={columnDefinitions}
    />
  );
};

