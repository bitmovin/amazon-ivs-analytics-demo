"use client";

import TopNavigation from "@cloudscape-design/components/top-navigation";

export type HeaderProps = {
  search?: JSX.Element;
};

export const Header = ({ search } : HeaderProps) => (
  <TopNavigation
    identity={{ href: "#" }}
    i18nStrings={{ overflowMenuTriggerText: "", overflowMenuTitleText: "" }}
    search={search}
  />
);
