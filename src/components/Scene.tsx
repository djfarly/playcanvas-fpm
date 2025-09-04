import { Entity } from "@playcanvas/react";
import {
  Collision,
  Render,
  RigidBody,
  Script,
  Light,
} from "@playcanvas/react/components";
import { useMaterial } from "@playcanvas/react/hooks";
import { Vec3 } from "playcanvas";
import { FirstPersonMovement } from "../scripts/FirstPersonMovement";

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

      {/* Ground collider + visual decoupled to avoid scaling physics issues */}
      <Entity name="Ground" position={[0, -0.5, 0]} rotation={[0, 0, 0]}>
        <Collision type="box" halfExtents={new Vec3(10, 0.5, 10)} />
        <RigidBody type="static" friction={0.5} restitution={0.5} />
        <Entity name="GroundVisual" scale={[10, 1, 10]}>
          <Render type="plane" material={groundMaterial} />
        </Entity>
      </Entity>

      {/* Player capsule */}
      <Entity name="Player" position={[0, 1, 0]}>
        <Script
          script={FirstPersonMovement}
          power={2500}
          jumpPower={10}
          lookSpeed={0.25}
        />
        <Collision type="capsule" radius={0.5} height={2} axis={1} />
        <RigidBody
          type="dynamic"
          mass={100}
          linearDamping={0.99}
          angularFactor={[0, 0, 0]}
          friction={0.75}
          restitution={0.5}
        />
      </Entity>
    </>
  );
}
