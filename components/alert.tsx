import "server-only";

import ClientAlert from "./client/Alert";
import Button from "./client/Button";
import Header from "./client/Header";

export function Alert(props: { error: Error }) {
	return (
		<ClientAlert
			type="error"
			header={<Header>{props.error.name}</Header>}
			action={<Button>Retry</Button>}
		>
			<p>{props.error.message}</p>
		</ClientAlert>
	);
}
