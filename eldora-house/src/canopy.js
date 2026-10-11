import * as THREE from "three";
import { canopyModel as c, houseModel as h } from "../house-model.ts";
export function createCanopy(parent) {
  const group = new THREE.Group(), roof = new THREE.Group();
  parent.add(group);
  group.add(roof);
  const steel = new THREE.MeshStandardMaterial({
    color: 0x272c30,
    roughness: .65,
    metalness: .65,
  });
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#70503c";
  ctx.fillRect(0, 0, 128, 512);
  for (let i = 0; i < 160; i++) {
    ctx.strokeStyle = i % 3 ? "#634733" : "#83604a";
    ctx.beginPath();
    ctx.moveTo(i * 17 % 128, 0);
    ctx.bezierCurveTo(
      i * 17 % 128 + 4,
      180,
      i * 17 % 128 - 4,
      300,
      i * 17 % 128,
      512,
    );
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 5);
  const walnut = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: .85,
  });
  const alderon = new THREE.MeshStandardMaterial({
    color: c.roofColour,
    roughness: .7,
  });
  function box(p, w, y, d, x, cy, z, m) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, y, d), m);
    mesh.position.set(x, cy, z);
    mesh.castShadow = mesh.receiveShadow = true;
    p.add(mesh);
    return mesh;
  }
  function beam(length, x, y, z, rotation = 0) {
    const b = new THREE.Group();
    for (const side of [-1, 1]) {
      box(
        b,
        length,
        c.flangeThickness,
        c.steelWidth,
        0,
        side * (c.steelDepth - c.flangeThickness) / 2,
        0,
        steel,
      );
    }
    box(
      b,
      length,
      c.steelDepth - 2 * c.flangeThickness,
      c.webThickness,
      0,
      0,
      0,
      steel,
    );
    b.rotation.y = rotation;
    b.position.set(x - h.gardenOffsetX, y, z);
    group.add(b);
    return b;
  }
  for (const z of c.beamRows) beam(10, 5, c.ceilingHeight - .1, z);
  for (const x of [.12, 9.88]) {
    beam(5, x, c.ceilingHeight - .1, 17.5, Math.PI / 2);
  }
  for (const [x, z] of c.columns) {
    const b = beam(c.ceilingHeight - .2, x, (c.ceilingHeight - .2) / 2, z);
    b.rotation.z = Math.PI / 2;
  }
  // Walnut PVC soffit with board seams, supported by visible WF200 I profiles.
  box(
    roof,
    10,
    .025,
    5,
    5 - h.gardenOffsetX,
    c.ceilingHeight + .015,
    17.5,
    walnut,
  );
  for (let x = .2; x < 10; x += .2) {
    box(
      roof,
      .002,
      .001,
      5,
      x - h.gardenOffsetX,
      c.ceilingHeight + .001,
      17.5,
      steel,
    );
  }
  // Twin-wall roof with two skins and longitudinal profile ribs (illustrative).
  for (const y of [c.ceilingHeight + .07, c.ceilingHeight + .07 + c.roofGap]) {
    box(roof, 10, .008, 5, 5 - h.gardenOffsetX, y, 17.5, alderon);
  }
  for (let x = .08; x < 10; x += .16) {
    box(
      roof,
      .016,
      c.roofGap,
      5,
      x - h.gardenOffsetX,
      c.ceilingHeight + .07 + c.roofGap / 2,
      17.5,
      alderon,
    );
  }
  const lens = new THREE.MeshStandardMaterial({
    color: 0xffead0,
    emissive: 0xffd0a0,
    emissiveIntensity: 0,
  });
  const lights = [];
  c.downlights.forEach(([x, z], i) => {
    const trim = new THREE.Mesh(
      new THREE.RingGeometry(c.lightRadius, c.lightRadius + .012, 24),
      steel,
    );
    trim.rotation.x = Math.PI / 2;
    trim.position.set(x - h.gardenOffsetX, c.ceilingHeight - .003, z);
    roof.add(trim);
    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(c.lightRadius, 24),
      lens,
    );
    disc.rotation.x = Math.PI / 2;
    disc.position.set(x - h.gardenOffsetX, c.ceilingHeight - .005, z);
    roof.add(disc);
    disc.name = `GL0${i + 1} · Garage downlight`;
    const light = new THREE.SpotLight(0xffd3a8, 8, 5, Math.PI / 3, .7, 2);
    light.position.copy(disc.position);
    light.target.position.set(x - h.gardenOffsetX, 0, z);
    group.add(light, light.target);
    lights.push(light);
  });
  return {
    group,
    roof,
    setNight(night) {
      lens.emissiveIntensity = night ? .4 : 0;
      for (const l of lights) l.visible = night;
    },
  };
}
