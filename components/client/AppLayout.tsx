"use client";

import AppLayout, { AppLayoutProps } from "@cloudscape-design/components/app-layout";

export type Props = AppLayoutProps;
export default function(props: Props) {
  return (<AppLayout {...props} />);
}
