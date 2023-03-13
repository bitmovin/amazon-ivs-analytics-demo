"use client";

import * as Base from "@cloudscape-design/components/container";

export function Container(props: Base.ContainerProps) {
  return (<Base.default {...props}>{props.children}</ Base.default>);
}
