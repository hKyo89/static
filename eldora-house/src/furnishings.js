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
  // Three rear seats and the perpendicular left return from the showroom photo.
  for (let i = 0; i < r.sofa.armlessCount; i++) {
    module(sofa, r.sofa.armless, (i - 1) * .86);
  }
  const returnSeat = new THREE.Group();
  returnSeat.position.set(-1.81, 0, .02);
  returnSeat.rotation.y = Math.PI / 2;
  sofa.add(returnSeat);
  module(returnSeat, r.sofa.leftArm, 0, true);
  const [ow, od, oh] = r.sofa.ottoman;
  box(sofa, [ow, oh - .08, od], [-1.81, oh / 2 + .04, 1.065], beige, .06);
  const oakCanvas = document.createElement("canvas");
  oakCanvas.width = 128;
  oakCanvas.height = 256;
  const oakCtx = oakCanvas.getContext("2d");
  oakCtx.fillStyle = "#b28b60";
  oakCtx.fillRect(0, 0, 128, 256);
  for (let i = 0; i < 100; i++) {
    oakCtx.strokeStyle = i % 3 ? "#aa8258" : "#c49e74";
    oakCtx.beginPath();
    oakCtx.moveTo(i * 13 % 128, 0);
    oakCtx.bezierCurveTo(
      i * 13 % 128 + 6,
      80,
      i * 13 % 128 - 4,
      170,
      i * 13 % 128,
      256,
    );
    oakCtx.stroke();
  }
  const oakMap = new THREE.CanvasTexture(oakCanvas);
  oakMap.colorSpace = THREE.SRGBColorSpace;
  const oak = new THREE.MeshStandardMaterial({ map: oakMap, roughness: .65 });
  const coffee = placed(
    "Madelline reversible two-top coffee table",
    r.sofa.coffeeCentre,
    Math.PI / 2,
  );
  box(coffee, [1.05, .385, .90], [0, .1925, 0], beige, .035);
  const tops = [];
  for (const x of [-.263, .263]) {
    const top = new THREE.Group();
    top.position.set(x, .410, 0);
    coffee.add(top);
    box(top, [.522, .025, .895], [0, .0125, 0], beige, .025);
    box(top, [.522, .025, .895], [0, -.0125, 0], oak, .012);
    tops.push(top);
  }
  function setCoffeeTops(mode) {
    tops.forEach((top, i) =>
      top.rotation.x = (mode === "wood" || mode === "mixed" && i === 0 ||
          mode === "mixed-reverse" && i === 1)
        ? Math.PI
        : 0
    );
  }
  setCoffeeTops("mixed");
  const panel = placed(
    "Taupe tufted sofa beside blue marble panel",
    r.panelSofa.centre,
  );
  const [pw, pd, ph] = r.panelSofa.size;
  const taupe = beige.clone();
  taupe.color.setHex(0xa79c88);
  const blush = beige.clone();
  blush.color.setHex(0xbaaaa4);
  box(panel, [pw, .28, pd], [0, .19, 0], taupe, .09);
  for (const x of [-pw / 2 + .14, pw / 2 - .14]) {
    box(panel, [.28, .58, pd], [x, .39, 0], taupe, .12);
  }
  for (let i = 0; i < 5; i++) {
    box(
      panel,
      [(pw - .50) / 5 - .008, .48, .21],
      [-(pw - .50) / 2 + (i + .5) * (pw - .50) / 5, ph - .24, -pd / 2 + .13],
      taupe,
      .05,
    );
  }
  for (const x of [-(pw - .56) / 4, (pw - .56) / 4]) {
    box(
      panel,
      [(pw - .56) / 2 - .006, .14, pd - .27],
      [x, .43, .05],
      taupe,
      .055,
    );
  }
  for (let i = 0; i < 4; i++) {
    for (let row = 0; row < 2; row++) {
      const w = (pw - .56) / 4;
      box(
        panel,
        [w - .004, .018, (pd - .27) / 2 - .004],
        [-(pw - .56) / 2 + (i + .5) * w, .505, -.12 + row * (pd - .27) / 2],
        taupe,
        .012,
      );
    }
  }
  for (let i = 0; i < 6; i++) {
    const pillow = box(
      panel,
      [.39, .39, .12],
      [-.94 + i * .37, i === 2 ? .53 : .65, i === 2 ? .14 : -.12],
      i % 2 ? taupe : blush,
      .06,
    );
    pillow.rotation.set(-.2, i === 2 ? .12 : 0, i % 2 ? .20 : -.25);
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
  function tap(position, height, radius, name, slim = false) {
    const p = placed(name, position);
    cylinder(p, slim ? .014 : .024, .075, [0, .0375, 0], chrome);
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
    cylinder(p, slim ? .019 : .028, .010, [0, .005, 0], chrome);
    cylinder(p, slim ? .010 : .016, slim ? .055 : .085, [
      0,
      .05,
      slim ? .026 : .034,
    ], chrome).rotation.x = Math.PI / 2;
    cylinder(p, slim ? .0025 : .004, .067, [0, .10, slim ? .05 : .075], chrome);
  }
  tap(r.taps.main, .31, .014, "Modena KT 1915 SPCR main kitchen tap");
  tap(
    r.taps.drinking,
    .255,
    .005,
    "Separate drinking-water tap on right",
    true,
  );
  const soap = placed("Built-in stainless soap dispenser", r.taps.soap);
  cylinder(soap, .021, .070, [0, .035, 0], chrome);
  cylinder(soap, .028, .008, [0, .004, 0], chrome);
  box(soap, [.125, .016, .025], [.05, .076, 0], chrome, .006);
  // Cabinet fronts face into the room (-source X); three bottle shelves each.
  const brands = [
    "MACALLAN 18",
    "HENNESSY XO",
    "BLUE LABEL",
    "DOM PERIGNON",
    "PENFOLDS",
    "MOET & CHANDON",
  ];
  for (
    const [bank, ys] of [[0, [12.34, 12.53, 12.72]], [1, [15.30, 15.61, 15.94]]]
  ) {
    for (let shelf = 0; shelf < 3; shelf++) {
      for (let i = 0; i < 3; i++) {
        const name = brands[(bank * 3 + shelf + i) % brands.length];
        const bottle = placed(name + " display bottle", [
          11.16,
          ys[i],
          2.45 + shelf * .39,
        ], -Math.PI / 2);
        const glass = new THREE.MeshPhysicalMaterial({
          color: i % 2 ? 0x574323 : 0x263b27,
          roughness: .16,
          metalness: .12,
          transparent: true,
          opacity: .92,
        });
        cylinder(bottle, .035, .18, [0, .09, 0], glass);
        const shoulder = new THREE.Mesh(
          new THREE.SphereGeometry(.035, 12, 8),
          glass,
        );
        shoulder.scale.set(1, .6, 1);
        shoulder.position.y = .18;
        bottle.add(shoulder);
        cylinder(bottle, .012, .085, [0, .225, 0], glass);
        cylinder(bottle, .013, .025, [0, .27, 0], black);
        const labelCanvas = document.createElement("canvas");
        labelCanvas.width = 256;
        labelCanvas.height = 128;
        const c = labelCanvas.getContext("2d");
        c.fillStyle = i % 2 ? "#24211b" : "#eee4ca";
        c.fillRect(0, 0, 256, 128);
        c.strokeStyle = "#b29958";
        c.lineWidth = 7;
        c.strokeRect(6, 6, 244, 116);
        c.fillStyle = i % 2 ? "#d9c280" : "#29241b";
        c.font = "bold 22px serif";
        c.textAlign = "center";
        name.split(" ").forEach((word, j) =>
          c.fillText(word, 128, 35 + j * 27)
        );
        const texture = new THREE.CanvasTexture(labelCanvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        const label = new THREE.Mesh(
          new THREE.PlaneGeometry(.061, .09),
          new THREE.MeshStandardMaterial({ map: texture, roughness: .8 }),
        );
        label.position.set(0, .10, .0355);
        bottle.add(label);
      }
    }
  }
  return { group, setCoffeeTops };
}
