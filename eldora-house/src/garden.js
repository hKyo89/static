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
  // The former deck is now the same white pebble bed as the long strip.
  mesh(
    new THREE.BoxGeometry(m.returnWidth, .013, m.returnDepth - m.stripDepth),
    gravelBase,
    m.returnWidth / 2,
    .0285,
    (m.stripDepth + m.returnDepth) / 2,
  );
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
    10500,
  );
  const dummy = new THREE.Object3D();
  const colors = [0xe7e6df, 0xaaaead, 0x323735];
  for (let i = 0; i < 10500; i++) {
    let x, z;
    do {
      x = .04 + random() * (m.width - .08);
      z = .04 + random() * (m.returnDepth - .08);
    } while (
      (z > m.stripDepth - .04 && x > m.returnWidth - .04) ||
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
  const needles = new THREE.InstancedMesh(
    new THREE.ConeGeometry(.009, .065, 3),
    new THREE.MeshStandardMaterial({ color: 0x4f7438, roughness: 1 }),
    2400,
  );
  let needleCount = 0;
  const pads = g.canopyPads.map((
    [dx, py, dz, r],
  ) => [dx, py * (height - .12) / 1.2, dz, r]);
  for (const [dx, y, dz, r] of pads) {
    branch([[x, y - .17, z], [x + dx, y - .03, z + dz]], .015);
    for (let i = 0; i < 12; i++) {
      mesh(
        new THREE.SphereGeometry(1, 9, 7),
        green,
        x + dx + (random() - .5) * r * 1.3,
        y + (random() - .5) * .05,
        z + dz + (random() - .5) * .12,
        [r * .6, .075 + random() * .035, .12],
      );
      for (let n = 0; n < 24; n++) {
        const a = random() * Math.PI * 2, reach = Math.sqrt(random()) * r * .58;
        dummy.position.set(
          x + dx + (random() - .5) * r * .8 + Math.cos(a) * reach,
          y + (random() - .5) * .12,
          z + dz + Math.sin(a) * reach * .55,
        );
        dummy.rotation.set(random() * 2, random() * 6, random() * 2);
        dummy.scale.setScalar(.65 + random() * .6);
        dummy.updateMatrix();
        needles.setMatrixAt(needleCount, dummy.matrix);
        needles.setColorAt(
          needleCount++,
          new THREE.Color(n % 3 ? 0x456b32 : 0x86a04a),
        );
      }
    }
  }
  needles.count = needleCount;
  needles.castShadow = needles.receiveShadow = true;
  group.add(needles);
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
  const foliage = new THREE.InstancedMesh(
    new THREE.SphereGeometry(1, 6, 4),
    plantMaterial,
    5000,
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
  // Arching fern fronds with paired narrow leaflets, planted directly in moss.
  for (const [px, pz, height] of g.minorPlants) {
    for (let frond = 0; frond < 9; frond++) {
      const angle = frond * 2.4, reach = height * .85;
      for (let j = 1; j <= 9; j++) {
        const t = j / 10,
          cx = px + Math.cos(angle) * reach * t,
          cz = pz + Math.sin(angle) * reach * t;
        const cy = .08 + Math.sin(t * Math.PI * .8) * height;
        for (const side of [-1, 1]) {
          const length = height * .21 * Math.sin(t * Math.PI);
          leaf(
            cx + Math.sin(angle) * side * length * .6,
            cy,
            cz - Math.cos(angle) * side * length * .6,
            length,
            .012,
            -angle + side * .85,
            -.25,
            j % 3 ? 0x426d32 : 0x729348,
          );
        }
      }
    }
  }
  foliage.count = leafIndex;
  foliage.castShadow = foliage.receiveShadow = true;
  foliage.name = "Artificial fern planting";
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
    64,
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
    color: 0xffdca0,
    emissive: 0xffbd73,
    emissiveIntensity: 0,
  });
  const lanternStone = new THREE.MeshStandardMaterial({
    color: 0x343936,
    roughness: 1,
  });
  const { x: lx, z: lz } = g.lantern;
  // Square stone pagoda: stepped plinth, pierced chamber and swept roof.
  mesh(new THREE.BoxGeometry(.40, .055, .40), lanternStone, lx, .07, lz);
  mesh(new THREE.BoxGeometry(.33, .045, .33), lanternStone, lx, .12, lz);
  mesh(new THREE.BoxGeometry(.29, .025, .29), lanternStone, lx, .155, lz);
  for (const dx of [-.125, 0, .125]) {
    for (const dz of [-.125, .125]) {
      mesh(
        new THREE.BoxGeometry(.035, .23, .035),
        lanternStone,
        lx + dx,
        .28,
        lz + dz,
      );
    }
  }
  for (const dx of [-.125, .125]) {
    mesh(
      new THREE.BoxGeometry(.035, .23, .035),
      lanternStone,
      lx + dx,
      .28,
      lz,
    );
  }
  for (const y of [.175, .285, .395]) {
    mesh(new THREE.BoxGeometry(.28, .025, .28), lanternStone, lx, y, lz);
  }
  mesh(new THREE.BoxGeometry(.17, .18, .17), glow, lx, .285, lz);
  const roofVertices = [], roofIndices = [];
  for (let ring = 0; ring < 4; ring++) {
    const r = [.255, .19, .095, .025][ring], y = [.43, .435, .51, .54][ring];
    for (const [dx, dz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
      roofVertices.push(lx + dx * r, y, lz + dz * r);
    }
  }
  for (let ring = 0; ring < 3; ring++) {
    for (let side = 0; side < 4; side++) {
      const a = ring * 4 + side,
        b = ring * 4 + (side + 1) % 4,
        c = a + 4,
        d = b + 4;
      roofIndices.push(a, c, b, b, c, d);
    }
  }
  const pagodaRoof = new THREE.BufferGeometry();
  pagodaRoof.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(roofVertices, 3),
  );
  pagodaRoof.setIndex(roofIndices);
  pagodaRoof.computeVertexNormals();
  const roofMaterial = lanternStone.clone();
  roofMaterial.side = THREE.DoubleSide;
  mesh(pagodaRoof, roofMaterial, 0, 0, 0);
  mesh(new THREE.ConeGeometry(.04, .07, 4), lanternStone, lx, .565, lz);
  const lights = [];
  const lanternLight = new THREE.PointLight(0xffbd73, .7, 1.4, 2);
  lanternLight.position.set(lx, .29, lz);
  group.add(lanternLight);
  lights.push(lanternLight);
  // Reference #2: dark stone bowl with a rounded bubbling centre.
  const f = g.fountain,
    fx = f.x * m.width / 6.775,
    fz = f.z * m.stripDepth / 1.225;
  const fountainStone = new THREE.MeshStandardMaterial({
    color: 0x303434,
    roughness: .88,
  });
  const water = new THREE.MeshStandardMaterial({
    color: 0x94b8bc,
    transparent: true,
    opacity: .65,
    metalness: .25,
    roughness: .12,
  });
  const fountainGroup = new THREE.Group();
  fountainGroup.name = "Stone bubbler fountain — 40 cm bowl";
  fountainGroup.position.set(fx, .04, fz);
  fountainGroup.scale.setScalar(f.width / .64);
  group.add(fountainGroup);
  function fountainMesh(...args) {
    const object = mesh(...args);
    object.position.sub(new THREE.Vector3(fx, .04, fz));
    fountainGroup.add(object);
    return object;
  }
  const base = fountainMesh(
    new THREE.CylinderGeometry(.34, .32, .035, 7),
    stone,
    fx,
    .065,
    fz,
  );
  base.rotation.y = .3;
  const bowlProfile = [
    [0, .085],
    [.17, .085],
    [.25, .12],
    [.30, .20],
    [.32, .31],
    [.32, .36],
    [.295, .36],
    [.29, .30],
    [.26, .22],
    [.19, .16],
    [0, .16],
  ].map(([r, y]) => new THREE.Vector2(r, y));
  fountainMesh(
    new THREE.LatheGeometry(bowlProfile, 64),
    fountainStone,
    fx,
    0,
    fz,
  );
  fountainMesh(
    new THREE.CylinderGeometry(.292, .292, .006, 64),
    water,
    fx,
    .326,
    fz,
  );
  fountainMesh(
    new THREE.CylinderGeometry(.12, .13, .07, 40),
    fountainStone,
    fx,
    .35,
    fz,
  );
  const orbProfile = [
    [0, .375],
    [.105, .375],
    [.15, .40],
    [.17, .46],
    [.165, .53],
    [.14, .59],
    [.10, .64],
    [.055, .68],
    [.018, .70],
    [0, .70],
  ].map(([r, y]) => new THREE.Vector2(r, y));
  fountainMesh(
    new THREE.LatheGeometry(orbProfile, 64),
    fountainStone,
    fx,
    0,
    fz,
  );
  // Fine horizontal stone grooves and a small static water crown.
  for (let i = 0; i < 12; i++) {
    const y = .41 + i * .022;
    const ringRadius = y < .46
      ? .15 + (y - .41) * .4
      : y < .53
      ? .17 - (y - .46) * .07
      : .165 - (y - .53) * .72;
    fountainMesh(
      new THREE.TorusGeometry(ringRadius, .0015, 4, 64),
      dark,
      fx,
      y,
      fz,
    )
      .rotation.x = Math.PI / 2;
  }
  fountainMesh(new THREE.SphereGeometry(.025, 16, 10), water, fx, .713, fz, [
    1,
    1.4,
    1,
  ]);
  for (let i = 0; i < 3; i++) {
    fountainMesh(
      new THREE.TorusGeometry(.055 + i * .035, .002, 4, 48),
      water,
      fx,
      .331,
      fz,
    )
      .rotation.x = Math.PI / 2;
  }
  // User-confirmed 30 cm garden sphere; its bottom rests on the pebble bed.
  const ballMaterial = new THREE.MeshStandardMaterial({
    color: 0xf2ead8,
    roughness: .7,
    emissive: 0xffcc83,
    emissiveIntensity: 0,
  });
  mesh(
    new THREE.SphereGeometry(g.ball.diameter / 2, 40, 28),
    ballMaterial,
    g.ball.x,
    g.ball.y,
    g.ball.z,
  ).name = "Warm ball light — 30 cm diameter";
  const ballLight = new THREE.PointLight(0xffcf99, .35, 1.2, 2);
  ballLight.position.set(g.ball.x, g.ball.y, g.ball.z);
  group.add(ballLight);
  lights.push(ballLight);
  // Retain the two restrained warm ground spots for pine and fountain.
  for (const target of [[x, 1.05, z], [fx, .04 + .39 * f.width / .64, fz]]) {
    const spot = new THREE.SpotLight(0xffcf99, 6, 3, Math.PI / 7, .7, 2);
    spot.position.set(target[0] - .15, .10, Math.min(.9, target[2] + .43));
    spot.target.position.set(...target);
    group.add(spot, spot.target);
    lights.push(spot);
    const housing = mesh(
      new THREE.CylinderGeometry(.033, .04, .07, 10),
      dark,
      ...spot.position.toArray(),
    );
    housing.lookAt(spot.target.position);
    housing.rotateX(Math.PI / 2);
  }
  return {
    group,
    setNight(night) {
      glow.emissiveIntensity = night ? .45 : 0;
      ballMaterial.emissiveIntensity = night ? .65 : 0;
      for (const light of lights) light.visible = night;
    },
  };
}
