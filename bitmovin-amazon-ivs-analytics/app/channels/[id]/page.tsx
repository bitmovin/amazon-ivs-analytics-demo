import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Channel",
  description: "Bitmovin and Amazon IVS Demo",
};

type Params = {
  params: {
    id: string;
  };
};

export default function Page({params:{id}}: Params) {
  return <p>Channel: {id}</p>;
}
