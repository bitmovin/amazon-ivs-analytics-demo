"use client";

import React from "react";
import Container, {
	ContainerProps,
} from "@cloudscape-design/components/container";

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function ClientContainer(props: ContainerProps) {
	return <Container {...props} />;
}
