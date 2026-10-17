import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { importedModel } from "../imported-model.ts";
import { revisions as r } from "../revisions-model.ts";

export function sourcePosition([x, y, z]) {
  return new THREE.Vector3(
    x - importedModel.sourceOrigin[0],
    z - importedModel.sourceOrigin[2],
    importedModel.sourceOrigin[1] - y,
  );
}

export function createFurnishings(parent) {
  const group = new THREE.Group();
  group.name = "Confirmed furnishings and island fittings";
  parent.add(group);
  const clothCanvas = document.createElement("canvas");
  clothCanvas.width = clothCanvas.height = 64;
  const ctx = clothCanvas.getContext("2d");
  ctx.fillStyle = "#b9b3a6";
  ctx.fillRect(0, 0, 64, 64);
  for (let i = 0; i < 64; i += 2) {
    ctx.fillStyle = i % 4 ? "#a7a195" : "#cdc8bb";
    ctx.fillRect(i, 0, 1, 64);
    ctx.fillRect(0, i, 64, 1);
  }
  const weave = new THREE.CanvasTexture(clothCanvas);
  weave.wrapS = weave.wrapT = THREE.RepeatWrapping;
  weave.repeat.set(28, 28);
  const beige = new THREE.MeshStandardMaterial({
    color: 0xcac0ac,
    roughness: .95,
    bumpMap: weave,
    bumpScale: .001,
  });
  const grey = new THREE.MeshStandardMaterial({
    color: 0x84878a,
    roughness: .9,
    bumpMap: weave,
    bumpScale: .001,
  });
  const black = new THREE.MeshStandardMaterial({
    color: 0x181b1e,
    roughness: .4,
    metalness: .4,
  });
  const chrome = new THREE.MeshStandardMaterial({
    color: 0xc9cfd0,
    metalness: 1,
    roughness: .2,
  });
  const white = new THREE.MeshStandardMaterial({
    color: 0xf3f0e8,
    roughness: .3,
  });
  const tabletop = new THREE.MeshStandardMaterial({
    color: 0xc6bda8,
    roughness: .4,
  });
  function box(p, size, pos, mat, radius = .025) {
    const mesh = new THREE.Mesh(
      new RoundedBoxGeometry(
        ...size,
        2,
        Math.min(radius, ...size.map((v) => v / 3)),
      ),
      mat,
    );
    mesh.position.set(...pos);
    mesh.castShadow = mesh.receiveShadow = true;
    p.add(mesh);
    return mesh;
  }
  function cylinder(p, radius, height, pos, mat) {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, height, 16),
      mat,
    );
    mesh.position.set(...pos);
    mesh.castShadow = true;
    p.add(mesh);
    return mesh;
  }
  function placed(name, position, rotation = 0) {
    const p = new THREE.Group();
    p.name = name;
    p.position.copy(sourcePosition(position));
    p.rotation.y = rotation;
    group.add(p);
    return p;
  }
  function module(p, [w, d, h], x, arm = false) {
    box(p, [w, .24, d], [x, .20, 0], beige, .07);
    box(
      p,
      [w - (arm ? .18 : .02), .20, d - .23],
      [x + (arm ? .08 : 0), .43, .08],
      beige,
      .07,
    );
    box(p, [w, .49, .22], [x, h - .245, -d / 2 + .11], beige, .06);
    if (arm) box(p, [.18, .55, d], [x - w / 2 + .09, .47, 0], beige, .06);
    for (const dx of [-w / 2 + .09, w / 2 - .09]) {
      for (const dz of [-d / 2 + .09, d / 2 - .09]) {
        cylinder(p, .022, .08, [x + dx, .04, dz], black);
      }
    }
    box(
      p,
      [w - (arm ? .22 : .06), .40, .12],
      [x + (arm ? .09 : 0), h - .24, -d / 2 + .26],
      beige,
      .05,
    ).rotation.x = -.12;
  }
  const sofa = placed(
    "Madelline beige modular sofa - no end table",
    r.sofa.centre,
    Math.PI / 2,
  );
  module(sofa, r.sofa.leftArm, -.43, true);
  module(sofa, r.sofa.armless, .54);
  const [ow, od, oh] = r.sofa.ottoman;
  box(sofa, [ow, oh - .08, od], [-.43, oh / 2 + .04, 1.035], beige, .06);
  const coffee = placed(
    "Madelline natural beige coffee table 105 x 90 x 43.5 cm",
    r.sofa.coffeeCentre,
    Math.PI / 2,
  );
  box(coffee, [1.05, .385, .90], [0, .1925, 0], tabletop, .035);
  box(coffee, [1.05, .05, .90], [0, .410, 0], tabletop, .04);
  const panel = placed(
    "Beige sofa in front of blue marble / wood panel",
    r.panelSofa.centre,
  );
  const [pw, pd, ph] = r.panelSofa.size;
  box(panel, [pw, .27, pd], [0, .19, 0], beige, .08);
  for (const x of [-pw / 2 + .13, pw / 2 - .13]) {
    box(panel, [.26, .59, pd], [x, .38, 0], beige, .08);
  }
  box(panel, [pw - .35, .53, .22], [0, ph - .265, -pd / 2 + .11], beige, .07);
  for (const x of [-.60, .60]) {
    box(panel, [1.18, .19, pd - .22], [x, .435, .09], beige, .06);
  }
  for (let i = 0; i < 4; i++) {
    const pillow = box(
      panel,
      [.43, .43, .12],
      [-.92 + i * .61, .67, -.18],
      i % 2
        ? beige
        : new THREE.MeshStandardMaterial({ color: 0xc4b5af, roughness: 1 }),
      .055,
    );
    pillow.rotation.z = i % 2 ? .12 : -.12;
    pillow.rotation.x = -.2;
  }
  const piano = placed(
    "Digital piano beside stair panel",
    r.piano.centre,
    Math.PI / 2,
  );
  box(piano, [1.35, .60, .16], [0, .36, -.13], black, .015);
  box(piano, [1.35, .09, .48], [0, .715, 0], black, .018);
  box(piano, [1.35, .06, .12], [0, .81, -.15], black, .01);
  for (const x of [-.61, .61]) {
    box(piano, [.065, .68, .36], [x, .34, 0], black, .005);
  }
  for (let i = 0; i < 52; i++) {
    box(
      piano,
      [1.23 / 52 - .001, .015, .17],
      [-.615 + (i + .5) * 1.23 / 52, .766, .125],
      white,
      .002,
    );
  }
  for (let i = 0; i < 51; i++) {
    if (![2, 6].includes(i % 7)) {
      box(
        piano,
        [.013, .020, .105],
        [-.615 + (i + 1) * 1.23 / 52, .779, .093],
        black,
        .002,
      );
    }
  }
  box(piano, [.44, .27, .025], [0, .94, -.10], black, .008).rotation.x = -.2;
  const bench = placed("Digital piano bench", [6.00, 14.03, .6], Math.PI / 2);
  box(bench, [.6, .08, .32], [0, .47, 0], black, .02);
  for (const x of [-.25, .25]) {
    for (const z of [-.12, .12]) {
      box(bench, [.035, .43, .035], [x, .215, z], black, .002);
    }
  }
  function chair(position, seatHeight, rotation, name) {
    const p = placed(name, position, rotation);
    box(p, [.46, .09, .46], [0, seatHeight, 0], grey, .045);
    box(p, [.46, .36, .07], [0, seatHeight + .18, -.205], grey, .035).rotation
      .x = -.1;
    for (const x of [-.17, .17]) {
      for (const z of [-.17, .17]) {
        box(
          p,
          [.025, seatHeight - .06, .025],
          [x, (seatHeight - .06) / 2, z],
          black,
          .003,
        );
      }
    }
    if (seatHeight > .5) box(p, [.38, .02, .02], [0, .26, .16], black, .003);
  }
  r.islandChairs.ys.forEach((y, i) =>
    chair(
      [r.islandChairs.xs, y, r.islandChairs.floor],
      r.islandChairs.seat,
      Math.PI / 2,
      `Island chair ${i + 1}`,
    )
  );
  r.diningChairs.ys.forEach((y, side) =>
    r.diningChairs.xs.forEach((x, i) =>
      chair(
        [x, y, r.diningChairs.floor],
        r.diningChairs.seat,
        side ? 0 : Math.PI,
        `Grey dining chair ${side * 3 + i + 1}`,
      )
    )
  );
  function tap(position, height, radius, name) {
    const p = placed(name, position);
    cylinder(p, .024, .075, [0, .0375, 0], chrome);
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, .04, 0),
      new THREE.Vector3(0, height - .10, 0),
      new THREE.Vector3(.025, height, 0),
      new THREE.Vector3(.105, height + .025, 0),
      new THREE.Vector3(.16, height - .04, 0),
    ]);
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 32, radius, 12, false),
      chrome,
    );
    p.add(tube);
    tube.castShadow = true;
    cylinder(p, .028, .010, [0, .005, 0], chrome);
    cylinder(p, .016, .085, [0, .05, .034], chrome).rotation.x = Math.PI / 2;
    cylinder(p, .004, .067, [0, .10, .075], chrome);
  }
  tap(r.taps.main, .31, .014, "Modena KT 1915 SPCR main kitchen tap");
  tap(r.taps.drinking, .255, .009, "Separate drinking-water tap on right");
  const soap = placed("Built-in stainless soap dispenser", r.taps.soap);
  cylinder(soap, .021, .070, [0, .035, 0], chrome);
  cylinder(soap, .028, .008, [0, .004, 0], chrome);
  box(soap, [.125, .016, .025], [.05, .076, 0], chrome, .006);
  return { group };
}
