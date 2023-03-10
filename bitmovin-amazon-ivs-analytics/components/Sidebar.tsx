"use client";

import SideNavigation from "@cloudscape-design/components/side-navigation";

type SidebarProps = {
  paths: string[];
};

export const Sidebar = ({ paths }: SidebarProps) => (
  <SideNavigation
    header={{ href: "/", text: "Bitmovin" }}
    items={paths.map((text) => ({
      text,
      href: `/${text.toLowerCase()}`,
      type: "link",
    }))}
  />
);
