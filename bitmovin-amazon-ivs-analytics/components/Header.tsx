"use client";

import TopNavigation from "@cloudscape-design/components/top-navigation";

export const Header = ({ children } : {children?: JSX.Element}) => (
  <TopNavigation
    identity={{
      href: "#"
    }}
    i18nStrings={{
      overflowMenuTriggerText: "",
      overflowMenuTitleText: ""
    }}
    search={children}
  />
);
