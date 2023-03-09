"use client";

import Input from "@cloudscape-design/components/input";
import React, { useState } from "react";

export const SearchInput = () => {
  const [search, setSearch] = useState("");
  return (
    <Input
      value={search}
      onChange={(e) => setSearch(e.detail.value)}
      type="search"
      placeholder="Search"
      ariaLabel="Search" />
  );
};
