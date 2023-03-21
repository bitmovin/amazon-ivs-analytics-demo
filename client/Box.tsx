"use client";

import Box, { BoxProps } from "@cloudscape-design/components/box";
import React from "react";

if (typeof window === "undefined") {
	React.useLayoutEffect = () => ({});
}

export default function ClientBox(props: BoxProps) {
	return <Box {...props} />;
}
