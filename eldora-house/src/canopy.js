import * as THREE from "three";
import { canopyModel as c, houseModel as h } from "../house-model.ts";
import { revisions } from "../revisions-model.ts";
export function createCanopy(parent) {
  const group = new THREE.Group(), roof = new THREE.Group();
  const [left, back, right, front] = revisions.canopy.roofBounds;
  const coverWidth = right - left, coverDepth = front - back;
  const centreX = (left + right) / 2, centreZ = (back + front) / 2;
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
    coverWidth,
    .025,
    coverDepth,
    centreX - h.gardenOffsetX,
    c.ceilingHeight + .015,
    centreZ,
    walnut,
  );
  for (let x = .2; x < 10; x += .2) {
    box(
      roof,
      .002,
      .001,
      coverDepth,
      x - h.gardenOffsetX,
      c.ceilingHeight + .001,
      centreZ,
      steel,
    );
  }
  // Twin-wall roof with two skins and longitudinal profile ribs (illustrative).
  for (const y of [c.ceilingHeight + .07, c.ceilingHeight + .07 + c.roofGap]) {
    box(
      roof,
      coverWidth,
      .008,
      coverDepth,
      centreX - h.gardenOffsetX,
      y,
      centreZ,
      alderon,
    );
  }
  for (let x = .08; x < 10; x += .16) {
    box(
      roof,
      .016,
      c.roofGap,
      coverDepth,
      x - h.gardenOffsetX,
      c.ceilingHeight + .07 + c.roofGap / 2,
      centreZ,
      alderon,
    );
  }
  // Dry rough granite, 600 mm square modules across the whole floor footprint.
  const tileCanvas = document.createElement("canvas");
  tileCanvas.width = tileCanvas.height = 256;
  const tc = tileCanvas.getContext("2d");
  const pixels = tc.createImageData(256, 256);
  let seed = 9361;
  for (let i = 0; i < pixels.data.length; i += 4) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const grain = (seed / 4294967296 - .5) * 22;
    pixels.data[i] = 57 + grain;
    pixels.data[i + 1] = 60 + grain;
    pixels.data[i + 2] = 62 + grain;
    pixels.data[i + 3] = 255;
  }
  tc.putImageData(pixels, 0, 0);
  tc.fillStyle = "#343739";
  tc.fillRect(0, 0, 2, 256);
  tc.fillRect(0, 0, 256, 2);
  const graniteTexture = new THREE.CanvasTexture(tileCanvas);
  graniteTexture.colorSpace = THREE.SRGBColorSpace;
  graniteTexture.wrapS = graniteTexture.wrapT = THREE.RepeatWrapping;
  graniteTexture.repeat.set(
    coverWidth / revisions.canopy.tileSize,
    coverDepth / revisions.canopy.tileSize,
  );
  const granite = new THREE.MeshStandardMaterial({
    map: graniteTexture,
    bumpMap: graniteTexture,
    bumpScale: .003,
    roughness: 1,
  });
  const garageFloor = box(
    group,
    coverWidth,
    .10,
    coverDepth,
    centreX - h.gardenOffsetX,
    -.05,
    centreZ,
    granite,
  );
  garageFloor.name = "Dark grey rough granite garage floor / 60 x 60 cm";
  garageFloor.castShadow = false;
  const joints = [];
  for (
    let x = left + revisions.canopy.tileSize;
    x < right;
    x += revisions.canopy.tileSize
  ) {
    joints.push(
      new THREE.Vector3(x - h.gardenOffsetX, .003, back),
      new THREE.Vector3(x - h.gardenOffsetX, .003, front),
    );
  }
  for (
    let z = back + revisions.canopy.tileSize;
    z < front;
    z += revisions.canopy.tileSize
  ) {
    joints.push(
      new THREE.Vector3(left - h.gardenOffsetX, .003, z),
      new THREE.Vector3(right - h.gardenOffsetX, .003, z),
    );
  }
  group.add(
    new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints(joints),
      new THREE.LineBasicMaterial({
        color: 0x34383a,
        transparent: true,
        opacity: .65,
      }),
    ),
  );
  // Continuous front gutter with two outlet collars and Japanese cup rain chains.
  const gd = revisions.canopy.gutterDepth, gw = revisions.canopy.gutterWidth;
  const gutterTop = c.ceilingHeight + .11, gutterBottom = gutterTop - gd;
  box(
    roof,
    coverWidth,
    .008,
    gw,
    centreX - h.gardenOffsetX,
    gutterBottom,
    front - gw / 2,
    steel,
  );
  for (const z of [front - gw, front]) {
    box(
      roof,
      coverWidth,
      gd,
      .008,
      centreX - h.gardenOffsetX,
      gutterBottom + gd / 2,
      z,
      steel,
    );
  }
  const bronze = new THREE.MeshStandardMaterial({
    color: 0x8b6a40,
    metalness: .85,
    roughness: .35,
    side: THREE.DoubleSide,
  });
  for (const [i, x] of revisions.canopy.outlets.entries()) {
    const chain = new THREE.Group();
    chain.name = `Japanese rain chain / front outlet ${i + 1}`;
    chain.position.set(x - h.gardenOffsetX, 0, front - gw / 2);
    roof.add(chain);
    const collar = new THREE.Mesh(
      new THREE.CylinderGeometry(.031, .031, .045, 18, true),
      steel,
    );
    collar.position.y = gutterBottom - .01;
    chain.add(collar);
    for (let j = 0; j < 23; j++) {
      const y = gutterBottom - .10 - j * .12;
      const cup = new THREE.Mesh(
        new THREE.CylinderGeometry(.047, .016, .055, 18, 1, true),
        bronze,
      );
      cup.position.y = y;
      chain.add(cup);
      const rim = new THREE.Mesh(
        new THREE.TorusGeometry(.047, .0025, 6, 18),
        bronze,
      );
      rim.rotation.x = Math.PI / 2;
      rim.position.y = y + .0275;
      chain.add(rim);
      const link = new THREE.Mesh(
        new THREE.TorusGeometry(.024, .0025, 6, 12),
        bronze,
      );
      link.position.y = y - .047;
      link.rotation.y = j % 2 ? Math.PI / 2 : 0;
      chain.add(link);
    }
    const drain = new THREE.Mesh(
      new THREE.CylinderGeometry(.055, .055, .012, 24),
      steel,
    );
    drain.position.set(x - h.gardenOffsetX, .003, front - gw / 2);
    group.add(drain);
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
