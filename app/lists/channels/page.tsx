import { List } from "@/components/List";

export const metadata = {
  title: "Channels",
  description: "Bitmovin and Amazon IVS Demo",
};

const ITEMS = [
  { id: '1', name: 'Channel 1' },
  { id: '2', name: 'Channel 2' },
  { id: '3', name: 'Channel 3' },
  { id: '4', name: 'Channel 4' },
  { id: '5', name: 'Channel 5' },
  { id: '6', name: 'Channel 6' },
  { id: '7', name: 'Channel 7' },
  { id: '8', name: 'Channel 8' },
  { id: '9', name: 'Channel 9' },
  { id: '10', name: 'Channel 10' },
  { id: '11', name: 'Channel 11' },
  { id: '12', name: 'Channel 12' },
  { id: '13', name: 'Channel 13' },
  { id: '14', name: 'Channel 14' },
  { id: '15', name: 'Channel 15' },
  { id: '16', name: 'Channel 16' },
  { id: '17', name: 'Channel 17' },
  { id: '18', name: 'Channel 18' },
  { id: '19', name: 'Channel 19' },
  { id: '20', name: 'Channel 20' },
];

export default function Page() {
  return (<List items={ITEMS} variant="embedded" />);
};