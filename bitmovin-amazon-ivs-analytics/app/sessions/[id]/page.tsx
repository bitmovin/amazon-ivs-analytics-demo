import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Session",
  description: "Bitmovin and Amazon IVS Demo",
};

type SessionProps = {
  params: {
    id: string;
  };
};

export default function Session({params: {id}}: SessionProps) {
  return <p>Session: {id}</p>;
}
