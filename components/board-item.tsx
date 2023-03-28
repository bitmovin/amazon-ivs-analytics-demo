import "server-only";

import ClientBoardItem from "@/components/client/BoardItem";
import { BoardItemDefinition } from "@cloudscape-design/board-components/internal/interfaces";

export type Size = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type BoardItemProps = {
	children: JSX.Element;
	id: string;
	header?: JSX.Element;
	footer?: JSX.Element;
} & Omit<BoardItemDefinition, "data">;

export type BoardItemElement = CustomElement<BoardItemProps>;

export default function BoardItem(props: BoardItemProps): BoardItemElement {
	return (
		<ClientBoardItem
			{...props}
			i18nStrings={{
				dragHandleAriaLabel: "",
				dragHandleAriaDescription: "",
				resizeHandleAriaLabel: "",
			}}
		/>
	);
}
