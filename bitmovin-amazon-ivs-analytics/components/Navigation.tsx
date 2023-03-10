"use client";

import SideNavigation from "@cloudscape-design/components/side-navigation";

type NavigationProps = {
  paths: string[];
};

export const Navigation = ({ paths }: NavigationProps) => (
  <SideNavigation
    header={{ href: "/", text: "Bitmovin" }}
    items={paths.map((text) => ({
      text,
      href: `/${text.toLowerCase()}`,
      type: "link",
    }))}
  />
);
