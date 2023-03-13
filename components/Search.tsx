"use client";

import Input from "@cloudscape-design/components/input";
import { useSearchParams } from 'next/navigation';
import { SetStateAction, useState } from 'react';
type SearchEvent = {
  detail: {
    value: SetStateAction<string | null>;
  };
};

export const Search = ({param}:{param:string}) => {
  const searchParams = useSearchParams();
  const search = searchParams.get(param);
  const [value, setValue] = useState(search);
  const handleSearch = (e: SearchEvent) => setValue(e.detail.value);

  return (
    <Input
      value={value || ""}
      onChange={handleSearch}
      type="search"
      placeholder="Search"
      ariaLabel="Search" />
  );
};
