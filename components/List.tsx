'use client';

import Table, { TableProps } from "@cloudscape-design/components/table";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type Value = string[] | string | number | boolean | undefined;
export type Item = { [x: string]: Value };

export type ListProps<T extends Item> = ({
  items: T[]
  loading?: undefined
} | {
  items?: undefined
  loading: true
}) & Partial<Record<'empty' | 'filter', JSX.Element>> & {
  variant?: TableProps.Variant

}

export function List<T extends Item>(props: ListProps<T>) {
  const pathname =  usePathname();
  const columnDefinitions = props.items?.at(0) ? Object.keys(props.items[0]).map(columnDefinition) : [];

  return (
    <Table
      empty={props.empty}
      items={props.loading ? [] : props.items}
      filter={props.filter}
      variant={props.variant}
      loading={props.loading}
      columnDefinitions={columnDefinitions}
    />
  );

  function columnDefinition(column: string & keyof T) {
    return ({
      header: <p>{column}</p>,
      cell: (item: T) => (
        <Link href={`${pathname}/${item[column]}` as Route}>
          {item[column]}
        </Link>
      )
    });
  }
};

