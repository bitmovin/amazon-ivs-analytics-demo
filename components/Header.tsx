"use client";

import dynamic from "next/dynamic";

export const Header = dynamic(() => import('./client/Header'),{
    loading: () => <div>Loading</div>
});