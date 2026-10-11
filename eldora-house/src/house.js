import * as THREE from "three";
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import {
  houseModel as h,
  houseWalls,
  lightwells,
  rooms,
} from "../house-model.ts";
export function createHouse(world) {
  const group = new THREE.Group(),
    walls = new THREE.Group(),
    names = new THREE.Group();
  const glazing = new THREE.Group();
  world.add(group);
  group.add(glazing);
  group.add(walls, names);
  const wall = new THREE.MeshStandardMaterial({
    color: h.interiorColour,
    roughness: .95,
  });
  const floor = new THREE.MeshStandardMaterial({
    color: 0xd5d1c7,
    roughness: .85,
  });
  const outside = new THREE.MeshStandardMaterial({
    color: 0x9c9d96,
    roughness: 1,
  });
  const wood = new THREE.MeshStandardMaterial({
    color: 0x70533e,
    roughness: .8,
  });
  const frame = new THREE.MeshStandardMaterial({
    color: 0x404b49,
    roughness: .7,
  });
  const glass = new THREE.MeshStandardMaterial({
    color: 0xa6c8cf,
    transparent: true,
    opacity: .3,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  function box(parent, w, y, d, x, cy, z, mat) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, y, d), mat);
    mesh.position.set(x - h.gardenOffsetX, cy, z);
    mesh.castShadow = mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function segment(
    parent,
    a,
    b,
    bottom,
    top,
    mat,
    thickness = h.thickness,
    join = true,
  ) {
    if (top <= bottom) return;
    const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const mesh = box(
      parent,
      length + (join ? thickness : 0),
      top - bottom,
      thickness,
      (a[0] + b[0]) / 2,
      (top + bottom) / 2,
      (a[1] + b[1]) / 2,
      mat,
    );
    mesh.rotation.y = -Math.atan2(b[1] - a[1], b[0] - a[0]);
    return mesh;
  }
  for (const room of rooms) {
    if (room.id.startsWith("G")) continue;
    const [x, z, x2, z2] = room.bounds;
    box(
      group,
      x2 - x,
      .08,
      z2 - z,
      (x + x2) / 2,
      -.05,
      (z + z2) / 2,
      room.id === "P01" || room.id === "T01" ? outside : floor,
    );
  }
  for (const w of houseWalls) {
    const length = Math.hypot(w.b[0] - w.a[0], w.b[1] - w.a[1]);
    const point = (t) => [
      w.a[0] + (w.b[0] - w.a[0]) * t / length,
      w.a[1] + (w.b[1] - w.a[1]) * t / length,
    ];
    let cursor = 0;
    for (const o of w.openings) {
      segment(walls, point(cursor), point(o.at), 0, h.wallHeight, wall);
      const a = point(o.at), b = point(o.at + o.width);
      const bottom = o.kind === "window" ? .9 : 0;
      const top = o.kind === "gate" ? 2 : 2.2;
      segment(walls, a, b, 0, bottom, wall);
      segment(walls, a, b, top, h.wallHeight, wall);
      if (o.kind === "window" || o.kind === "sliding") {
        segment(glazing, a, b, bottom + .04, top - .04, glass, .016, false);
        segment(glazing, a, b, bottom, bottom + .04, frame, .06, false);
        segment(glazing, a, b, top - .04, top, frame, .06, false);
        const n = o.kind === "sliding" ? 4 : 2;
        for (let i = 0; i <= n; i++) {
          const p = point(o.at + o.width * i / n);
          box(
            glazing,
            .045,
            top - bottom,
            .045,
            p[0],
            (top + bottom) / 2,
            p[1],
            frame,
          );
        }
      } else if (o.kind === "door") {
        const leaf = segment(walls, a, b, .02, 2.17, wood, .035, false);
        leaf.rotation.y += Math.PI / 5;
      } else if (o.kind === "gate") {
        segment(walls, a, b, .1, 1.8, frame, .035, false);
      }
      cursor = o.at + o.width;
    }
    segment(walls, point(cursor), w.b, 0, h.wallHeight, wall);
  }
  // Stair diagram follows the plan's two left-side runs; rise is illustrative.
  for (let i = 0; i < 12; i++) {
    box(group, 1, .08, .25, 2.625, .08 + i * .16, 4.25 + i * .25, floor);
  }
  for (let i = 0; i < 10; i++) {
    box(group, .85, .08, .23, .65, .08 + i * .16, 11.2 + i * .23, floor);
  }
  for (const well of lightwells) {
    const [x, z, x2, z2] = well.bounds;
    box(group, x2 - x, .015, z2 - z, (x + x2) / 2, .006, (z + z2) / 2, outside);
  }
  for (const room of rooms) {
    const [x, z, x2, z2] = room.bounds;
    const el = document.createElement("span");
    el.className = "room-label";
    el.textContent = `${room.id} · ${room.name}`;
    const label = new CSS2DObject(el);
    label.position.set((x + x2) / 2 - h.gardenOffsetX, .18, (z + z2) / 2);
    names.add(label);
  }
  return { group, walls, names, glazing };
}
