import "./globals.css";

import { Metadata } from "next";
import { Main } from "@/components/Main";
import { Header } from "@/components/Header";
import { Search } from "@/components/Search";
import { Navigation } from "@/components/Navigation";
import { Route } from "@/components/Route";

export const metadata: Metadata = {
  applicationName: "Dashboard",
  title: "Home",
  description: "Bitmovin and Amazon IVS Demo",
};

type Props = {
  children: JSX.Element;
};

const ROUTES = [{text: "Sessions", href: "/sessions"}];

export default ({ children }: Props) => {
  return (
    <html lang="en">
      <body>
        <Main navigation={<Navigation />} breadcrumbs={<Route items={ROUTES}/>}>
          <>
            <Header search={<Search param={"search"} />} />
            {children}
          </>
        </Main>
        <main>{children}</main>
      </body>
    </html>
  );
};
