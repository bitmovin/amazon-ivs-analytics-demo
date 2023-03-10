"use client";

import Box from "@cloudscape-design/components/box";
import Table from "@cloudscape-design/components/table";
import { Route } from "next";
import Link from "next/link";
import { DateRange, useDateRange } from "./DateRange";

type Item = Record<string, string[] | number | string | boolean | undefined  | null> & {id: string};
type Params<T extends Item> = {
  id: string & keyof T,
  route: Route,
  loading: boolean,
  items: T[];
  title: string;
  columns?: (string & keyof T)[];
};

export const List = <T extends Item>({
  loading,
  route,
  title,
  items,
  columns,
  id,
}: Params<T>) => {
  const [value, setValue] = useDateRange(null);
  return (
    <Table
      filter={<DateRange value={value} setValue={setValue} />}
      items={items}
      empty={
        <Box >
          <b>No resources</b>
          <Box >
            No resources to display.
          </Box>
        </Box>
      }
      loading={loading}
      columnDefinitions={(columns || (items.length > 0 ? Object.getOwnPropertyNames(items[0]) : [])).map(
        (header: string & keyof T) => ({
          id: header,
          header,
          cell: (item: T) => (
            <Link href={id ? `${route}/${item[id]}` : route} >
              {`${item[header]}`}
            </Link>
          ),
        })
      )}
    />
  );
};
