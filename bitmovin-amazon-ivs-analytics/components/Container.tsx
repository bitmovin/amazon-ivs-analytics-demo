"use client";

import BaseContainer from "@cloudscape-design/components/container";

export function Container(props: {children: JSX.Element[] | JSX.Element}) {
  return (<BaseContainer>{props.children}</BaseContainer>);
}
