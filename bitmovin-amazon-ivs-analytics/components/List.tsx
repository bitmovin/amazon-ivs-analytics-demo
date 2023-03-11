"use client";

import Box from "@cloudscape-design/components/box";
import Table from "@cloudscape-design/components/table";
import { Route } from "next";
import Link from "next/link";
import { DateRange, useDateRange } from "./DateRange";

type Item = Record<string, string[] | number | string | boolean | undefined  | null> & {id: string};
type Params<T extends Item> = { loading: true } | {
  id: string & keyof T,
  route: Route,
  loading: false,
  items: T[];
  title: string;
  columns?: (string & keyof T)[];
};

export const List = <T extends Item>(props: Params<T>) => {
  const [value, setValue] = useDateRange(null);

  return props.loading ? (
    <Table loading={true} items={[]} columnDefinitions={[]} />
  ) : (
    <Table
      filter={<DateRange value={value} setValue={setValue} />}
      items={props.items}
      empty={
        <Box >
          <b>No resources</b>
          <Box >
            No resources to display.
          </Box>
        </Box>
      }
      loading={false}
      columnDefinitions={(props.columns || (props.items.length > 0 ? Object.getOwnPropertyNames(props.items[0]) : [])).map(
        (header: string & keyof T) => ({
          id: header,
          header,
          cell: (item: T) => (
            <Link href={props.id ? `${props.route}/${item[props.id]}` : props.route} >
              {`${item[header]}`}
            </Link>
          ),
        })
      )}
    />
  );
};
