'use client';

import SideNavigation from "@cloudscape-design/components/side-navigation";

export const Navigation = () => 
    <SideNavigation
        header={{href: '/', text: "Bitmovin"}}
        items={[
            {text: "Sessions", href: "/sessions", type: "link"}
        ]}
    />;