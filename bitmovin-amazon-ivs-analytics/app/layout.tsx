import "./globals.css";

import { Metadata } from "next";
import { Main } from "@/components/Main";
import { Header } from "@/components/Header";
import { Search } from "@/components/Search";
import { Title } from "@/components/Title";
import { useSelectedLayoutSegments } from "next/navigation";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Bitmovin IVS",
  },
  applicationName: "Bitmovin IVS",
  description: "Bitmovin and Amazon IVS Demo",
};

const PATHS = ["Channels", "Sessions"];

export default function RootLayout({ children }: { children: JSX.Element }) {
  
  return (
    <html lang="en">
      <body className="awsui-dark-mode">
        <main>
          <Main paths={PATHS} >
            <Header />
            {children}
          </Main>
        </main>
      </body>
    </html>
  );
}
