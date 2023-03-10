import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Channel",
  description: "Bitmovin and Amazon IVS Demo",
};

type ChannelProps = {
  params: {
    id: string;
  };
};

export default function Channel({params:{id}}: ChannelProps) {
  return <p>Channel: {id}</p>;
}
