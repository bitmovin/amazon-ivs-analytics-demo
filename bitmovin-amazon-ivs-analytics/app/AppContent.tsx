"use client";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import React from "react";
import { SearchInput } from "./SearchInput";

export const AppContent = ({ children }: { children: React.ReactNode; }) => {
  return (
    <>
      <TopNavigation
        identity={{ href: "#" }}
        i18nStrings={{ overflowMenuTriggerText: "", overflowMenuTitleText: "" }}
        search={<SearchInput />} />
      {children}
    </>
  );
};
