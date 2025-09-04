import { Application } from "@playcanvas/react";
import { FILLMODE_FILL_WINDOW, RESOLUTION_AUTO } from "playcanvas";
import { Scene } from "./Scene";

export function PlayCanvasApplication() {
  return (
    <Application
      fillMode={FILLMODE_FILL_WINDOW}
      resolutionMode={RESOLUTION_AUTO}
      graphicsDeviceOptions={{ antialias: false }}
      usePhysics
    >
      <Scene />
    </Application>
  );
}
