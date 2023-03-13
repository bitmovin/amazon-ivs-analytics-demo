"use client";

import BaseTopNavigation from "@cloudscape-design/components/top-navigation";

export function TopNavigation(props: {title: string}) {
  return (
    <BaseTopNavigation
      i18nStrings={{overflowMenuTriggerText: "", overflowMenuTitleText: ""}}
      identity={{ href: "/", title: props.title }}
    />
  );
};
