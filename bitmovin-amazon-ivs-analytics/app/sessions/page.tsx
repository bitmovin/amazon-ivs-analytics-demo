import { List } from "@/components/List";
import { Title } from "@/components/Title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sessions",
  description: "Bitmovin and Amazon IVS Demo",
};

const ITEMS = [
    {
        id: '1',
        start_time: 'start',
        end_time: 'end',
        error: 'error',
        details: 'details'
    },
    {
        id: '2',
        start_time: 'start2',
        end_time: 'end2',
        error: 'error2',
        details: 'details2'
    }
];

export default function Sessions() {
  
  return <List
    title={<Title>{'Sessions'}</Title>}
    route={'sessions'}
    items={ITEMS}
    columns={['id', 'start_time', 'end_time', 'error', 'details']}
    id={'id'} 
  />
}