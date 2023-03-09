import React from "react";

import {
  applyMode,
  applyDensity,
  Density,
  Mode
} from "@cloudscape-design/global-styles";

export const  setupCloudScape = () => {
  if (typeof window === "undefined") {
    console.log(`
    CloudScape isn't fully capable of server-side rendering.
    The server had to disable useLayoutEffect manually.
    See more: https://github.com/cloudscape-design/components/pull/79
  `);
    
    React.useLayoutEffect = () => { };
  } else {
    applyMode(Mode.Dark);
    applyDensity(Density.Compact);
  }
}
