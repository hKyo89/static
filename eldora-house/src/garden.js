import * as THREE from "three";
import { gardenBuildUp, gardenLayout as g, model as m } from "../model.ts";

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
    new THREE.BoxGeometry(m.width, .013, m.stripDepth),
    gravelBase,
    m.width / 2,
    .0285,
    m.stripDepth / 2,
  );
  const draincellMaterial = new THREE.MeshStandardMaterial({
    color: 0x242726,
    roughness: 1,
  });
  const textileMaterial = new THREE.MeshStandardMaterial({
    color: 0xb2b4af,
    roughness: 1,
  });
  mesh(
    new THREE.BoxGeometry(
      m.width,
      gardenBuildUp.draincellThickness,
      m.stripDepth,
    ),
    draincellMaterial,
    m.width / 2,
    gardenBuildUp.draincellThickness / 2,
    m.stripDepth / 2,
  );
  mesh(
    new THREE.BoxGeometry(
      m.width,
      gardenBuildUp.geotextileThickness,
      m.stripDepth,
    ),
    textileMaterial,
    m.width / 2,
    gardenBuildUp.draincellThickness + gardenBuildUp.geotextileThickness / 2,
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
  for (let i = 0; i < g.deck.boards; i++) {
    mesh(
      new THREE.BoxGeometry(
        m.returnWidth / g.deck.boards - g.deck.gap,
        g.deck.thickness,
        nookDepth - g.deck.endInset,
      ),
      wood,
      (i + .5) * m.returnWidth / g.deck.boards,
      g.deck.centreY,
      (m.returnDepth + m.stripDepth) / 2,
    );
  }
  // Black standing ashtray/bin is tucked behind the short opaque return wall.
  const { x: binX, z: binZ, height: binHeight } = g.bin;
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
  const pads = g.canopyPads;
  for (const [dx, y, dz, r] of pads) {
    branch([[x, y - .17, z], [x + dx, y - .03, z + dz]], .015);
    for (let i = 0; i < g.deck.boards; i++) {
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
  const islands = g.turfPatches;
  const moss = new THREE.MeshStandardMaterial({
    color: 0x83a647,
    roughness: 1,
  });
  for (const [gx, gz, rx, rz] of islands) {
    // Flat cut-to-shape artificial turf, not raised grass mounds.
    const shape = new THREE.Shape();
    for (let j = 0; j <= 14; j++) {
      const angle = j / 14 * Math.PI * 2;
      const variation = 1 + .12 * Math.sin(j * 2.1);
      const px = Math.cos(angle) * rx * variation,
        pz = Math.sin(angle) * rz * variation;
      if (j === 0) shape.moveTo(px, pz);
      else shape.lineTo(px, pz);
    }
    const patch = mesh(new THREE.ShapeGeometry(shape), green, gx, .078, gz);
    patch.rotation.x = -Math.PI / 2;
    patch.material.side = THREE.DoubleSide;
    // Small separate moss stones surround the patch, clearly above the pebbles.
    for (let j = 0; j < g.mossRocks.perPatch; j++) {
      const radius = g.mossRocks.minRadius +
        random() * (g.mossRocks.maxRadius - g.mossRocks.minRadius);
      const angle = j / g.mossRocks.perPatch * Math.PI * 2;
      const rock = mesh(
        new THREE.IcosahedronGeometry(1, 2),
        moss,
        gx + Math.cos(angle) * rx * (.8 + random() * .15),
        .055 + radius * .8,
        gz + Math.sin(angle) * rz * (.8 + random() * .15),
        [radius, radius * .8, radius],
      );
      rock.name = `Moss-covered rock ${j + 1}: 5–8 cm`;
    }
  }
  mesh(
    new THREE.IcosahedronGeometry(1, 1),
    stone,
    g.accentRock.x,
    g.accentRock.y,
    g.accentRock.z,
    g.accentRock.scale,
  );
  // Artificial bamboo at the rear-left corner; compact foliage stays in the bed.
  // Instanced leaves keep this added planting inexpensive to draw.
  const plantMaterial = new THREE.MeshStandardMaterial({
    color: 0x5a853f,
    roughness: .9,
  });
  const bambooMaterial = new THREE.MeshStandardMaterial({
    color: 0x65804b,
    roughness: .85,
  });
  const foliage = new THREE.InstancedMesh(
    new THREE.SphereGeometry(1, 6, 4),
    plantMaterial,
    400,
  );
  let leafIndex = 0;
  function leaf(x, y, z, length, width, angle, tilt, colour) {
    dummy.position.set(x, y, z);
    dummy.rotation.set(tilt, angle, .2);
    dummy.scale.set(length, .008, width);
    dummy.updateMatrix();
    foliage.setMatrixAt(leafIndex, dummy.matrix);
    foliage.setColorAt(leafIndex++, new THREE.Color(colour));
  }
  const bamboo = g.bamboo;
  for (let i = 0; i < bamboo.stems; i++) {
    const angle = i * 2.4, spread = i === 0 ? 0 : .11;
    const bx = bamboo.x + Math.cos(angle) * spread;
    const bz = bamboo.z + Math.sin(angle) * spread;
    const height = bamboo.height * (.76 + random() * .24);
    mesh(
      new THREE.CylinderGeometry(.009, .013, height, 7),
      bambooMaterial,
      bx,
      .06 + height / 2,
      bz,
    );
    for (let j = 1; j <= 7; j++) {
      const y = .06 + height * j / 8;
      mesh(new THREE.CylinderGeometry(.014, .014, .012, 7), green, bx, y, bz);
      if (j < 3) continue;
      for (let k = 0; k < 5; k++) {
        const direction = angle + k * 1.25 + j;
        const reach = bamboo.spread * (.45 + random() * .45);
        leaf(
          bx + Math.cos(direction) * reach,
          y + .03,
          bz + Math.sin(direction) * reach,
          .105,
          .018,
          -direction,
          -.25,
          k % 2 ? 0x668f43 : 0x3f6d37,
        );
      }
    }
  }
  // Low broadleaf / fern-like artificial accents, rather than raised grass.
  for (const [px, pz, height] of g.minorPlants) {
    mesh(new THREE.CylinderGeometry(.09, .07, .045, 12), dark, px, .065, pz);
    for (let j = 0; j < 18; j++) {
      const angle = j * 2.4;
      const reach = .045 + random() * .095;
      const y = .09 + height * (.25 + random() * .6);
      leaf(
        px + Math.cos(angle) * reach,
        y,
        pz + Math.sin(angle) * reach,
        .09 + random() * .055,
        .025 + random() * .016,
        -angle,
        -.5 + random(),
        j % 3 ? 0x4e793a : 0x7b9d4b,
      );
    }
  }
  // Slender artificial olive accent beside the L-shaped smoking nook.
  const olive = g.olive;
  mesh(
    new THREE.CylinderGeometry(
      olive.potRadius,
      olive.potRadius * .8,
      olive.potHeight,
      20,
    ),
    dark,
    olive.x,
    .05 + olive.potHeight / 2,
    olive.z,
  );
  branch([[olive.x, .25, olive.z], [olive.x + .025, .72, olive.z], [
    olive.x - .02,
    olive.height - .18,
    olive.z,
  ]], .018);
  for (let j = 0; j < 5; j++) {
    const angle = j * 2.4;
    const y = .75 + j * .12;
    const bx = olive.x + Math.cos(angle) * .12;
    const bz = olive.z + Math.sin(angle) * .10;
    branch([[olive.x, y - .13, olive.z], [bx, y, bz]], .007);
    for (let i = 0; i < 24; i++) {
      const direction = i * 2.4 + j;
      const radius = Math.sqrt(random()) * olive.crownRadius * .6;
      leaf(
        bx + Math.cos(direction) * radius,
        y + (random() - .3) * .28,
        bz + Math.sin(direction) * radius,
        .038,
        .012,
        direction,
        random() * .5,
        i % 3 ? 0x657550 : 0x98a582,
      );
    }
  }
  foliage.count = leafIndex;
  foliage.castShadow = foliage.receiveShadow = true;
  foliage.name = "Artificial bamboo and low green planting";
  group.add(foliage);
  // Narrow curved grass blades match the supplied 30 cm / 46 cm artificial sprigs.
  const bladePositions = [], bladeColours = [];
  const grassShades = [
    new THREE.Color(0x466a32),
    new THREE.Color(0x709249),
    new THREE.Color(0x889e55),
  ];
  const seedHeads = new THREE.InstancedMesh(
    new THREE.SphereGeometry(1, 7, 5),
    new THREE.MeshStandardMaterial({ color: 0xc6bd91, roughness: 1 }),
    16,
  );
  let headCount = 0;
  for (const clump of g.grassClumps) {
    for (let i = 0; i < 34; i++) {
      const angle = i * 2.4, height = clump.height * (.65 + random() * .35);
      const lean = .035 + random() * .065;
      const bx = clump.x + (random() - .5) * .055;
      const bz = clump.z + (random() - .5) * .045;
      const colour = grassShades[i % 3];
      const point = (t, side) => [
        bx + Math.cos(angle) * lean * t * t +
        Math.sin(angle) * side * .007 * (1 - t),
        .065 + height * t - height * .12 * t * t * t,
        bz + Math.sin(angle) * lean * t * t -
        Math.cos(angle) * side * .007 * (1 - t),
      ];
      for (let j = 0; j < 6; j++) {
        const t = j / 6, next = (j + 1) / 6;
        for (
          const vertex of [
            point(t, -1),
            point(t, 1),
            point(next, -1),
            point(t, 1),
            point(next, 1),
            point(next, -1),
          ]
        ) {
          bladePositions.push(...vertex);
          bladeColours.push(colour.r, colour.g, colour.b);
        }
      }
      if (clump.heads && i < 6) {
        dummy.position.set(...point(1, 0));
        dummy.rotation.set(.1, angle, .1);
        dummy.scale.set(.012, .043, .012);
        dummy.updateMatrix();
        seedHeads.setMatrixAt(headCount++, dummy.matrix);
      }
    }
  }
  const blades = new THREE.BufferGeometry();
  blades.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(bladePositions, 3),
  );
  blades.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(bladeColours, 3),
  );
  blades.computeVertexNormals();
  mesh(
    blades,
    new THREE.MeshStandardMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      roughness: 1,
    }),
    0,
    0,
    0,
  );
  seedHeads.count = headCount;
  seedHeads.castShadow = true;
  group.add(seedHeads);
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
  const groundLamps = g.glowingStones;
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
  // The 50 cm ball sits beside the bonsai opposite the sliding doors.
  mesh(
    new THREE.SphereGeometry(g.ball.diameter / 2, 28, 20),
    glow,
    g.ball.x,
    g.ball.y,
    g.ball.z,
  );
  for (
    const [px, py, pz] of [
      [lx, .30, lz],
      ...g.glowingStones.map(([x, z]) => [x, .15, z]),
      [g.ball.x, g.ball.y, g.ball.z],
    ]
  ) {
    const light = new THREE.PointLight(0xffbd73, .22, 1, 2);
    light.position.set(px, py, pz);
    light.visible = false;
    group.add(light);
    lights.push(light);
  }
  // Low warm uplight from the door side, projecting foliage shadows rearward.
  const uplight = new THREE.SpotLight(0xffc58a, 6, 4, Math.PI / 5, .6, 2);
  uplight.position.set(
    g.bonsai.x + g.spotlight.offset[0],
    g.spotlight.offset[1],
    g.bonsai.z + g.spotlight.offset[2],
  );
  uplight.target.position.set(
    g.bonsai.x,
    g.spotlight.targetY,
    g.spotlight.targetZ,
  );
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
