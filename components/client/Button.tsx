"use client";

import type { ButtonProps } from "@cloudscape-design/components/button";
import { Route } from "next";
import { useSelectedLayoutSegments } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { Suspense, lazy } from "react";

const Button = lazy(() => import("@cloudscape-design/components/button"));

if (typeof window === "undefined") {
  React.useLayoutEffect = () => ({});
}

export default function ClientButton(props: ButtonProps & { href?: Route }) {
  const router = useRouter();
  const path = useSelectedLayoutSegments();

  return (
    <Suspense fallback={<button type="button">{props.children}</button>}>
      <Button
        onFollow={(event) => {
          if (props.href) {
            event.preventDefault();
            router.push(props.href);
          }
        }}
        {...props}
      />
    </Suspense>
  );
}
