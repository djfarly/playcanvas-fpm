import { FirstPersonController } from "@/scripts/FirstPersonController.mjs";
import { Entity } from "@playcanvas/react";
import {
  Camera,
  Collision,
  Render,
  RigidBody,
  Script,
} from "@playcanvas/react/components";
import { useMaterial } from "@playcanvas/react/hooks";

// this.entity.addComponent("collision", {
//   type: "capsule",
//   radius: 0.5,
//   height: 2,
// });
// this.entity.addComponent("rigidbody", {
//   type: "dynamic",
//   mass: 100,
//   linearDamping: 0,
//   angularDamping: 0,
//   linearFactor: Vec3.ONE,
//   angularFactor: Vec3.ZERO,
//   friction: 0.5,
//   restitution: 0,
// });

export function Player() {
  const playerMaterial = useMaterial({ diffuse: "#ff0000" });
  return (
    <Entity name="Player" position={[0, 2, 0]}>
      <Collision type="capsule" radius={0.5} height={2} />
      <RigidBody
        type="dynamic"
        mass={100}
        linearDamping={0}
        angularDamping={0}
        linearFactor={[1, 1, 1]}
        angularFactor={[0, 0, 0]}
        friction={0.5}
        restitution={0}
      />
      <Camera />
      <Entity name="PlayerVisual" scale={[1, 1, 1]}>
        <Render type="capsule" material={playerMaterial} />
      </Entity>
      <Script script={FirstPersonController} />
    </Entity>
  );
}
