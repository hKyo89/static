import * as THREE from "three";
import { gardenLayout as g, model as m } from "../model.ts";

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
  const gravelBase = new THREE.MeshStandardMaterial({
    color: 0xd0d1c9,
    roughness: 1,
  });
  mesh(
    new THREE.BoxGeometry(m.width, .035, m.stripDepth),
    gravelBase,
    m.width / 2,
    .018,
    m.stripDepth / 2,
  );
  // Walnut-look WPC boards cover only the short return smoking nook.
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  context.fillStyle = "#694831";
  context.fillRect(0, 0, 64, 512);
  for (let i = 0; i < 90; i++) {
    context.strokeStyle = i % 3 ? "rgba(35,19,10,.18)" : "rgba(177,133,85,.22)";
    context.beginPath();
    context.moveTo(i * 7 % 64, 0);
    context.bezierCurveTo(
      (i * 7 % 64) + 5,
      180,
      (i * 7 % 64) - 4,
      330,
      i * 7 % 64,
      512,
    );
    context.stroke();
  }
  const woodTexture = new THREE.CanvasTexture(canvas);
  woodTexture.colorSpace = THREE.SRGBColorSpace;
  const wood = new THREE.MeshStandardMaterial({
    map: woodTexture,
    roughness: .88,
  });
  const nookDepth = m.returnDepth - m.stripDepth;
  for (let i = 0; i < 9; i++) {
    mesh(
      new THREE.BoxGeometry(m.returnWidth / 9 - .006, .045, nookDepth - .025),
      wood,
      (i + .5) * m.returnWidth / 9,
      .027,
      (m.returnDepth + m.stripDepth) / 2,
    );
  }
  // Black standing ashtray/bin is tucked behind the short opaque return wall.
  const binX = 1.08, binZ = 1.76, binHeight = .62;
  const metal = new THREE.MeshStandardMaterial({
    color: 0x9ea4a5,
    metalness: .85,
    roughness: .35,
  });
  const binBody = new THREE.MeshStandardMaterial({
    color: 0x151718,
    metalness: .5,
    roughness: .45,
  });
  mesh(
    new THREE.CylinderGeometry(.12, .12, binHeight, 32),
    binBody,
    binX,
    .05 + binHeight / 2,
    binZ,
  );
  mesh(
    new THREE.CylinderGeometry(.126, .126, .025, 32),
    metal,
    binX,
    .05 + binHeight,
    binZ,
  );
  mesh(
    new THREE.CylinderGeometry(.107, .107, .008, 32),
    dark,
    binX,
    .067 + binHeight,
    binZ,
  );
  // Thin grate bars and a dark front waste opening reproduce the reference.
  for (let j = -3; j <= 3; j++) {
    mesh(
      new THREE.BoxGeometry(.17, .003, .005),
      metal,
      binX,
      .075 + binHeight,
      binZ + j * .022,
    );
    mesh(
      new THREE.BoxGeometry(.005, .003, .17),
      metal,
      binX + j * .022,
      .076 + binHeight,
      binZ,
    );
  }
  mesh(new THREE.BoxGeometry(.15, .14, .005), dark, binX, .47, binZ - .121);
  // Subtle size and angle changes make the staggered route feel less formal.
  g.steppingStones.forEach(([x, z], i) => {
    if (z > m.stripDepth) return;
    const scale = [.94, 1.05, .98, 1.08, .92][i % 5];
    const slab = mesh(
      new THREE.CylinderGeometry(.23, .23, .025, 7),
      stone,
      x,
      .052,
      z,
      [scale, 1, .76 * scale],
    );
    slab.rotation.y = [-.28, .42, -.55, .18, .65][i % 5];
  });
  // Instanced smooth pebbles, deterministic variation and a black edge.
  let seed = 1947;
  function random() {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  }
  const pebbles = new THREE.InstancedMesh(
    new THREE.IcosahedronGeometry(1, 1),
    new THREE.MeshStandardMaterial({ roughness: 1 }),
    8500,
  );
  const dummy = new THREE.Object3D();
  const colors = [0xe7e6df, 0xaaaead, 0x323735];
  for (let i = 0; i < 8500; i++) {
    let x, z;
    do {
      x = .04 + random() * (m.width - .08);
      z = .04 + random() * (m.returnDepth - .08);
    } while (
      z > m.stripDepth - .04 ||
      g.steppingStones.some(([sx, sz]) =>
        ((x - sx) / .25) ** 2 + ((z - sz) / .18) ** 2 < 1
      )
    );
    dummy.position.set(x, .043, z);
    dummy.rotation.set(random(), random() * Math.PI, random());
    dummy.scale.set(
      .013 + random() * .014,
      .009 + random() * .008,
      .016 + random() * .014,
    );
    dummy.updateMatrix();
    pebbles.setMatrixAt(i, dummy.matrix);
    // Soft mixed gravel throughout; no contrasting perimeter stripe.
    const shade = random();
    pebbles.setColorAt(
      i,
      new THREE.Color(
        shade < .025 ? colors[2] : shade < .80 ? colors[0] : colors[1],
      ),
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
  // Three asymmetrical green islands; many tiny moss rocks form texture.
  const islands = [[1.68, .30, .29, .20], [3.84, .34, .44, .22], [
    5.94,
    .35,
    .42,
    .24,
  ]];
  const moss = new THREE.MeshStandardMaterial({
    color: 0x607b39,
    roughness: 1,
  });
  for (const [gx, gz, rx, rz] of islands) {
    for (let j = 0; j < 7; j++) {
      const angle = j * 2.4;
      mesh(
        new THREE.SphereGeometry(1, 14, 8),
        j % 2 ? green : moss,
        gx + Math.cos(angle) * rx * .35,
        .06,
        gz + Math.sin(angle) * rz * .35,
        [rx * (.6 + random() * .2), .055, rz * (.55 + random() * .2)],
      );
    }
    for (let j = 0; j < 12; j++) {
      const radius = .025 + random() * .015; // 5–8 cm diameter, confirmed by user.
      mesh(
        new THREE.IcosahedronGeometry(1, 2),
        moss,
        gx + (random() - .5) * rx * 1.4,
        .09,
        gz + (random() - .5) * rz * 1.4,
        [radius, radius * .8, radius],
      );
    }
    for (let j = 0; j < 22; j++) {
      const tuft = mesh(
        new THREE.ConeGeometry(.013, .15, 4),
        green,
        gx + (random() - .5) * rx * 1.5,
        .13,
        gz + (random() - .5) * rz * 1.4,
      );
      tuft.rotation.z = (random() - .5) * .6;
    }
  }
  mesh(new THREE.IcosahedronGeometry(1, 1), stone, 3.35, .17, .32, [
    .23,
    .20,
    .16,
  ]);
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
  const lights = [];
  // Two 30–35 cm glowing stones, staggered amongst the green islands.
  const groundLamps = [[3.02, .34, .33], [6.40, .39, .31]];
  for (const [px, pz, diameter] of groundLamps) {
    const rock = mesh(
      new THREE.IcosahedronGeometry(1, 2),
      glow,
      px,
      diameter * .24,
      pz,
      [diameter / 2, diameter * .26, diameter * .40],
    );
    rock.rotation.y = random() * 2;
    rock.name = "Warm glowing stone";
  }
  // One 50 cm Mars-style ball in the deeper return, away from the path.
  mesh(new THREE.SphereGeometry(.25, 28, 20), glow, .35, .29, .38);
  for (
    const [px, py, pz] of [[lx, .30, lz], [3.02, .15, .34], [6.40, .15, .39], [
      .35,
      .30,
      .38,
    ]]
  ) {
    const light = new THREE.PointLight(0xffbd73, .22, 1, 2);
    light.position.set(px, py, pz);
    light.visible = false;
    group.add(light);
    lights.push(light);
  }
  // Low warm uplight from the door side, projecting foliage shadows rearward.
  const uplight = new THREE.SpotLight(0xffc58a, 6, 4, Math.PI / 5, .6, 2);
  uplight.position.set(g.bonsai.x + .08, .09, g.bonsai.z + .55);
  uplight.target.position.set(g.bonsai.x, .85, .03);
  uplight.castShadow = true;
  uplight.shadow.mapSize.set(1024, 1024);
  uplight.shadow.camera.near = .03;
  uplight.shadow.camera.far = 4;
  uplight.shadow.bias = -.0002;
  uplight.shadow.normalBias = .005;
  uplight.visible = false;
  group.add(uplight, uplight.target);
  lights.push(uplight);
  const housing = mesh(
    new THREE.CylinderGeometry(.035, .045, .07, 16),
    dark,
    uplight.position.x,
    .07,
    uplight.position.z,
  );
  housing.name = "Bonsai ground spotlight";
  housing.lookAt(uplight.target.position);
  housing.rotateX(Math.PI / 2);
  return {
    group,
    setNight(night) {
      glow.emissiveIntensity = night ? .45 : 0;
      for (const light of lights) light.visible = night;
    },
  };
}
