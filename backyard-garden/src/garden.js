import * as THREE from "three";
import { gardenLayout as g } from "../model.ts";

export function createGarden(world) {
  const group = new THREE.Group();
  group.name = "Artificial Zen garden";
  world.add(group);
  const stone = new THREE.MeshStandardMaterial({
    color: 0x777a76,
    roughness: 1,
  });
  const dark = new THREE.MeshStandardMaterial({
    color: 0x292d2c,
    roughness: 1,
  });
  const green = new THREE.MeshStandardMaterial({
    color: 0x45632f,
    roughness: 1,
  });
  const bark = new THREE.MeshStandardMaterial({
    color: 0x625044,
    roughness: 1,
  });
  function mesh(geometry, material, x, y, z, scale) {
    const object = new THREE.Mesh(geometry, material);
    object.position.set(x, y, z);
    if (scale) object.scale.set(...scale);
    object.castShadow = object.receiveShadow = true;
    group.add(object);
    return object;
  }
  const bed = new THREE.BoxGeometry(g.bed.width, .035, g.bed.depth);
  mesh(bed, stone, g.bed.x, .018, g.bed.z);
  // Instanced smooth pebbles, deterministic variation and a black edge.
  let seed = 1947;
  function random() {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  }
  const pebbles = new THREE.InstancedMesh(
    new THREE.IcosahedronGeometry(1, 1),
    new THREE.MeshStandardMaterial({ roughness: 1 }),
    1600,
  );
  const dummy = new THREE.Object3D();
  const colors = [0xe7e6df, 0xaaaead, 0x323735];
  for (let i = 0; i < 1600; i++) {
    const x = g.bed.x + (random() - .5) * g.bed.width;
    const z = g.bed.z + (random() - .5) * g.bed.depth;
    dummy.position.set(x, .043, z);
    dummy.rotation.set(random(), random() * Math.PI, random());
    dummy.scale.set(
      .013 + random() * .014,
      .009 + random() * .008,
      .016 + random() * .014,
    );
    dummy.updateMatrix();
    pebbles.setMatrixAt(i, dummy.matrix);
    const edge = Math.abs(z - g.bed.z) > g.bed.depth / 2 - .045;
    pebbles.setColorAt(
      i,
      new THREE.Color(edge ? colors[2] : random() < .8 ? colors[0] : colors[1]),
    );
  }
  pebbles.receiveShadow = true;
  group.add(pebbles);
  function branch(points, radius) {
    const curve = new THREE.CatmullRomCurve3(
      points.map((p) => new THREE.Vector3(...p)),
    );
    mesh(new THREE.TubeGeometry(curve, 16, radius, 7, false), bark, 0, 0, 0);
  }
  const { x, z, height } = g.bonsai;
  // Shallow dark base and artificial moss island.
  mesh(new THREE.CylinderGeometry(.19, .16, .07, 28), dark, x, .07, z, [
    1,
    1,
    .75,
  ]);
  mesh(new THREE.SphereGeometry(1, 16, 10), green, x, .10, z, [.25, .07, .19]);
  branch([[x, .13, z], [x - .08, .4, z], [x + .03, .7, z], [
    x - .02,
    height - .13,
    z,
  ]], .035);
  const pads = [[-.24, .55, .03, .23], [.24, .78, -.03, .23], [
    -.19,
    .98,
    .01,
    .22,
  ], [.01, 1.2, 0, .28]];
  for (const [dx, y, dz, r] of pads) {
    branch([[x, y - .17, z], [x + dx, y - .03, z + dz]], .015);
    for (let i = 0; i < 9; i++) {
      mesh(
        new THREE.SphereGeometry(1, 9, 7),
        green,
        x + dx + (random() - .5) * r * 1.3,
        y + (random() - .5) * .05,
        z + dz + (random() - .5) * .12,
        [r * .6, .075 + random() * .035, .12],
      );
    }
  }
  for (const [rx, rz, s] of g.rocks) {
    const rock = mesh(
      new THREE.IcosahedronGeometry(1, 1),
      stone,
      rx,
      s * .38,
      rz,
      [s, s * .65, s * .7],
    );
    rock.rotation.y = random() * 3;
  }
  // Small artificial moss/grass accents, confined to the pebble bed.
  for (const [gx, gz] of g.grass) {
    mesh(new THREE.SphereGeometry(1, 12, 8), green, gx, .045, gz, [
      .13,
      .035,
      .10,
    ]);
    for (let i = 0; i < 15; i++) {
      const blade = mesh(
        new THREE.ConeGeometry(.009, .11, 3),
        green,
        gx + (random() - .5) * .17,
        .08,
        gz + (random() - .5) * .12,
      );
      blade.rotation.z = (random() - .5) * .5;
    }
  }
  const glow = new THREE.MeshStandardMaterial({
    color: 0xe8dfca,
    emissive: 0xffbd73,
    emissiveIntensity: 0,
  });
  const { x: lx, z: lz } = g.lantern;
  // Compact yukimi-style stone lantern, one restrained accent.
  mesh(new THREE.CylinderGeometry(.13, .15, .055, 20), stone, lx, .07, lz);
  for (const dx of [-.075, .075]) {
    mesh(new THREE.BoxGeometry(.04, .14, .05), stone, lx + dx, .16, lz);
  }
  mesh(new THREE.CylinderGeometry(.10, .10, .035, 20), stone, lx, .24, lz);
  mesh(new THREE.CylinderGeometry(.06, .06, .10, 16), glow, lx, .30, lz);
  for (const dx of [-.06, .06]) {
    mesh(new THREE.BoxGeometry(.018, .11, .018), stone, lx + dx, .30, lz);
  }
  mesh(new THREE.ConeGeometry(.19, .10, 8), stone, lx, .40, lz);
  mesh(new THREE.SphereGeometry(.028, 10, 8), stone, lx, .47, lz);
  const orb = mesh(
    new THREE.SphereGeometry(1, 20, 14),
    glow,
    g.pebbleLight.x,
    .10,
    g.pebbleLight.z,
    [.12, .08, .10],
  );
  orb.name = "Small warm pebble light";
  const lights = [];
  for (
    const [px, py, pz] of [[lx, .30, lz], [
      g.pebbleLight.x,
      .14,
      g.pebbleLight.z,
    ]]
  ) {
    const light = new THREE.PointLight(0xffbd73, .15, .7, 2);
    light.position.set(px, py, pz);
    light.visible = false;
    group.add(light);
    lights.push(light);
  }
  return {
    group,
    setNight(night) {
      glow.emissiveIntensity = night ? .45 : 0;
      for (const light of lights) light.visible = night;
    },
  };
}
