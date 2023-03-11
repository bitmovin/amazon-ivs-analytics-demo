import { List } from "@/components/List";

export const metadata = {
  title: "Home"
};

export default function Loading() {
  return <List loading={true} />
}
