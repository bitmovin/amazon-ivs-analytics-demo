"use client";

import React from "react";
import {
	ContentLayout,
	ContentLayoutProps,
} from "@cloudscape-design/components";

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function ClientContentLayout(props: ContentLayoutProps) {
	return <ContentLayout {...props} />;
}
