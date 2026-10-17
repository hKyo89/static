import * as THREE from "three";
import { createWetKitchenExhaust } from "../eldora-house/src/wet-kitchen-exhaust.js";
import { revisions } from "../eldora-house/revisions-model.ts";
import { importedModel } from "../eldora-house/imported-model.ts";

Deno.test("house exhaust hood and riser clear the authoritative native walls", () => {
  const world = new THREE.Group();
  const exhaust = createWetKitchenExhaust(world);
  world.updateWorldMatrix(true, true);
  const route = revisions.wetKitchenExhaust;
  for (
    const name of ["straight-4a", "straight-4b", "straight-4c", "straight-4d"]
  ) {
    const part = exhaust.group.getObjectByName(`SYS:${name}`);
    if (!part) throw new Error("Missing shaft duct");
    const box = new THREE.Box3().setFromObject(part);
    const minX = box.min.x + importedModel.sourceOrigin[0],
      maxX = box.max.x + importedModel.sourceOrigin[0];
    const minY = importedModel.sourceOrigin[1] - box.max.z,
      maxY = importedModel.sourceOrigin[1] - box.min.z;
    const [left, front, right, back] = route.shaftBounds;
    if (minX < left || maxX > right || minY < front || maxY > back) {
      throw new Error(`${name} intersects a shaft wall`);
    }
  }
  const hood = exhaust.group.getObjectByName("Left-side-plate");
  if (!hood) throw new Error("Missing fabricated hood");
  const left = (route.roomX[0] + route.roomX[1] - route.hoodWidth) / 2;
  if (left < route.roomX[0] || left + route.hoodWidth > route.roomX[1]) {
    throw new Error("Hood intersects side wall");
  }
  exhaust.setState({
    visible: true,
    layers: { floor1: false, floor2: false, roof: false },
  });
  if (
    exhaust.group.children[0].children.some((node: { visible: boolean }) =>
      node.visible
    )
  ) {
    throw new Error("Exhaust ignores floor filters");
  }
});
