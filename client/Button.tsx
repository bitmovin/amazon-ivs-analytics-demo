"use client";

import Button, { ButtonProps } from "@cloudscape-design/components/button";
import React from "react";

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function ClientButton(props: ButtonProps) {
	return <Button {...props} />;
}
