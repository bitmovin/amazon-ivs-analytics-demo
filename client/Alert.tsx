"use client";

import React from "react";
import Alert, { AlertProps } from "@cloudscape-design/components/alert";

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function ClientAlert(props: AlertProps) {
	return <Alert {...props} />;
}
