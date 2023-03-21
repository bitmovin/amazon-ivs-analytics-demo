"use client";

import AppLayout, {
	AppLayoutProps,
} from "@cloudscape-design/components/app-layout";
import React, { useState } from "react";

if (typeof window === "undefined") {
	React.useLayoutEffect = React.useEffect;
}

export default function ClientTopNavigation(props: AppLayoutProps) {
	const [navigationOpen, setNavigationOpen] = useState(false);
	const [toolsOpen, setToolsOpen] = useState(false);
	return (
		<AppLayout
			navigationOpen={navigationOpen}
			onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
			toolsOpen={toolsOpen}
			onToolsChange={({ detail }) => setToolsOpen(detail.open)}
			{...props}
		/>
	);
}
