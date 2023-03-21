"use client";

import Header, { HeaderProps } from "@cloudscape-design/components/header";
import React from "react";

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function ClientHeader(props: HeaderProps) {
	return <Header {...props} />;
}
