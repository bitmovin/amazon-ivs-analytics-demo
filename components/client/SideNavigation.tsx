"use client";

import SideNavigation, { SideNavigationProps } from "@cloudscape-design/components/side-navigation";
import { Route } from "next";
import { useRouter } from "next/navigation";
import React from "react";

if (typeof window === "undefined") {
  React.useLayoutEffect = () => ({});
}

export default function ClientSideNavigation(props: {
  items: [
    {
      type: "link";
      text: string;
      href: Route;
    }
  ];
}) {
  const router = useRouter();

  return (
    <SideNavigation
      items={props.items}
      onFollow={(event) => {
        event.preventDefault();
        router.replace(event.detail.href as Route);
      }}
    />
  );
}
