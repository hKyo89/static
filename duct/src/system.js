import * as THREE from "three";

const MM = 10;
const HEIGHT_OFFSET = 129;
const SHEET = 0.05;

export function systemPoint(x, y, z) {
  return new THREE.Vector3((300 - y) * MM, z * MM + HEIGHT_OFFSET, -(x - 25) * MM);
}

function partGroup(scene, key) {
  const group = new THREE.Group();
  group.name = `SYS:${key}`;
  scene.add(group);
  return group;
}

function material(opacity = 1, fixedColour = null) {
  const result = new THREE.MeshPhongMaterial({
    color: 0xc4c9cf,
    transparent: opacity < 1,
    opacity,
    side: THREE.DoubleSide,
    shininess: 24,
    depthWrite: opacity > 0.45
  });
  if (fixedColour !== null) result.userData.fixedColour = fixedColour;
  return result;
}

function addEdges(parent, mesh, opacity = 0.9) {
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(mesh.geometry, 18),
    new THREE.LineBasicMaterial({ color: 0x111111, transparent: opacity < 1, opacity })
  );
  edges.name = `${mesh.name}::outline`;
  edges.position.copy(mesh.position);
  edges.rotation.copy(mesh.rotation);
  edges.quaternion.copy(mesh.quaternion);
  edges.scale.copy(mesh.scale);
  edges.renderOrder = 8;
  parent.add(edges);
}

function addPdfBox(parent, name, x0, x1, y0, y1, z0, z1, options = {}) {
  const centre = systemPoint((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  const geometry = new THREE.BoxGeometry(
    Math.abs(y1 - y0) * MM,
    Math.abs(z1 - z0) * MM,
    Math.abs(x1 - x0) * MM
  );
  const mesh = new THREE.Mesh(geometry, material(options.opacity ?? 1, options.fixedColour ?? null));
  mesh.name = name;
  mesh.position.copy(centre);
  if (options.fixedColour !== undefined) mesh.userData.fixedColour = options.fixedColour;
  parent.add(mesh);
  addEdges(parent, mesh, options.edgeOpacity ?? 0.88);
  return mesh;
}

function addRectShell(parent, name, axis, bounds) {
  const { x0, x1, y0, y1, z0, z1 } = bounds;
  if (axis === "z") {
    addPdfBox(parent, `${name}-left`, x0, x0 + SHEET, y0, y1, z0, z1);
    addPdfBox(parent, `${name}-right`, x1 - SHEET, x1, y0, y1, z0, z1);
    addPdfBox(parent, `${name}-back`, x0 + SHEET, x1 - SHEET, y0, y0 + SHEET, z0, z1);
    addPdfBox(parent, `${name}-front`, x0 + SHEET, x1 - SHEET, y1 - SHEET, y1, z0, z1);
  } else if (axis === "x") {
    addPdfBox(parent, `${name}-back`, x0, x1, y0, y0 + SHEET, z0, z1);
    addPdfBox(parent, `${name}-front`, x0, x1, y1 - SHEET, y1, z0, z1);
    addPdfBox(parent, `${name}-bottom`, x0, x1, y0 + SHEET, y1 - SHEET, z0, z0 + SHEET);
    addPdfBox(parent, `${name}-top`, x0, x1, y0 + SHEET, y1 - SHEET, z1 - SHEET, z1);
  } else {
    addPdfBox(parent, `${name}-left`, x0, x0 + SHEET, y0, y1, z0, z1);
    addPdfBox(parent, `${name}-right`, x1 - SHEET, x1, y0, y1, z0, z1);
    addPdfBox(parent, `${name}-bottom`, x0 + SHEET, x1 - SHEET, y0, y1, z0, z0 + SHEET);
    addPdfBox(parent, `${name}-top`, x0 + SHEET, x1 - SHEET, y0, y1, z1 - SHEET, z1);
  }
}

function addQuad(parent, name, points) {
  const vertices = points.map(point => systemPoint(...point));
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices.flatMap(point => [point.x, point.y, point.z]), 3));
  geometry.setIndex([0, 1, 2, 0, 2, 3]);
  geometry.computeVertexNormals();
  const mesh = new THREE.Mesh(geometry, material());
  mesh.name = name;
  parent.add(mesh);
  addEdges(parent, mesh);
}

function addSlopedRectShellY(parent, name, { x0, x1, y0, y1, z0, z1, height }) {
  const low0 = z0 - height / 2, high0 = z0 + height / 2;
  const low1 = z1 - height / 2, high1 = z1 + height / 2;
  addQuad(parent, `${name}-left`, [[x0, y0, low0], [x0, y1, low1], [x0, y1, high1], [x0, y0, high0]]);
  addQuad(parent, `${name}-right`, [[x1, y1, low1], [x1, y0, low0], [x1, y0, high0], [x1, y1, high1]]);
  addQuad(parent, `${name}-bottom`, [[x0, y0, low0], [x1, y0, low0], [x1, y1, low1], [x0, y1, low1]]);
  addQuad(parent, `${name}-top`, [[x0, y1, high1], [x1, y1, high1], [x1, y0, high0], [x0, y0, high0]]);
}

function addFastenerHole(parent, name, plane, x, y, z) {
  const geometry = new THREE.CylinderGeometry(3, 3, 1.6, 14);
  const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x111111 }));
  mesh.name = name;
  mesh.position.copy(systemPoint(x, y, z));
  if (plane === "x") mesh.rotation.x = Math.PI / 2;
  if (plane === "y") mesh.rotation.z = Math.PI / 2;
  mesh.userData.fixedColour = 0x111111;
  parent.add(mesh);
}

function threePerCorner(a0, a1, b0, b1, extension = 3) {
  const result = [];
  for (const [a, sa] of [[a0, -1], [a1, 1]]) {
    for (const [b, sb] of [[b0, -1], [b1, 1]]) {
      result.push(
        [a + sa * extension * 0.5, b],
        [a + sa * extension * 0.5, b + sb * extension * 0.5],
        [a, b + sb * extension * 0.5]
      );
    }
  }
  return result;
}

function addFlangeZ(parent, name, cx, cy, z, width, depth) {
  const e = 3;
  const x0 = cx - width / 2, x1 = cx + width / 2;
  const y0 = cy - depth / 2, y1 = cy + depth / 2;
  addPdfBox(parent, `${name}-rear`, x0 - e, x1 + e, y0 - e, y0, z - SHEET, z + SHEET);
  addPdfBox(parent, `${name}-front`, x0 - e, x1 + e, y1, y1 + e, z - SHEET, z + SHEET);
  addPdfBox(parent, `${name}-left`, x0 - e, x0, y0, y1, z - SHEET, z + SHEET);
  addPdfBox(parent, `${name}-right`, x1, x1 + e, y0, y1, z - SHEET, z + SHEET);
  threePerCorner(x0, x1, y0, y1).forEach(([x, y], index) => {
    addFastenerHole(parent, `${name}-hole-${index + 1}`, "z", x, y, z + SHEET * 1.2);
  });
}

function addFlangeX(parent, name, x, cy, cz, depth, height) {
  const e = 3;
  const y0 = cy - depth / 2, y1 = cy + depth / 2;
  const z0 = cz - height / 2, z1 = cz + height / 2;
  addPdfBox(parent, `${name}-bottom`, x - SHEET, x + SHEET, y0 - e, y1 + e, z0 - e, z0);
  addPdfBox(parent, `${name}-top`, x - SHEET, x + SHEET, y0 - e, y1 + e, z1, z1 + e);
  addPdfBox(parent, `${name}-rear`, x - SHEET, x + SHEET, y0 - e, y0, z0, z1);
  addPdfBox(parent, `${name}-front`, x - SHEET, x + SHEET, y1, y1 + e, z0, z1);
  threePerCorner(y0, y1, z0, z1).forEach(([y, z], index) => {
    addFastenerHole(parent, `${name}-hole-${index + 1}`, "x", x + SHEET * 1.2, y, z);
  });
}

function addFlangeY(parent, name, cx, y, cz, width, height) {
  const e = 3;
  const x0 = cx - width / 2, x1 = cx + width / 2;
  const z0 = cz - height / 2, z1 = cz + height / 2;
  addPdfBox(parent, `${name}-bottom`, x0 - e, x1 + e, y - SHEET, y + SHEET, z0 - e, z0);
  addPdfBox(parent, `${name}-top`, x0 - e, x1 + e, y - SHEET, y + SHEET, z1, z1 + e);
  addPdfBox(parent, `${name}-left`, x0 - e, x0, y - SHEET, y + SHEET, z0, z1);
  addPdfBox(parent, `${name}-right`, x1, x1 + e, y - SHEET, y + SHEET, z0, z1);
  threePerCorner(x0, x1, z0, z1).forEach(([x, z], index) => {
    addFastenerHole(parent, `${name}-hole-${index + 1}`, "y", x, y + SHEET * 1.2, z);
  });
}

function addSweptSurface(parent, name, ringFactory, segments = 36) {
  const positions = [];
  const rings = [];
  for (let index = 0; index <= segments; index += 1) {
    const ring = ringFactory(index / segments * Math.PI / 2).map(point => systemPoint(...point));
    rings.push(ring);
    ring.forEach(point => positions.push(point.x, point.y, point.z));
  }
  const indices = [];
  for (let ring = 0; ring < segments; ring += 1) {
    for (let side = 0; side < 4; side += 1) {
      const next = (side + 1) % 4;
      const a = ring * 4 + side;
      const b = ring * 4 + next;
      const c = (ring + 1) * 4 + next;
      const d = (ring + 1) * 4 + side;
      indices.push(a, b, d, b, c, d);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const mesh = new THREE.Mesh(geometry, material());
  mesh.name = name;
  parent.add(mesh);
  addEdges(parent, mesh);
}

// Compact square-throat, radius-heel shaft-entry elbow. The sharp throat is
// the centre of a 150 mm outer quarter-circle, so every section through the
// bend retains the full 350 x 150 mm minimum airflow area. The actual
// fabricated side envelope is 250 x 250 mm: 100 mm straight neck plus the
// 150 mm heel radius on each leg. It sits below the shaft wall and aligns
// directly with the vertical riser.
function addSquareThroatElbow(parent, name, segments = 40) {
  addSweptSurface(parent, name, angle => {
    const t = angle / (Math.PI / 2);
    let innerY;
    let innerZ;
    let outerY;
    let outerZ;

    if (t <= 0.25) {
      const neckT = t / 0.25;
      innerY = outerY = 71 - 10 * neckT;
      innerZ = 90;
      outerZ = 75;
    } else if (t <= 0.75) {
      const bendAngle = (t - 0.25) / 0.5 * Math.PI / 2;
      innerY = 61;
      innerZ = 90;
      outerY = 61 - 15 * Math.sin(bendAngle);
      outerZ = 90 - 15 * Math.cos(bendAngle);
    } else {
      const neckT = (t - 0.75) / 0.25;
      innerY = 61;
      outerY = 46;
      innerZ = outerZ = 90 + 10 * neckT;
    }

    return [
      [4, innerY, innerZ],
      [39, innerY, innerZ],
      [39, outerY, outerZ],
      [4, outerY, outerZ]
    ];
  }, segments);
}

// Square-throat/radius-heel elbow from a vertical inlet to a -Y outlet.
// The 200 mm straight legs preserve the existing connection faces while the
// 150 mm heel radius matches Elbow 4's throat construction.
function addSquareThroatVerticalToY(parent, name, x0, x1, innerY, innerZ, inletZ, outletY, segments = 40) {
  addSweptSurface(parent, name, angle => {
    const t = angle / (Math.PI / 2);
    let inY;
    let inZ;
    let outY;
    let outZ;

    if (t <= 0.25) {
      const neckT = t / 0.25;
      inY = innerY;
      outY = innerY + 15;
      inZ = outZ = inletZ + (innerZ - inletZ) * neckT;
    } else if (t <= 0.75) {
      const bendAngle = (t - 0.25) / 0.5 * Math.PI / 2;
      inY = innerY;
      inZ = innerZ;
      outY = innerY + 15 * Math.cos(bendAngle);
      outZ = innerZ + 15 * Math.sin(bendAngle);
    } else {
      const neckT = (t - 0.75) / 0.25;
      inY = outY = innerY + (outletY - innerY) * neckT;
      inZ = innerZ;
      outZ = innerZ + 15;
    }

    return [[x0, inY, inZ], [x1, inY, inZ], [x1, outY, outZ], [x0, outY, outZ]];
  }, segments);
}

// Horizontal -Y inlet turning vertically downward. Connection centres are
// (106, 117.5) and (88.5, 100), giving the same 100 mm neck and R150 heel as
// Elbow 4.
function addEntryElbowDown(parent, name, segments = 40) {
  addSweptSurface(parent, name, angle => {
    const t = angle / (Math.PI / 2);
    let innerY, innerZ, outerY, outerZ;
    if (t <= 0.25) {
      const neckT = t / 0.25;
      innerY = outerY = 106 - 10 * neckT;
      innerZ = 110;
      outerZ = 125;
    } else if (t <= 0.75) {
      const bendAngle = (t - 0.25) / 0.5 * Math.PI / 2;
      innerY = 96;
      innerZ = 110;
      outerY = 96 - 15 * Math.sin(bendAngle);
      outerZ = 110 + 15 * Math.cos(bendAngle);
    } else {
      const neckT = (t - 0.75) / 0.25;
      innerY = 96;
      outerY = 81;
      innerZ = outerZ = 110 - 10 * neckT;
    }
    return [[4, innerY, innerZ], [39, innerY, innerZ], [39, outerY, outerZ], [4, outerY, outerZ]];
  }, segments);
}

// Vertical downward inlet turning toward the shaft (-Y). Its horizontal
// outlet shares a paired 30 mm flange with Elbow 4 at y=71.
function addEntryElbowToShaft(parent, name, segments = 40) {
  addSweptSurface(parent, name, angle => {
    const t = angle / (Math.PI / 2);
    let innerY, innerZ, outerY, outerZ;
    if (t <= 0.25) {
      const neckT = t / 0.25;
      innerY = 81;
      outerY = 96;
      innerZ = outerZ = 100 - 10 * neckT;
    } else if (t <= 0.75) {
      const bendAngle = (t - 0.25) / 0.5 * Math.PI / 2;
      innerY = 81;
      innerZ = 90;
      outerY = 81 + 15 * Math.cos(bendAngle);
      outerZ = 90 - 15 * Math.sin(bendAngle);
    } else {
      const neckT = (t - 0.75) / 0.25;
      innerY = outerY = 81 - 10 * neckT;
      innerZ = 90;
      outerZ = 75;
    }
    return [[4, innerY, innerZ], [39, innerY, innerZ], [39, outerY, outerZ], [4, outerY, outerZ]];
  }, segments);
}

function addTransition(parent, name, rearY, frontY, rearProfile, frontProfile) {
  const ringCount = 48;
  const profile = (spec, angle) => {
    const cosine = Math.cos(angle), sine = Math.sin(angle);
    if (spec.type === "circle") return spec.radius;
    return Math.min(spec.hw / Math.max(Math.abs(cosine), 1e-9), spec.hh / Math.max(Math.abs(sine), 1e-9));
  };
  const positions = [];
  for (const [y, spec] of [[rearY, rearProfile], [frontY, frontProfile]]) {
    for (let index = 0; index < ringCount; index += 1) {
      const angle = index / ringCount * Math.PI * 2;
      const radius = profile(spec, angle);
      const point = systemPoint(21.5 + radius * Math.cos(angle), y, 119 + radius * Math.sin(angle));
      positions.push(point.x, point.y, point.z);
    }
  }
  const indices = [];
  for (let index = 0; index < ringCount; index += 1) {
    const next = (index + 1) % ringCount;
    indices.push(index, ringCount + index, next, next, ringCount + index, ringCount + next);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const mesh = new THREE.Mesh(geometry, material());
  mesh.name = name;
  parent.add(mesh);
  addEdges(parent, mesh);
}

function addCylinderY(parent, name, cx, cz, rearY, depth, radius, scaleX = 1, scaleZ = 1) {
  const geometry = new THREE.CylinderGeometry(radius * MM, radius * MM, depth * MM, 48, 1, true);
  const mesh = new THREE.Mesh(geometry, material());
  mesh.name = name;
  mesh.rotation.z = Math.PI / 2;
  mesh.scale.set(scaleZ, 1, scaleX);
  mesh.position.copy(systemPoint(cx, rearY - depth / 2, cz));
  parent.add(mesh);
  addEdges(parent, mesh);
}

function addRainHood(parent) {
  const pdf = [
    [4, 26, 592], [39, 26, 592], [39, 26, 607], [4, 26, 607],
    [4, 6, 592], [39, 6, 592], [39, -4, 607], [4, -4, 607]
  ];
  const vertices = pdf.map(point => systemPoint(...point));
  const positions = vertices.flatMap(point => [point.x, point.y, point.z]);
  const indices = [0, 4, 5, 0, 5, 1, 1, 5, 6, 1, 6, 2, 2, 6, 7, 2, 7, 3, 3, 7, 4, 3, 4, 0];
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const mesh = new THREE.Mesh(geometry, material());
  mesh.name = "rain-hood-shell";
  parent.add(mesh);
  addEdges(parent, mesh);
}

function addBuilding(scene) {
  const groups = {
    room: partGroup(scene, "room-structure"),
    ceiling: partGroup(scene, "ceiling-roof"),
    downlight: partGroup(scene, "downlight"),
    shaft: partGroup(scene, "shaft-structure"),
    sideAccess: partGroup(scene, "shaft-side-access"),
    topWalls: partGroup(scene, "shaft-top-walls"),
    frontMesh: partGroup(scene, "shaft-front-mesh"),
    glass: partGroup(scene, "glass-roof")
  };
  const fixed = 0xd9dde2;
  const glass = 0x9ed7e8;
  const slab = (parent, name, z0, z1) => {
    addPdfBox(parent, `${name}-right`, 84, 180, -15, 300, z0, z1, { opacity: 0.12, fixedColour: fixed, edgeOpacity: 0.38 });
    addPdfBox(parent, `${name}-front`, 0, 84, -15, 26, z0, z1, { opacity: 0.12, fixedColour: fixed, edgeOpacity: 0.38 });
    addPdfBox(parent, `${name}-rear`, 0, 84, 64, 300, z0, z1, { opacity: 0.12, fixedColour: fixed, edgeOpacity: 0.38 });
  };
  slab(groups.ceiling, "ceiling", 93, 95);
  slab(groups.ceiling, "roof", 143, 163);

  // One recessed ceiling downlight, moved 150 mm forward from the surveyed
  // position for duct clearance and kept clear of the shaft-wall footprint.
  const addDownlightCylinder = (parent, name, x, y, radius, height, centreZ) => {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * MM, radius * MM, height * MM, 48),
      material(1, 0xe3b52f)
    );
    mesh.name = name;
    mesh.position.copy(systemPoint(x, y, centreZ));
    mesh.userData.fixedColour = 0xe3b52f;
    parent.add(mesh);
    addEdges(parent, mesh);
  };
  addDownlightCylinder(groups.downlight, "downlight-trim", 93.25, 193.75, 8.25, 0.4, 93.0);
  addDownlightCylinder(groups.downlight, "downlight-recessed-body", 93.25, 193.75, 6.95, 3.5, 94.75);
  addPdfBox(groups.room, "back-wall", 0, 180, 300, 320, -175, 163, { opacity: 0.08, fixedColour: fixed, edgeOpacity: 0.35 });
  addPdfBox(groups.room, "left-wall", -20, 0, -35, 320, -175, 163, { opacity: 0.06, fixedColour: fixed, edgeOpacity: 0.3 });
  addPdfBox(groups.room, "right-wall", 180, 200, -35, 320, -175, 163, { opacity: 0.06, fixedColour: fixed, edgeOpacity: 0.3 });
  addPdfBox(groups.room, "floor", -20, 200, -35, 320, -185, -175, { opacity: 0.1, fixedColour: fixed, edgeOpacity: 0.35 });
  // Right wall: 380 mm clear access opening, sill +1,500 mm, height 1,700 mm.
  addPdfBox(groups.shaft, "shaft-right-front-jamb", 84, 99, 11, 26, 94, 587, { opacity: 0.12, fixedColour: fixed, edgeOpacity: 0.5 });
  addPdfBox(groups.shaft, "shaft-right-rear-jamb", 84, 99, 64, 79, 94, 587, { opacity: 0.12, fixedColour: fixed, edgeOpacity: 0.5 });
  addPdfBox(groups.shaft, "shaft-right-below-access", 84, 99, 26, 64, 94, 244, { opacity: 0.12, fixedColour: fixed, edgeOpacity: 0.5 });
  addPdfBox(groups.shaft, "shaft-right-above-access", 84, 99, 26, 64, 414, 587, { opacity: 0.12, fixedColour: fixed, edgeOpacity: 0.5 });
  addPdfBox(groups.shaft, "shaft-front", 0, 84, 11, 26, 94, 587, { opacity: 0.12, fixedColour: fixed, edgeOpacity: 0.5 });
  addPdfBox(groups.shaft, "shaft-left", -20, 0, 11, 79, 163, 587, { opacity: 0.12, fixedColour: fixed, edgeOpacity: 0.5 });
  // Rear shaft wall is continuous. The duct now passes below/around the shaft
  // bottom, so the brick, practical column and ring beam are not penetrated.
  addPdfBox(groups.shaft, "shaft-rear", 0, 84, 64, 79, 94, 587, { opacity: 0.12, fixedColour: fixed, edgeOpacity: 0.5 });

  const openingFrame = 0xe3b52f;
  addPdfBox(groups.sideAccess, "shaft-side-access-bottom", 83.8, 99.2, 24, 66, 242, 244, { fixedColour: openingFrame });
  addPdfBox(groups.sideAccess, "shaft-side-access-top", 83.8, 99.2, 24, 66, 414, 416, { fixedColour: openingFrame });
  addPdfBox(groups.sideAccess, "shaft-side-access-front", 83.8, 99.2, 24, 26, 244, 414, { fixedColour: openingFrame });
  addPdfBox(groups.sideAccess, "shaft-side-access-rear", 83.8, 99.2, 64, 66, 244, 414, { fixedColour: openingFrame });

  // Confirmed shaft-top structure: solid left/right/rear walls, removable wire
  // mesh only at the front, two 30 mm rails and 190 mm clear access height.
  addPdfBox(groups.topWalls, "shaft-top-left-wall", -20, 0, 11, 79, 587, 612, { opacity: 0.35, fixedColour: 0x75b78a });
  addPdfBox(groups.topWalls, "shaft-top-right-wall", 84, 99, 11, 79, 587, 612, { opacity: 0.35, fixedColour: 0x75b78a });
  addPdfBox(groups.topWalls, "shaft-top-rear-wall", 0, 84, 64, 79, 587, 612, { opacity: 0.35, fixedColour: 0x75b78a });
  addPdfBox(groups.frontMesh, "shaft-front-lower-frame", 0, 84, 11, 26, 587, 590, { fixedColour: openingFrame });
  addPdfBox(groups.frontMesh, "shaft-front-upper-frame", 0, 84, 11, 26, 609, 612, { fixedColour: openingFrame });
  addPdfBox(groups.frontMesh, "shaft-front-left-frame", 0, 3, 11, 26, 590, 609, { fixedColour: openingFrame });
  addPdfBox(groups.frontMesh, "shaft-front-right-frame", 81, 84, 11, 26, 590, 609, { fixedColour: openingFrame });
  for (let x = 7; x <= 77; x += 7) {
    addPdfBox(groups.frontMesh, `shaft-front-mesh-v-${x}`, x - 0.15, x + 0.15, 11, 12, 590, 609, { fixedColour: 0x707780 });
  }
  for (let z = 593; z <= 606; z += 3.25) {
    addPdfBox(groups.frontMesh, `shaft-front-mesh-h-${z}`, 3, 81, 11, 12, z - 0.15, z + 0.15, { fixedColour: 0x707780 });
  }
  // Glass follows the complete outside faces of the shaft-top walls, with the
  // surveyed 50 mm overhang only at the front and right sides.
  addPdfBox(groups.glass, "glass-roof", -20, 104, 6, 79, 612, 613, { opacity: 0.28, fixedColour: glass, edgeOpacity: 0.7 });
}

export function createDuctSystem(scene) {
  const straight1 = partGroup(scene, "straight-1");
  addRectShell(straight1, "straight-1", "z", { x0: 82.5, x1: 117.5, y0: 282, y1: 297, z0: 20.1, z1: 91.5 });
  addFlangeZ(straight1, "straight-1-bottom-flange", 100, 289.5, 20.1, 35, 15);
  addFlangeZ(straight1, "straight-1-top-flange", 100, 289.5, 91.5, 35, 15);

  const elbow1 = partGroup(scene, "elbow-1");
  addSquareThroatVerticalToY(elbow1, "elbow-1-shell", 82.5, 117.5, 282, 111.5, 91.5, 262);
  addFlangeZ(elbow1, "elbow-1-inlet-flange", 100, 289.5, 91.5, 35, 15);
  addFlangeY(elbow1, "elbow-1-outlet-flange", 100, 262, 119, 35, 15);

  const elbow2 = partGroup(scene, "elbow-2");
  addSweptSurface(elbow2, "elbow-2-shell", angle => {
    const si = Math.sin(angle), co = Math.cos(angle);
    const cx = 72.5 + 27.5 * co;
    const cy = 262 - 27.5 * si;
    return [
      [cx - 17.5 * co, cy + 17.5 * si, 111.5],
      [cx + 17.5 * co, cy - 17.5 * si, 111.5],
      [cx + 17.5 * co, cy - 17.5 * si, 126.5],
      [cx - 17.5 * co, cy + 17.5 * si, 126.5]
    ];
  });
  addFlangeY(elbow2, "elbow-2-inlet-flange", 100, 262, 119, 35, 15);
  addFlangeX(elbow2, "elbow-2-outlet-flange", 72.5, 234.5, 119, 35, 15);

  const straight2 = partGroup(scene, "straight-2");
  addRectShell(straight2, "straight-2", "x", { x0: 49, x1: 72.5, y0: 217, y1: 252, z0: 111.5, z1: 126.5 });
  addFlangeX(straight2, "straight-2-start-flange", 72.5, 234.5, 119, 35, 15);
  addFlangeX(straight2, "straight-2-end-flange", 49, 234.5, 119, 35, 15);

  const elbow3 = partGroup(scene, "elbow-3");
  addSweptSurface(elbow3, "elbow-3-shell", angle => {
    const si = Math.sin(angle), co = Math.cos(angle);
    const cx = 49 - 27.5 * si;
    const cy = 207 + 27.5 * co;
    return [
      [cx - 17.5 * si, cy + 17.5 * co, 111.5],
      [cx + 17.5 * si, cy - 17.5 * co, 111.5],
      [cx + 17.5 * si, cy - 17.5 * co, 126.5],
      [cx - 17.5 * si, cy + 17.5 * co, 126.5]
    ];
  });
  addFlangeX(elbow3, "elbow-3-inlet-flange", 49, 234.5, 119, 35, 15);
  addFlangeY(elbow3, "elbow-3-outlet-flange", 21.5, 207, 119, 35, 15);

  const rectTall = { type: "rectangle", hw: 7.5, hh: 17.5 };
  const rectWide = { type: "rectangle", hw: 17.5, hh: 7.5 };
  const circle = { type: "circle", radius: 12.5 };
  const transition1 = partGroup(scene, "transition-1");
  addTransition(transition1, "transition-1-shell", 207, 182, rectWide, circle);
  addCylinderY(transition1, "transition-1-collar", 21.5, 119, 182, 4, 12.5);
  addFlangeY(transition1, "transition-1-flange", 21.5, 207, 119, 35, 15);

  const fan = partGroup(scene, "fan");
  addCylinderY(fan, "fan-inlet-collar", 21.5, 119, 178, 2.5, 12.5);
  addCylinderY(fan, "fan-housing", 21.5, 119, 175.5, 15.5, 1, 17.45, 16.75);
  addCylinderY(fan, "fan-outlet-collar", 21.5, 119, 160, 2.5, 12.5);
  addPdfBox(fan, "fan-terminal-box", 38.95, 42.05, 163, 173, 111, 127);
  addPdfBox(fan, "fan-support-foot", 10.25, 32.75, 164, 172, 136.45, 139.45);

  const transition2 = partGroup(scene, "transition-2");
  addCylinderY(transition2, "transition-2-collar", 21.5, 119, 157.5, 4, 12.5);
  addTransition(transition2, "transition-2-shell", 153.5, 128.5, circle, rectWide);
  addFlangeY(transition2, "transition-2-flange", 21.5, 128.5, 119, 35, 15);

  const straight3 = partGroup(scene, "straight-3");
  addSlopedRectShellY(straight3, "straight-3", { x0: 4, x1: 39, y0: 106, y1: 128.5, z0: 117.5, z1: 119, height: 15 });
  addFlangeY(straight3, "straight-3-high-flange", 21.5, 128.5, 119, 35, 15);
  addFlangeY(straight3, "straight-3-end-flange", 21.5, 106, 117.5, 35, 15);

  const entryElbow1 = partGroup(scene, "entry-elbow-1");
  addEntryElbowDown(entryElbow1, "entry-elbow-1-shell");
  addFlangeY(entryElbow1, "entry-elbow-1-inlet-flange", 21.5, 106, 117.5, 35, 15);
  addFlangeZ(entryElbow1, "entry-elbow-1-outlet-flange", 21.5, 88.5, 100, 35, 15);

  const entryElbow2 = partGroup(scene, "entry-elbow-2");
  addEntryElbowToShaft(entryElbow2, "entry-elbow-2-shell");
  addFlangeZ(entryElbow2, "entry-elbow-2-inlet-flange", 21.5, 88.5, 100, 35, 15);
  addFlangeY(entryElbow2, "entry-elbow-2-outlet-flange", 21.5, 71, 82.5, 35, 15);

  const elbow4 = partGroup(scene, "elbow-4");
  addSquareThroatElbow(elbow4, "elbow-4-shell");
  addFlangeY(elbow4, "elbow-4-inlet-flange", 21.5, 71, 82.5, 35, 15);
  addFlangeZ(elbow4, "elbow-4-outlet-flange", 21.5, 53.5, 100, 35, 15);

  for (const [key, start, end] of [
    ["straight-4a", 100, 220],
    ["straight-4b", 220, 340],
    ["straight-4c", 340, 460],
    ["straight-4d", 460, 572]
  ]) {
    const group = partGroup(scene, key);
    addRectShell(group, key, "z", { x0: 4, x1: 39, y0: 46, y1: 61, z0: start, z1: end });
    addFlangeZ(group, `${key}-bottom-flange`, 21.5, 53.5, start, 35, 15);
    addFlangeZ(group, `${key}-top-flange`, 21.5, 53.5, end, 35, 15);
  }

  const elbow5 = partGroup(scene, "elbow-5");
  addSquareThroatVerticalToY(elbow5, "elbow-5-shell", 4, 39, 46, 592, 572, 26);
  addFlangeZ(elbow5, "elbow-5-inlet-flange", 21.5, 53.5, 572, 35, 15);

  const rainHood = partGroup(scene, "rain-hood");
  addRainHood(rainHood);
  addBuilding(scene);
}

export const systemDimensions = [
  { key: "straight-1", text: "715 mm", a: [100, 279, 20.1], b: [100, 279, 91.5] },
  { key: "elbow-1", text: "350 × 350 mm body span", a: [121, 262, 86], b: [121, 297, 86] },
  { key: "elbow-1", text: "R150 mm outer heel / square throat", a: [121, 282, 111.5], b: [121, 297, 126.5] },
  { key: "straight-2", text: "235 mm", a: [49, 212, 132], b: [72.5, 212, 132] },
  { key: "straight-3", text: "225 mm plan / 15 mm drop", a: [43, 106, 117.5], b: [43, 128.5, 119] },
  { key: "entry-elbow-1", text: "250 × 250 mm / R150", a: [43, 81, 129], b: [43, 106, 129] },
  { key: "entry-elbow-2", text: "250 × 250 mm / R150", a: [43, 71, 70], b: [43, 96, 70] },
  { key: "transition-1", text: "250 + 40 mm", a: [32, 178, 143], b: [32, 207, 143] },
  { key: "fan", text: "205 mm total", a: [43, 157.5, 143], b: [43, 178, 143] },
  { key: "transition-2", text: "40 + 250 mm", a: [32, 128.5, 143], b: [32, 157.5, 143] },
  { key: "entry-elbow-2", text: "paired 30 mm flange to Elbow 4", a: [46, 71, 72], b: [46, 71, 93] },
  { key: "entry-elbow-2", text: "10 mm flange clearance below shaft", a: [46, 76, 93], b: [46, 76, 94] },
  { key: "elbow-4", text: "250 × 250 mm body span", a: [43, 71, 72], b: [43, 46, 72] },
  { key: "elbow-4", text: "R150 mm outer heel", a: [43, 61, 75], b: [43, 46, 90] },
  { key: "elbow-4", text: "350 × 150 mm minimum", a: [42, 71, 75], b: [42, 71, 90] },
  { key: "straight-4a", text: "10 mm wall gap", a: [0, 43, 105], b: [1, 43, 105] },
  { key: "straight-4a", text: "1,200 mm / +60 to +1,260", a: [43, 66, 100], b: [43, 66, 220] },
  { key: "straight-4b", text: "1,200 mm / +1,260 to +2,460", a: [43, 66, 220], b: [43, 66, 340] },
  { key: "straight-4c", text: "1,200 mm / +2,460 to +3,660", a: [43, 66, 340], b: [43, 66, 460] },
  { key: "straight-4d", text: "1,120 mm / +3,660 to +4,780", a: [43, 66, 460], b: [43, 66, 572] },
  { key: "elbow-5", text: "350 × 350 mm body span", a: [43, 26, 616], b: [43, 61, 616] },
  { key: "elbow-5", text: "R150 mm outer heel / square throat", a: [43, 46, 592], b: [43, 61, 607] },
  { key: "downlight", text: "Ø165 / Ø139 mm", a: [85, 193.75, 92.6], b: [101.5, 193.75, 92.6] },
  { key: "rain-hood", text: "box +4,980 to +5,130 mm", a: [45, 3, 592], b: [45, 3, 607] },
  { key: "room-structure", text: "1,800 mm room width", a: [0, 305, -175], b: [180, 305, -175] },
  { key: "room-structure", text: "3,000 mm room depth", a: [190, 0, -175], b: [190, 300, -175] },
  { key: "room-structure", text: "2,680 mm floor to ceiling", a: [188, 292, -175], b: [188, 292, 93] },
  { key: "ceiling-roof", text: "480 mm ceiling void", a: [175, 292, 95], b: [175, 292, 143] },
  { key: "shaft-structure", text: "4,930 mm shaft wall", a: [104, 82, 94], b: [104, 82, 587] },
  { key: "shaft-structure", text: "840 mm clear width", a: [0, 70, 90], b: [84, 70, 90] },
  { key: "shaft-structure", text: "380 mm clear depth", a: [102, 26, 90], b: [102, 64, 90] },
  { key: "shaft-side-access", text: "sill +1,500 mm", a: [104, 70, 94], b: [104, 70, 244] },
  { key: "shaft-side-access", text: "1,700 mm opening height", a: [107, 70, 244], b: [107, 70, 414] },
  { key: "shaft-side-access", text: "380 mm clear depth", a: [102, 26, 329], b: [102, 64, 329] },
  { key: "shaft-front-mesh", text: "250 mm roof zone", a: [102, 10, 587], b: [102, 10, 612] },
  { key: "shaft-front-mesh", text: "30 mm lower frame", a: [105, 8, 587], b: [105, 8, 590] },
  { key: "shaft-front-mesh", text: "190 mm clear access", a: [108, 8, 590], b: [108, 8, 609] },
  { key: "shaft-front-mesh", text: "30 mm upper frame", a: [111, 8, 609], b: [111, 8, 612] },
  { key: "glass-roof", text: "1240 mm glass width", a: [-20, 3, 614], b: [104, 3, 614] },
  { key: "glass-roof", text: "730 mm glass depth", a: [107, 6, 614], b: [107, 79, 614] },
  { key: "glass-roof", text: "50 mm front overhang", a: [110, 6, 615], b: [110, 11, 615] },
  { key: "glass-roof", text: "50 mm right overhang", a: [99, 2, 615], b: [104, 2, 615] }
];

export const systemAngles = [
  ...["elbow-1", "elbow-2", "elbow-3", "entry-elbow-1", "entry-elbow-2", "elbow-4", "elbow-5"].map(key => ({ key, text: "90°" })),
  { key: "straight-3", text: "3.8° drop" }
];
