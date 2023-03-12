import { List } from "@/components/List";

export const metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Bitmovin IVS",
  },
  applicationName: "Bitmovin IVS",
  description: "Bitmovin and Amazon IVS Demo",
};

export default function ListsLayout(props: {children: JSX.Element}) {
  return (
    props.children
  );
}
