import { ContentLayout } from "@/components/ContentLayout";
import { List } from "@/components/List";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home"
};

export default function App() {
  return (
    <ContentLayout header={'Lists'}>
      <List loading={true} />
    </ContentLayout>
  );
}


