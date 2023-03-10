"use client";

import TopNavigation from "@cloudscape-design/components/top-navigation";
import { useSelectedLayoutSegments } from "next/navigation";

export const Header = ({ children } : {children?: JSX.Element}) => {
  const segments = useSelectedLayoutSegments();
  return <TopNavigation
    identity={{
      title: segments.at(0),
      href: "#"
    }}
    i18nStrings={{
      overflowMenuTriggerText: "",
      overflowMenuTitleText: ""
    }}
    search={children}
  />
};
