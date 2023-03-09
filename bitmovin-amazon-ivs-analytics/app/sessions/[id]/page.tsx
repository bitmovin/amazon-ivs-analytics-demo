import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Session",
  description: "Bitmovin and Amazon IVS Demo",
};

export default function Session({params:{id}}:{params:{id:string}}) {
  return <p>Session: {id}</p>;
}
