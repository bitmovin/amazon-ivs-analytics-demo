"use client";

import TopNavigation, {
	TopNavigationProps,
} from "@cloudscape-design/components/top-navigation";
import React from "react";

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function ClientTopNavigation(props: TopNavigationProps) {
	return <TopNavigation {...props} />;
}
