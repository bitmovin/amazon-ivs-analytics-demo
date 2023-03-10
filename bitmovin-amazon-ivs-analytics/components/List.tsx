'use client';

import Table from "@cloudscape-design/components/table";
import Link from "next/link";
import { Title } from "./Title";


type KeyOf<T> = string & keyof T;

type Item<T> = {
  route: string;
  id: KeyOf<T>;
};

type Data<T extends Record<string, string>> = {
  items: T[],
  title: JSX.Element,
  columns: (KeyOf<T>)[],
} & Item<T>;

export const Cell = <T extends Record<string, string>,>({route, id}: Item<T>) => <Link href={`${route}/${id}`.toLowerCase()}>{id}</Link>

export const List = <T extends Record<string, string>,>({route, title, items, columns, id}: Data<T>) => <Table
    title={title}
    items={items}
    columnDefinitions={
      columns.map(id => ({
          id,
          header: id, 
          cell: (item: T) => <Cell route={route} id={item[id]} />,
      }))
    }
    trackBy={id}
  />;