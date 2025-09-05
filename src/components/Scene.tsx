import { Entity } from "@playcanvas/react";
import {
  Collision,
  Light,
  Render,
  RigidBody,
  Script,
} from "@playcanvas/react/components";
import { useMaterial } from "@playcanvas/react/hooks";
import { ResizeCollision } from "../scripts/ResizeCollision";
import { Player } from "./Player";

export function Scene() {
  const groundMaterial = useMaterial({ diffuse: "#5a5f61" });

  return (
    <>
      <Entity
        name="DirectionalLight"
        position={[10, 20, 10]}
        rotation={[-45, 45, 0]}
      >
        <Light type="directional" castShadows shadowDistance={200} />
      </Entity>

      {/* Ground: collider on unscaled parent; visual scaled as child */}
      <Entity name="Ground" position={[0, -0.5, 0]}>
        {/* Ensure collider is correctly sized at runtime */}
        <Collision type="box" />
        <Script script={ResizeCollision} hx={5} hy={0.5} hz={5} />
        <RigidBody type="static" />
        <Entity name="Plane" scale={[10, 1, 10]}>
          <Render type="box" material={groundMaterial} />
        </Entity>
      </Entity>

      <Player />

      {/* Camera - looks 45 degrees down from the side */}
      {/* <Entity name="Camera" position={[10, 12.5, 10]} rotation={[-45, 45, 0]}>
        <Camera />
      </Entity> */}
    </>
  );
}
