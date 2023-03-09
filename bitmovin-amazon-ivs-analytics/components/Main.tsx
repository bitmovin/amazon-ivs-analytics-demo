"use client";
import { setupCloudScape } from "@/lib";
import { SideNavigation } from "@cloudscape-design/components";
import AppLayout from "@cloudscape-design/components/app-layout";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

setupCloudScape();

export type MainProps = {
  children: JSX.Element | JSX.Element[];
  navigation: JSX.Element;
  breadcrumbs: JSX.Element;
};

export const Main = ({ children, navigation, breadcrumbs}: MainProps ) => {
  return (
    <AppLayout content={children} navigation={navigation} breadcrumbs={breadcrumbs} />
  );
};