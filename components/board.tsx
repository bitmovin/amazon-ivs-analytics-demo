import "server-only";

import ClientBoard from "@/components/client/Board";
import Spinner from "@/components/client/Spinner";
import { BoardItemElement } from "./board-item";

export type BoardProps = {
  children: BoardItemElement[];
};

export type BoardElement = CustomElement<BoardProps>;

export default function Board(props: BoardProps): BoardElement {
  return (
    <ClientBoard
      empty={<Spinner />}
      items={props.children.map((item) => ({
        ...item.props,
        data: item,
      }))}
    />
  );
}
