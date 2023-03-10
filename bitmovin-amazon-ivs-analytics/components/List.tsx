"use client";

import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";
import Pagination from "@cloudscape-design/components/pagination";
import Table from "@cloudscape-design/components/table";
import Link from "next/link";
import { useState } from "react";
import { DateRange, useDateRange } from "./DateRange";

type KeyOf<T> = string & keyof T;

type Item<T> = {
  route: string;
  id?: KeyOf<T>;
};

type Data<T> = {
  items?: T[];
  title: string;
  columns?: KeyOf<T>[];
} & Item<T>;

export const List = <
  T extends Record<string, string | number | string[] | null | boolean>
>({
  route,
  title,
  items,
  columns,
  id,
}: Data<T>) => {
  const [value, setValue] = useDateRange(null);
  return (
    <Table
      filter={<DateRange value={value} setValue={setValue} />}
      items={items ? items : []}
      empty={
        <Box >
          <b>No resources</b>
          <Box >
            No resources to display.
          </Box>
        </Box>
      }
      loading={false}
      resizableColumns={true}
      columnDefinitions={(columns ? columns : []).map(
        (header) => ({
          id,
          header,
          cell: (item: T) => (
            <Link href={`${route}/${item[id || 'id']}`.toLowerCase()}>
              {item[header] || "Loading..."}
            </Link>
          ),
        })
      )}
    />
  );
};
