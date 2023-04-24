"use client";

import React, { Suspense, lazy } from "react";

import type { TableProps } from "@cloudscape-design/components/table";
import Spinner from "./Spinner";
import { intlFormat } from "date-fns";

const LazyTable = lazy(() => import("@cloudscape-design/components/table"));

if (typeof window === "undefined") {
  React.useLayoutEffect = () => ({});
}

export default function Table(
  props: Omit<TableProps<unknown>, "trackBy" | "isItemDisabled" | "columnDefinitions"> & {
    columns: { id: string; children?: JSX.Element | string; type?: 'date' }[];
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
        columnDefinitions={
          (props.columns.map((column) => ({
            header: column.children ? <>{column.children}</> : <></>,
            ariaLabel: (data) => `${data}${column}`,
            cell: <T extends { [x: string]: JSX.Element }>(item: T) => {
              if (column.type === 'date') {
                console.log(`formatting ${item[column.id]} as date...`);
                return intlFormat(new Date(item[column.id] as any), {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                  weekday: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }
              return item[column.id];
            },
          })) || []) as TableProps<unknown>["columnDefinitions"]
        }
      />
    </Suspense>
  );
}
