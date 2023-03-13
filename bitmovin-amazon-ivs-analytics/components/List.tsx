'use client';

import Box from "@cloudscape-design/components/box";
import Table from "@cloudscape-design/components/table";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DateRange, useDateRange } from "./DateRange";

type Value = string[] | string | number | boolean | undefined;
type Item = { [x: string]: Value };

export const List = <T extends Item>(props: { items: T[] }) => {
  const [value, setValue] = useDateRange(null);
  const pathname =  usePathname();

  const variant = 'embedded';
  const items = props.items;
  const loading = items.length <= 0;
  const columnDefinitions = items.at(0) ? Object.keys(items[0]).map(columnDefinition) : [];
  const filter = (<DateRange {...{value, setValue}} />);
  const empty = (
    <Box>
      <b>No resources</b>
      <Box>
        No resources to display.
      </Box>
    </Box>
  );

  return (
    <Table
      empty={empty}
      items={items}
      filter={filter}
      variant={variant}
      loading={loading}
      columnDefinitions={columnDefinitions}
    />
  );

  function columnDefinition(column: string & keyof T) {
    return ({
      header: columnHeader(column),
      cell: (item: T) => cell(item, column)
    });
  }

  function cell(item: T, column: string & keyof T) {
    return (
      <Link href={`${pathname}/${item[column]}` as Route}>
        {item[column]}
      </Link>
    );
  }

  function columnHeader(column: string & keyof T) {
    return <p>{column}</p>;
  }
};
