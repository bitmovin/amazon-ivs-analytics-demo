"use client";

import Container, { ContainerProps } from "@cloudscape-design/components/container";

export default function(props: ContainerProps) {
  return (<Container {...props}>{props.children}</ Container>);
}
