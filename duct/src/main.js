import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { infoContent, onboardingCopy, partInfoKey, partLabels, partTree, uiText } from "./content.js";
import { createDuctSystem, systemAngles, systemDimensions, systemPoint } from "./system.js";

  const root = document.getElementById("hood-left-side-plate");
  const stage = root.querySelector(".plate-stage");
  const controlsToggle = root.querySelector("[data-controls-toggle]");
  const controlsSidebar = root.querySelector(".left-sidebar");
  let controlsOpen = false;

  function setControlsOpen(open) {
    controlsOpen = open;
    root.classList.toggle("controls-open", open);
    controlsToggle.setAttribute("aria-expanded", String(open));
    const language = document.documentElement.lang === "en" ? "en" : "id";
    controlsToggle.setAttribute("aria-label", uiText[language][open ? "menuClose" : "menuOpen"]);
  }

  controlsToggle.addEventListener("click", () => setControlsOpen(!controlsOpen));
  document.addEventListener("click", event => {
    if (!controlsOpen || window.innerWidth > 860) return;
    if (controlsSidebar.contains(event.target) || controlsToggle.contains(event.target)) return;
    setControlsOpen(false);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && controlsOpen) setControlsOpen(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860 && controlsOpen) setControlsOpen(false);
  });
  const probe = document.createElement("span");
  probe.style.cssText = "position:absolute;visibility:hidden;pointer-events:none";
  root.appendChild(probe);
  const theme = token => {
    probe.style.color = `var(${token})`;
    return getComputedStyle(probe).color;
  };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 30000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0xffffff, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  stage.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xb8b8b8, 2.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.8);
  key.position.set(-250, 500, 650);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 1.2);
  fill.position.set(700, -100, -500);
  scene.add(fill);

  // Assembly seams use a fill-coloured line so touching sheet-metal parts do
  // not read as open gaps. True perimeter and opening outlines use the darker
  // detail material declared with the cover-plate helpers below.
  const sheetEdgeMaterial = new THREE.LineBasicMaterial({
    color: 0x000000,
    transparent: false,
    opacity: 1
  });

  const points = {
    L1: [600, 200],
    L2: [600, 300],
    L3: [0, 300],
    L4: [0, 0],
    L5: [100, 0]
  };

  const shape = new THREE.Shape();
  shape.moveTo(...points.L3);
  shape.lineTo(...points.L2);
  shape.lineTo(...points.L1);
  shape.lineTo(...points.L5);
  shape.lineTo(...points.L4);
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 1,
    bevelEnabled: false,
    curveSegments: 1,
    steps: 1
  });
  geometry.computeVertexNormals();
  const plate = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
    color: 0xffffff,
    transparent: false,
    opacity: 1,
    side: THREE.DoubleSide,
    shininess: 26
  }));
  plate.name = "Left-side-plate";
  scene.add(plate);

  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry, 1),
    sheetEdgeMaterial
  );
  edges.name = "Left-side-plate::outline";
  edges.renderOrder = 5;
  scene.add(edges);

  // Integral 30 mm flange folded 90° towards the right-hand side (-Z). L6 is
  // 60 mm from L5, while the opposite end stops 30 mm before L1.
  const dxSlope = points.L1[0] - points.L5[0];
  const dySlope = points.L1[1] - points.L5[1];
  const lengthSlope = Math.hypot(dxSlope, dySlope);
  const angleSlope = Math.atan2(dySlope, dxSlope);
  const unitSlopeX = dxSlope / lengthSlope;
  const unitSlopeY = dySlope / lengthSlope;
  const flangeStart = [
    points.L5[0] + unitSlopeX * 60,
    points.L5[1] + unitSlopeY * 60
  ];
  const flangeEnd = [
    points.L1[0] - unitSlopeX * 30,
    points.L1[1] - unitSlopeY * 30
  ];
  const flangeLength = lengthSlope - 90;
  const rightNormalX = Math.sin(angleSlope);
  const rightNormalY = -Math.cos(angleSlope);
  const flangeGeometry = new THREE.BoxGeometry(flangeLength, 1, 30);
  const flange = new THREE.Mesh(flangeGeometry, new THREE.MeshPhongMaterial({
    color: 0xffffff,
    transparent: false,
    opacity: 1,
    side: THREE.DoubleSide,
    shininess: 30
  }));
  flange.name = "Left-side-flange";
  flange.rotation.z = angleSlope;
  flange.position.set(
    (flangeEnd[0] + flangeStart[0]) / 2 + rightNormalX * 0.5,
    (flangeEnd[1] + flangeStart[1]) / 2 + rightNormalY * 0.5,
    -15
  );
  scene.add(flange);
  const flangeEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(flangeGeometry),
    sheetEdgeMaterial
  );
  flangeEdges.name = "Left-side-flange::outline";
  flangeEdges.rotation.copy(flange.rotation);
  flangeEdges.position.copy(flange.position);
  flangeEdges.renderOrder = 6;
  scene.add(flangeEdges);

  // Mirror the complete assembly across its width. The left plate occupies
  // Z = 0..1 mm; the right plate occupies Z = -1499..-1498 mm. This gives an
  // exact 1500 mm outside-to-outside width and 1498 mm between inner faces.
  const rightPlate = plate.clone();
  rightPlate.name = "Right-side-plate";
  rightPlate.scale.z = -1;
  rightPlate.position.z = -1498;
  scene.add(rightPlate);

  const rightEdges = edges.clone();
  rightEdges.name = "Right-side-plate::outline";
  rightEdges.scale.z = -1;
  rightEdges.position.z = -1498;
  scene.add(rightEdges);

  const rightFlange = flange.clone();
  rightFlange.name = "Right-side-flange";
  rightFlange.scale.z = -1;
  rightFlange.position.z = -1498 - flange.position.z;
  scene.add(rightFlange);

  const rightFlangeEdges = flangeEdges.clone();
  rightFlangeEdges.name = "Right-side-flange::outline";
  rightFlangeEdges.scale.z = -1;
  rightFlangeEdges.position.z = -1498 - flangeEdges.position.z;
  scene.add(rightFlangeEdges);

  // Six 1 mm cover plates connect matching edges of the left and right side
  // plates. The 1498 mm span is the clear distance between their inner faces.
  const coverMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    transparent: false,
    opacity: 1,
    side: THREE.DoubleSide,
    shininess: 24
  });
  const coverEdgeMaterial = new THREE.LineBasicMaterial({
    color: 0x000000,
    transparent: false,
    opacity: 1
  });
  const detailEdgeMaterial = new THREE.LineBasicMaterial({
    color: 0x000000,
    transparent: false,
    opacity: 1
  });

  function addCoverPlate(name, start, end) {
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const length = Math.hypot(dx, dy);
    // Add a 1 mm overlap at each end and into both side plates. This models a
    // closed sheet-metal joint rather than two solids meeting on a zero-width
    // mathematical line.
    const panelGeometry = new THREE.BoxGeometry(length + 2, 1, 1500);
    const panel = new THREE.Mesh(panelGeometry, coverMaterial);
    panel.name = name;
    panel.rotation.z = Math.atan2(dy, dx);
    panel.position.set(
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2,
      -749
    );
    scene.add(panel);

    const panelEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(panelGeometry),
      coverEdgeMaterial
    );
    panelEdges.name = `${name}::outline`;
    panelEdges.rotation.copy(panel.rotation);
    panelEdges.position.copy(panel.position);
    panelEdges.renderOrder = 4;
    scene.add(panelEdges);
  }

  function addAxisPlate(name, size, position, showEdges = true) {
    const panelGeometry = new THREE.BoxGeometry(...size);
    const panel = new THREE.Mesh(panelGeometry, coverMaterial);
    panel.name = name;
    panel.position.set(...position);
    scene.add(panel);
    if (!showEdges) return;
    const panelEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(panelGeometry),
      coverEdgeMaterial
    );
    panelEdges.name = `${name}::outline`;
    panelEdges.position.copy(panel.position);
    panelEdges.renderOrder = 4;
    scene.add(panelEdges);
  }

  function addClosedOutline(name, outlinePoints) {
    const vertices = [];
    for (let index = 0; index < outlinePoints.length; index += 1) {
      const start = outlinePoints[index];
      const end = outlinePoints[(index + 1) % outlinePoints.length];
      vertices.push(...start, ...end);
    }
    const outlineGeometry = new THREE.BufferGeometry();
    outlineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    const outline = new THREE.LineSegments(outlineGeometry, detailEdgeMaterial);
    outline.name = name;
    outline.renderOrder = 5;
    scene.add(outline);
  }

  // Top cover L2–L3–R3–R2, divided around a true 350 × 150 mm opening.
  // The opening runs from X=30 to X=180 and is centred across the width.
  addAxisPlate("Top-back-of-exhaust-hole", [30, 1, 1498], [15, 300, -749], false);
  addAxisPlate("Top-front-of-exhaust-hole", [420, 1, 1498], [390, 300, -749], false);
  addAxisPlate("Top-left-of-exhaust-hole", [150, 1, 574], [105, 300, -287], false);
  addAxisPlate("Top-right-of-exhaust-hole", [150, 1, 574], [105, 300, -1211], false);
  addClosedOutline("Top-outer-outline", [
    [0, 300.55, 0], [600, 300.55, 0],
    [600, 300.55, -1498], [0, 300.55, -1498]
  ]);
  addClosedOutline("Exhaust-hole-outline", [
    [180, 300.55, -574], [30, 300.55, -574],
    [30, 300.55, -924], [180, 300.55, -924]
  ]);

  // Back cover L3–L4–R4–R3, divided to leave the L3–P4–P5–P6 notch open.
  addAxisPlate("Back-below-P-notch", [1, 280, 1498], [0, 140, -749], false);
  addAxisPlate("Back-right-of-P-notch", [1, 20, 1478], [0, 290, -759], false);
  addClosedOutline("Back-notched-outline", [
    [0.55, 0, 0], [0.55, 0, -1498], [0.55, 300, -1498],
    [0.55, 300, -20], [0.55, 280, -20], [0.55, 280, 0]
  ]);

  // Two external wall-mounting rails on the rear face. Each rail is
  // 1,400 mm wide, 40 mm high and 3 mm thick. Their centrelines are 50 mm
  // from the top and bottom edges of the 300 mm-high rear panel.
  const railMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    shininess: 36
  });
  const anchorHoleMaterial = new THREE.MeshBasicMaterial({
    color: 0x111111,
    side: THREE.DoubleSide
  });
  const anchorHoleZPositions = [-149, -549, -949, -1349];

  function addWallRail(name, y) {
    const railGeometry = new THREE.BoxGeometry(3, 40, 1400);
    const rail = new THREE.Mesh(railGeometry, railMaterial);
    rail.name = name;
    rail.position.set(-2, y, -749);
    scene.add(rail);

    const railEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(railGeometry),
      detailEdgeMaterial
    );
    railEdges.name = `${name}::outline`;
    railEdges.position.copy(rail.position);
    railEdges.renderOrder = 6;
    scene.add(railEdges);

    const holes = new THREE.Group();
    holes.name = `${name}-anchor-holes`;
    anchorHoleZPositions.forEach((z, index) => {
      const hole = new THREE.Mesh(
        new THREE.CylinderGeometry(6, 6, 3.2, 24),
        anchorHoleMaterial
      );
      hole.name = `${name}-anchor-hole-${index + 1}`;
      hole.rotation.z = Math.PI / 2;
      hole.position.set(-2, y, z);
      hole.userData.fixedColour = 0x111111;
      holes.add(hole);
    });
    scene.add(holes);
  }

  addWallRail("Upper-wall-mounting-rail", 250);
  addWallRail("Lower-wall-mounting-rail", 50);

  const backPanelAnchorHoles = new THREE.Group();
  backPanelAnchorHoles.name = "Back-panel-anchor-holes";
  [50, 250].forEach(y => {
    anchorHoleZPositions.forEach((z, index) => {
      const hole = new THREE.Mesh(
        new THREE.CylinderGeometry(6, 6, 1.2, 24),
        anchorHoleMaterial
      );
      hole.name = `Back-panel-anchor-hole-${y}-${index + 1}`;
      hole.rotation.z = Math.PI / 2;
      hole.position.set(0, y, z);
      hole.userData.fixedColour = 0x111111;
      backPanelAnchorHoles.add(hole);
    });
  });
  scene.add(backPanelAnchorHoles);

  addCoverPlate("L5-L4-R4-R5", points.L5, points.L4);
  addCoverPlate("L6-L5-R5-R6", flangeStart, points.L5);
  addCoverPlate("L1-L2-R2-R1", points.L1, points.L2);
  addCoverPlate("L1-L7-R7-R1", points.L1, flangeEnd);

  const pPoints = {
    P1: [500, 280, 0],
    P2: [500, 280, -20],
    P3: [500, 300, -20],
    P4: [0, 280, 0],
    P5: [0, 280, -20],
    P6: [0, 300, -20]
  };
  addAxisPlate("P1-P2-P5-P4", [500, 1, 20], [250, 280, -10]);
  addAxisPlate("P2-P3-P6-P5", [500, 20, 1], [250, 290, -20]);

  const exhaustPoints = {
    EB1: [180, 300, -574],
    EB2: [30, 300, -574],
    EB3: [30, 300, -924],
    EB4: [180, 300, -924],
    ET1: [180, 330, -574],
    ET2: [30, 330, -574],
    ET3: [30, 330, -924],
    ET4: [180, 330, -924]
  };
  // Thirty-millimetre-high curb around the exhaust opening. Each 1 mm wall
  // sits outside the opening, preserving the full 350 × 150 mm clear size.
  addAxisPlate("EB1-EB2-ET2-ET1-curb", [150, 30, 1], [105, 315, -573.5]);
  addAxisPlate("EB2-EB3-ET3-ET2-curb", [1, 30, 350], [29.5, 315, -749]);
  addAxisPlate("EB3-EB4-ET4-ET3-curb", [150, 30, 1], [105, 315, -924.5]);
  addAxisPlate("EB4-EB1-ET1-ET4-curb", [1, 30, 350], [180.5, 315, -749]);

  // Full-width upstand at L5–R5: 30 mm high × 1500 mm wide. In the side
  // profile it is exactly 90° to the L5–L1 and R5–R1 sloping edges.
  const upNormalX = -Math.sin(angleSlope);
  const upNormalY = Math.cos(angleSlope);
  const l5PlateGeometry = new THREE.BoxGeometry(30, 1, 1500);
  const l5Plate = new THREE.Mesh(l5PlateGeometry, coverMaterial);
  l5Plate.name = "30H-1500W-L5-R5";
  l5Plate.rotation.z = angleSlope + Math.PI / 2;
  l5Plate.position.set(
    points.L5[0] + upNormalX * 15,
    points.L5[1] + upNormalY * 15,
    -749
  );
  scene.add(l5Plate);

  const l5PlateEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(l5PlateGeometry),
    coverEdgeMaterial
  );
  l5PlateEdges.name = "30H-1500W-L5-R5::outline";
  l5PlateEdges.rotation.copy(l5Plate.rotation);
  l5PlateEdges.position.copy(l5Plate.position);
  l5PlateEdges.renderOrder = 5;
  scene.add(l5PlateEdges);

  const fl1Point = [
    points.L5[0] + upNormalX * 30,
    points.L5[1] + upNormalY * 30
  ];
  const fl2Point = [points.L2[0] - 100, points.L2[1] - 50];

  // One-millimetre panel bounded by FL2–FR2–R8–L8. Its lower corners meet
  // the free edges of the opposed 30 mm flanges.
  const fl2Corners = [
    new THREE.Vector3(fl2Point[0], fl2Point[1], 0),
    new THREE.Vector3(fl2Point[0], fl2Point[1], -1498),
    new THREE.Vector3(flangeEnd[0], flangeEnd[1], -1468),
    new THREE.Vector3(flangeEnd[0], flangeEnd[1], -30)
  ];
  const fl2Normal = new THREE.Vector3()
    .subVectors(fl2Corners[1], fl2Corners[0])
    .cross(new THREE.Vector3().subVectors(fl2Corners[3], fl2Corners[0]))
    .normalize();
  const fl2Vertices = [];
  for (const direction of [0.5, -0.5]) {
    for (const corner of fl2Corners) {
      const vertex = corner.clone().addScaledVector(fl2Normal, direction);
      fl2Vertices.push(vertex.x, vertex.y, vertex.z);
    }
  }
  const fl2Indices = [
    0, 1, 2, 0, 2, 3,
    4, 6, 5, 4, 7, 6,
    0, 4, 5, 0, 5, 1,
    1, 5, 6, 1, 6, 2,
    2, 6, 7, 2, 7, 3,
    3, 7, 4, 3, 4, 0
  ];
  const fl2Geometry = new THREE.BufferGeometry();
  fl2Geometry.setAttribute("position", new THREE.Float32BufferAttribute(fl2Vertices, 3));
  fl2Geometry.setIndex(fl2Indices);
  fl2Geometry.computeVertexNormals();
  const fl2Plate = new THREE.Mesh(fl2Geometry, coverMaterial);
  fl2Plate.name = "FL2-FR2-R8-L8";
  scene.add(fl2Plate);
  const fl2PlateEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(fl2Geometry, 2),
    coverEdgeMaterial
  );
  fl2PlateEdges.name = "FL2-FR2-R8-L8::outline";
  fl2PlateEdges.renderOrder = 5;
  scene.add(fl2PlateEdges);

  // Three symmetrical Ø30 mm LED lights on the underside of the panel.
  const ledGeometry = new THREE.CylinderGeometry(15, 15, 3, 32);
  const ledMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    shininess: 45
  });
  const ledQuaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    fl2Normal
  );
  const lightMountMidpoint = fl2Corners[0].clone().lerp(fl2Corners[3], 0.5);
  // Overall width runs from Z=+1 to Z=-1499. These centres are therefore
  // exactly 250, 750 and 1250 mm from the left outside face.
  [-249, -749, -1249].forEach((centreZ, index) => {
    const lightPosition = new THREE.Vector3(
      lightMountMidpoint.x,
      lightMountMidpoint.y,
      centreZ
    ).addScaledVector(fl2Normal, 2);
    const light = new THREE.Mesh(ledGeometry, ledMaterial);
    light.name = `LED-${index + 1}`;
    light.quaternion.copy(ledQuaternion);
    light.position.copy(lightPosition);
    scene.add(light);
    const lightEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(ledGeometry, 30),
      detailEdgeMaterial
    );
    lightEdges.name = `LED-${index + 1}::outline`;
    lightEdges.quaternion.copy(ledQuaternion);
    lightEdges.position.copy(lightPosition);
    lightEdges.renderOrder = 6;
    scene.add(lightEdges);
  });

  // Three removable 490 × 470 × 30 mm baffle grilles. Together they occupy
  // 1,470 mm of the internal width, leaving the 20 mm cable-duct zone and
  // 4 mm fitting clearance at each outside edge. Their lower faces rest on
  // the line from the L5–R5 support to the FL2–FR2 support.
  const grilleMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    shininess: 38
  });
  const grilleEdgeMaterial = new THREE.LineBasicMaterial({
    color: 0x000000,
    transparent: false,
    opacity: 1
  });

  const grilleDepthStart = new THREE.Vector3(points.L5[0], points.L5[1], 0);
  const grilleDepthEnd = new THREE.Vector3(fl2Point[0], fl2Point[1], 0);
  const grilleDepthAxis = grilleDepthEnd.clone().sub(grilleDepthStart).normalize();
  const grilleWidthAxis = new THREE.Vector3(0, 0, -1);
  const grilleNormalAxis = new THREE.Vector3().crossVectors(grilleDepthAxis, grilleWidthAxis).normalize();
  const grilleRotation = new THREE.Quaternion().setFromRotationMatrix(
    new THREE.Matrix4().makeBasis(grilleWidthAxis, grilleNormalAxis, grilleDepthAxis)
  );
  const grilleBaseCentre = grilleDepthStart.clone().lerp(grilleDepthEnd, 0.5)
    .addScaledVector(grilleNormalAxis, 15);

  function addGrillePart(group, name, geometry, position, rotation = [0, 0, 0], edgeAngle = 22) {
    const part = new THREE.Mesh(geometry, grilleMaterial);
    part.name = name;
    part.position.set(...position);
    part.rotation.set(...rotation);
    group.add(part);

    const partEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry, edgeAngle),
      grilleEdgeMaterial
    );
    partEdges.position.copy(part.position);
    partEdges.rotation.copy(part.rotation);
    partEdges.renderOrder = 7;
    group.add(partEdges);
  }

  function addRemovableGrille(index, centreZ) {
    const grille = new THREE.Group();
    grille.name = `Removable-grille-${index}`;

    addGrillePart(grille, `Grille-${index}-frame-back`, new THREE.BoxGeometry(490, 30, 20), [0, 0, -225]);
    addGrillePart(grille, `Grille-${index}-frame-front`, new THREE.BoxGeometry(490, 30, 20), [0, 0, 225]);
    addGrillePart(grille, `Grille-${index}-frame-left`, new THREE.BoxGeometry(20, 30, 430), [-235, 0, 0]);
    addGrillePart(grille, `Grille-${index}-frame-right`, new THREE.BoxGeometry(20, 30, 430), [235, 0, 0]);

    const bladeWidth = 450;
    const halfBladeDepth = 12;
    const bladeRise = 14;
    const wingLength = Math.hypot(halfBladeDepth, bladeRise);
    const wingAngle = Math.atan2(bladeRise, halfBladeDepth);
    for (let bladeIndex = 0; bladeIndex < 14; bladeIndex += 1) {
      const bladeCentre = -195 + bladeIndex * 30;
      const wingGeometry = new THREE.BoxGeometry(bladeWidth, 1, wingLength);
      addGrillePart(
        grille,
        `Grille-${index}-baffle-${bladeIndex + 1}-rear`,
        wingGeometry,
        [0, 1, bladeCentre - halfBladeDepth / 2],
        [-wingAngle, 0, 0],
        30
      );
      addGrillePart(
        grille,
        `Grille-${index}-baffle-${bladeIndex + 1}-front`,
        wingGeometry,
        [0, 1, bladeCentre + halfBladeDepth / 2],
        [wingAngle, 0, 0],
        30
      );
    }

    [-150, 0, 150].forEach((x, stabiliserIndex) => {
      addGrillePart(
        grille,
        `Grille-${index}-rear-stabiliser-${stabiliserIndex + 1}`,
        new THREE.BoxGeometry(4, 4, 420),
        [x, -9, 0]
      );
    });

    grille.quaternion.copy(grilleRotation);
    grille.position.set(grilleBaseCentre.x, grilleBaseCentre.y, centreZ);
    scene.add(grille);
  }

  [-269, -759, -1249].forEach((centreZ, index) => {
    addRemovableGrille(index + 1, centreZ);
  });

  // Final Option D assembly. The detailed hood above remains the canonical
  // hood; this adds the connected duct, fan, shaft rise, outlet, and building
  // context using the last approved fabrication dimensions.
  createDuctSystem(scene);

  const annotationGroup = new THREE.Group();
  annotationGroup.name = "Dimensions-and-labels";
  scene.add(annotationGroup);

  const dimensionGroup = new THREE.Group();
  dimensionGroup.name = "Dimensions-and-angles";
  annotationGroup.add(dimensionGroup);
  const pointGroup = new THREE.Group();
  pointGroup.name = "Point-labels";
  annotationGroup.add(pointGroup);
  const annotationLayers = new Map();
  const pointLayers = new Map();
  function annotationLayer(partKey = "global", kind = "dimension") {
    const layers = kind === "point" ? pointLayers : annotationLayers;
    const parent = kind === "point" ? pointGroup : dimensionGroup;
    if (!layers.has(partKey)) {
      const layer = new THREE.Group();
      layer.name = `${kind === "point" ? "Points" : "Annotations"}-${partKey}`;
      layers.set(partKey, layer);
      parent.add(layer);
    }
    return layers.get(partKey);
  }

  function labelSprite(text, x, y, z, partKey = "global", kind = "dimension") {
    const canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 112;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#000";
    const longLabel = text.length > 4;
    let fontSize = longLabel ? 44 : 58;
    context.font = `500 ${fontSize}px sans-serif`;
    while (context.measureText(text).width > 292 && fontSize > 24) {
      fontSize -= 2;
      context.font = `500 ${fontSize}px sans-serif`;
    }
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, 160, 58);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: true,
      depthWrite: false
    }));
    sprite.position.set(x, y, z);
    sprite.scale.set(longLabel ? 104 : 72, longLabel ? 36 : 36, 1);
    sprite.renderOrder = 20;
    annotationLayer(partKey, kind).add(sprite);
    return sprite;
  }

  labelSprite("L1", 620, 190, 3, "left-side", "point");
  labelSprite("L2", 618, 319, 3, "left-side", "point");
  labelSprite("L3", -18, 319, 3, "left-side", "point");
  labelSprite("L4", -18, -20, 3, "left-side", "point");
  labelSprite("L5", 104, -20, 3, "left-side", "point");
  labelSprite("L6", flangeStart[0] + 5, flangeStart[1] + 19, 3, "left-flange", "point");
  labelSprite("L7", flangeEnd[0] - 5, flangeEnd[1] - 19, 3, "left-flange", "point");
  labelSprite("L8", flangeEnd[0] - 5, flangeEnd[1] - 19, -33, "left-flange", "point");
  labelSprite("L9", flangeStart[0] + 5, flangeStart[1] + 19, -33, "left-flange", "point");
  labelSprite("FL1", fl1Point[0] - 7, fl1Point[1] + 8, 3, "left-side", "point");
  labelSprite("FL2", fl2Point[0] - 8, fl2Point[1] + 8, 3, "left-side", "point");

  labelSprite("R1", 620, 190, -1502, "right-side", "point");
  labelSprite("R2", 618, 319, -1502, "right-side", "point");
  labelSprite("R3", -18, 319, -1502, "right-side", "point");
  labelSprite("R4", -18, -20, -1502, "right-side", "point");
  labelSprite("R5", 104, -20, -1502, "right-side", "point");
  labelSprite("R6", flangeStart[0] + 5, flangeStart[1] + 19, -1502, "right-flange", "point");
  labelSprite("R7", flangeEnd[0] - 5, flangeEnd[1] - 19, -1502, "right-flange", "point");
  labelSprite("R8", flangeEnd[0] - 5, flangeEnd[1] - 19, -1464, "right-flange", "point");
  labelSprite("R9", flangeStart[0] + 5, flangeStart[1] + 19, -1464, "right-flange", "point");
  labelSprite("FR1", fl1Point[0] - 7, fl1Point[1] + 8, -1502, "right-side", "point");
  labelSprite("FR2", fl2Point[0] - 8, fl2Point[1] + 8, -1502, "right-side", "point");

  labelSprite("P1", pPoints.P1[0], pPoints.P1[1] - 8, 4, "cable-duct", "point");
  labelSprite("P2", pPoints.P2[0], pPoints.P2[1] - 8, -24, "cable-duct", "point");
  labelSprite("P3", pPoints.P3[0], pPoints.P3[1] + 8, -24, "cable-duct", "point");
  labelSprite("P4", pPoints.P4[0] - 8, pPoints.P4[1] - 8, 4, "cable-duct", "point");
  labelSprite("P5", pPoints.P5[0] - 8, pPoints.P5[1] - 8, -24, "cable-duct", "point");
  labelSprite("P6", pPoints.P6[0] - 8, pPoints.P6[1] + 8, -24, "cable-duct", "point");

  labelSprite("EB1", exhaustPoints.EB1[0], 292, exhaustPoints.EB1[2], "exhaust-curb", "point");
  labelSprite("EB2", exhaustPoints.EB2[0], 292, exhaustPoints.EB2[2], "exhaust-curb", "point");
  labelSprite("EB3", exhaustPoints.EB3[0], 292, exhaustPoints.EB3[2], "exhaust-curb", "point");
  labelSprite("EB4", exhaustPoints.EB4[0], 292, exhaustPoints.EB4[2], "exhaust-curb", "point");
  labelSprite("ET1", exhaustPoints.ET1[0], 338, exhaustPoints.ET1[2], "exhaust-curb", "point");
  labelSprite("ET2", exhaustPoints.ET2[0], 338, exhaustPoints.ET2[2], "exhaust-curb", "point");
  labelSprite("ET3", exhaustPoints.ET3[0], 338, exhaustPoints.ET3[2], "exhaust-curb", "point");
  labelSprite("ET4", exhaustPoints.ET4[0], 338, exhaustPoints.ET4[2], "exhaust-curb", "point");

  const dimensionMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
  const endpointGeometry = new THREE.SphereGeometry(3.2, 10, 8);
  const endpointMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

  function vector3(value) {
    return value instanceof THREE.Vector3 ? value.clone() : new THREE.Vector3(...value);
  }

  function addMetric(text, startValue, endValue, labelValue = null, partKey = "global") {
    const layer = annotationLayer(partKey);
    const start = vector3(startValue);
    const end = vector3(endValue);
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    const line = new THREE.Line(geometry, dimensionMaterial);
    layer.add(line);
    for (const point of [start, end]) {
      const marker = new THREE.Mesh(endpointGeometry, endpointMaterial);
      marker.position.copy(point);
      layer.add(marker);
    }
    const labelPosition = labelValue ? vector3(labelValue) : start.clone().lerp(end, 0.5);
    labelSprite(text, labelPosition.x, labelPosition.y, labelPosition.z, partKey);
  }

  function addAngleMetric(text, centreValue, radius, startAngle, endAngle, z, labelRadius = null, partKey = "global") {
    const layer = annotationLayer(partKey);
    const centre = vector3(centreValue);
    const pointsOnArc = [];
    for (let index = 0; index <= 32; index += 1) {
      const angle = startAngle + (endAngle - startAngle) * index / 32;
      pointsOnArc.push(new THREE.Vector3(
        centre.x + Math.cos(angle) * radius,
        centre.y + Math.sin(angle) * radius,
        z
      ));
    }
    layer.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pointsOnArc),
      dimensionMaterial
    ));
    const middleAngle = (startAngle + endAngle) / 2;
    const labelDistance = labelRadius || radius + 34;
    labelSprite(
      text,
      centre.x + Math.cos(middleAngle) * labelDistance,
      centre.y + Math.sin(middleAngle) * labelDistance,
      z,
      partKey
    );
  }

  // Main hood envelope and side-profile fabrication dimensions.
  addMetric("600 mm", [0, 342, 45], [600, 342, 45], [300, 366, 45], "left-side");
  addMetric("300 mm", [-42, 0, 45], [-42, 300, 45], [-76, 150, 45], "left-side");
  addMetric("100 mm", [642, 200, 45], [642, 300, 45], [678, 250, 45], "left-side");
  addMetric("100 mm", [0, -42, 45], [100, -42, 45], [50, -68, 45], "left-side");
  addMetric("538.5 mm", [100, 0, 45], [600, 200, 45], [355, 72, 45], "left-side");
  addMetric("1,500 mm overall", [-68, 338, 1], [-68, 338, -1499], [-68, 382, -749], "top-cover");
  addMetric("1 mm sheet", [18, 322, 0], [18, 322, 1], [18, 360, 0.5], "left-side");

  // Only the two non-right side-profile corners receive angle labels.
  addAngleMetric("158.2°", [100, 0, 45], 76, angleSlope, Math.PI, 45, 112, "left-side");
  addAngleMetric("111.8°", [600, 200, 45], 62, Math.PI / 2, Math.PI + angleSlope, 45, 102, "left-side");
  addAngleMetric("slope 21.8°", [100, 0, 45], 132, 0, angleSlope, 45, 174, "left-side");

  // Integral side flange.
  addMetric("60 mm setback", [points.L5[0], points.L5[1], -42], [flangeStart[0], flangeStart[1], -42], null, "left-flange");
  addMetric("448.5 mm flange", [flangeStart[0], flangeStart[1], -46], [flangeEnd[0], flangeEnd[1], -46], null, "left-flange");
  addMetric("30 mm setback", [flangeEnd[0], flangeEnd[1], -42], [points.L1[0], points.L1[1], -42], null, "left-flange");
  const flangeMiddle = new THREE.Vector3(
    (flangeStart[0] + flangeEnd[0]) / 2,
    (flangeStart[1] + flangeEnd[1]) / 2,
    0
  );
  addMetric("30 mm flange", flangeMiddle, flangeMiddle.clone().setZ(-30), flangeMiddle.clone().add(new THREE.Vector3(0, 28, -15)), "left-flange");

  // Exhaust opening, curb and rear setback.
  addMetric("150 mm", [30, 352, -552], [180, 352, -552], [105, 378, -552], "exhaust-curb");
  addMetric("350 mm", [198, 352, -574], [198, 352, -924], [232, 352, -749], "exhaust-curb");
  addMetric("30 mm rear setback", [0, 365, -530], [30, 365, -530], [15, 395, -530], "exhaust-curb");
  addMetric("30 mm curb height", [205, 300, -535], [205, 330, -535], [242, 315, -535], "exhaust-curb");

  // Front light/support panel offsets and LED pattern.
  addMetric("100 mm back", [600, 334, -35], [500, 334, -35], [550, 362, -35], "light-panel");
  addMetric("50 mm down", [622, 300, -35], [622, 250, -35], [660, 275, -35], "light-panel");
  addMetric("Ø30 mm LED", [lightMountMidpoint.x, lightMountMidpoint.y, -234], [lightMountMidpoint.x, lightMountMidpoint.y, -264], [lightMountMidpoint.x + 52, lightMountMidpoint.y, -249], "light-panel");
  addMetric("250 mm", [570, 286, 1], [570, 286, -249], [606, 286, -124], "light-panel");
  addMetric("500 mm centres", [570, 286, -249], [570, 286, -749], [606, 286, -499], "light-panel");
  addMetric("500 mm centres", [570, 286, -749], [570, 286, -1249], [606, 286, -999], "light-panel");
  addMetric("250 mm", [570, 286, -1249], [570, 286, -1499], [606, 286, -1374], "light-panel");

  // One removable grille represents all three identical units.
  addMetric("490 mm grille", [grilleBaseCentre.x, grilleBaseCentre.y + 42, -24], [grilleBaseCentre.x, grilleBaseCentre.y + 42, -514], [grilleBaseCentre.x + 48, grilleBaseCentre.y + 42, -269], "removable-grille-1");
  addMetric("470 mm grille", grilleDepthStart.clone().setZ(-544), grilleDepthEnd.clone().setZ(-544), grilleDepthStart.clone().lerp(grilleDepthEnd, 0.5).add(new THREE.Vector3(42, 22, -544)), "removable-grille-1");
  addMetric("30 mm grille depth", grilleBaseCentre.clone().setZ(-544), grilleBaseCentre.clone().addScaledVector(grilleNormalAxis, 30).setZ(-544), null, "removable-grille-1");

  // Wall rails and cable duct.
  addMetric("1,400 mm rail", [-18, 288, -49], [-18, 288, -1449], [-18, 322, -749], "upper-rail");
  addMetric("40 mm", [-18, 230, -1475], [-18, 270, -1475], [-18, 250, -1530], "upper-rail");
  addMetric("3 mm thick", [-3.5, 285, -1475], [-0.5, 285, -1475], [28, 285, -1475], "upper-rail");
  addMetric("50 mm", [-22, 300, -20], [-22, 250, -20], [-52, 275, -20], "upper-rail");
  addMetric("20 × 20 mm cable duct", [500, 280, -20], [500, 300, -20], [548, 290, -20], "cable-duct");

  // Complete-system dimensions. Labels live in the same per-part layers as
  // the hood annotations, so hiding or isolating a part also hides its notes.
  const notatedSystemParts = new Set();
  systemDimensions.forEach(({ key: partKey, text, a, b }) => {
    const start = systemPoint(...a);
    const end = systemPoint(...b);
    const lateral = partKey === "downlight"
      ? new THREE.Vector3(180, 150, 0)
      : new THREE.Vector3(42, 24, 42);
    addMetric(text, start, end, start.clone().lerp(end, 0.5).add(lateral), partKey);
    if (notatedSystemParts.has(partKey)) return;
    notatedSystemParts.add(partKey);
    const notation = {
      "straight-1": "L-1", "straight-2": "L-2", "straight-3": "L-3", "straight-3-connector": "L-3C",
      "transition-1": "T-1", fan: "FAN-1", "transition-2": "T-2",
      "straight-4a": "L-4A", "straight-4b": "L-4B", "straight-4c": "L-4C",
      "straight-4d": "L-4D",
      downlight: "DL-1",
      "rain-hood": "RNH-1",
      "room-structure": "ROOM",
      "ceiling-roof": "CEILING",
      "shaft-structure": "SHAFT",
      "shaft-side-access": "SIDE ACCESS",
      "shaft-front-mesh": "FRONT MESH"
    }[partKey] || partKey;
    const notationOffset = partKey === "downlight"
      ? new THREE.Vector3(-170, 90, 0)
      : new THREE.Vector3(56, 42, 56);
    labelSprite(
      notation,
      end.x + notationOffset.x,
      end.y + notationOffset.y,
      end.z + notationOffset.z,
      partKey,
      "point"
    );
  });
  systemAngles.forEach(({ key: partKey, text }) => {
    const anchors = {
      "elbow-1": systemPoint(100, 262, 119),
      "elbow-2": systemPoint(72.5, 234.5, 119),
      "elbow-3": systemPoint(21.5, 207, 119),
      "elbow-4": systemPoint(21.5, 53.5, 100),
      "elbow-5": systemPoint(21.5, 26, 599.5)
      ,"straight-3": systemPoint(21.5, 104.75, 100.75)
    };
    const centre = anchors[partKey];
    labelSprite(text, centre.x + 64, centre.y + 64, centre.z + 64, partKey);
    labelSprite({
      "elbow-1": "S-1", "elbow-2": "S-2", "elbow-3": "S-3",
      "elbow-4": "S-4", "elbow-5": "S-5", "straight-3": "L-3"
    }[partKey], centre.x + 64, centre.y + 108, centre.z + 64, partKey, "point");
  });

  function classifyPart(name) {
    const base = name.replace("::outline", "");
    if (base.startsWith("SYS:")) {
      const keyName = base.slice(4);
      return [keyName, partLabels.en[keyName] || keyName];
    }
    if (base.startsWith("Left-side-plate")) return ["left-side", "Left side plate"];
    if (base.startsWith("Right-side-plate")) return ["right-side", "Right side plate"];
    if (base.startsWith("Left-side-flange")) return ["left-flange", "Left folded flange"];
    if (base.startsWith("Right-side-flange")) return ["right-flange", "Right folded flange"];
    if (base.startsWith("Top-") || base === "Exhaust-hole-outline") return ["top-cover", "Top cover plate"];
    if (base.startsWith("Back-")) return ["rear-panel", "Rear wall plate"];
    if (base.startsWith("Upper-wall")) return ["upper-rail", "Upper wall rail"];
    if (base.startsWith("Lower-wall")) return ["lower-rail", "Lower wall rail"];
    if (base === "L5-L4-R4-R5") return ["rear-bottom", "Rear bottom plate"];
    if (base === "L6-L5-R5-R6") return ["rear-grille-lip", "Rear grille support lip"];
    if (base === "L1-L2-R2-R1") return ["front-face", "Front vertical face"];
    if (base === "L1-L7-R7-R1") return ["front-grille-lip", "Front grille support lip"];
    if (base.startsWith("P1-") || base.startsWith("P2-")) return ["cable-duct", "20 × 20 cable duct"];
    if (base.startsWith("EB")) return ["exhaust-curb", "Exhaust curb"];
    if (base === "30H-1500W-L5-R5") return ["l5-support", "L5-R5 support"];
    if (base === "FL2-FR2-R8-L8") return ["light-panel", "LED carrier panel"];
    if (base.startsWith("LED-")) return [base.toLowerCase(), base.replace("-", " ")];
    if (base.startsWith("Removable-grille-")) return [base.toLowerCase(), base.replaceAll("-", " ")];
    return [base.toLowerCase().replaceAll(" ", "-"), base.replaceAll("-", " ")];
  }

  const partRegistry = new Map();
  scene.children.forEach(object => {
    if (!object.name || object === annotationGroup || object.isLight) return;
    const [keyName, label] = classifyPart(object.name);
    if (!partRegistry.has(keyName)) partRegistry.set(keyName, { label, objects: [] });
    partRegistry.get(keyName).objects.push(object);
  });

  const partsContainer = root.querySelector("[data-parts]");
  const partVisibility = new Map([...partRegistry.keys()].map(partKey => [partKey, true]));
  const nodeControls = new Map();
  let highlightedPartKeys = new Set();
  let activeFocusNodeId = null;
  let visibilityBeforeFocus = null;
  let visibilityWasManuallyChanged = false;

  let currentLanguage = "id";
  const onboardingState = { active: false, step: 0, highlighted: null };

  function translatedPartLabel(key) {
    return partLabels[currentLanguage]?.[key] || partLabels.en[key] || key;
  }

  function setPartVisibility(partKey, visible) {
    const entry = partRegistry.get(partKey);
    if (!entry) return;
    partVisibility.set(partKey, visible);
    entry.objects.forEach(object => { object.visible = visible; });
    const dimensionLayer = annotationLayers.get(partKey);
    if (dimensionLayer) dimensionLayer.visible = visible;
    const pointsLayer = pointLayers.get(partKey);
    if (pointsLayer) pointsLayer.visible = visible;
  }

  function collectPartKeys(node) {
    if (typeof node === "string") return partRegistry.has(node) ? [node] : [];
    return node.children.flatMap(collectPartKeys);
  }

  function createNodeActions(nodeId, labelKey, infoKey, partKeys, labelElement) {
    const actions = document.createElement("span");
    actions.className = "part-actions";
    const eyeButton = document.createElement("button");
    eyeButton.type = "button";
    eyeButton.className = "part-icon part-eye";
    eyeButton.textContent = "👁";
    eyeButton.dataset.visibility = "visible";
    const targetButton = document.createElement("button");
    targetButton.type = "button";
    targetButton.className = "part-icon part-target";
    targetButton.textContent = "◎";
    targetButton.setAttribute("aria-pressed", "false");
    for (const button of [eyeButton, targetButton]) {
      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
      });
    }
    eyeButton.addEventListener("click", () => toggleNodeVisibility(nodeId));
    targetButton.addEventListener("click", () => toggleNodeFocus(nodeId));
    actions.append(eyeButton, targetButton);
    nodeControls.set(nodeId, { labelKey, infoKey, partKeys, eyeButton, targetButton, labelElement });
    return actions;
  }

  function renderPartLeaf(partKey, parent, index) {
    const entry = partRegistry.get(partKey);
    if (!entry) return;
    const nodeId = `part-${partKey}`;
    const row = document.createElement("div");
    row.className = "part-row";
    const label = document.createElement("span");
    label.className = "part-name";
    label.textContent = translatedPartLabel(partKey);
    row.append(label, createNodeActions(
      nodeId,
      partKey,
      partInfoKey[partKey] || partKey,
      [partKey],
      label
    ));
    parent.appendChild(row);
  }

  let partIndex = 0;
  function renderPartNode(node, parent, depth = 0) {
    if (typeof node === "string") {
      renderPartLeaf(node, parent, partIndex++);
      return;
    }
    const details = document.createElement("details");
    details.className = "part-branch";
    details.open = depth < 2;
    const summary = document.createElement("summary");
    const label = document.createElement("span");
    label.className = "branch-label";
    label.textContent = translatedPartLabel(node.id);
    const nodeId = `group-${node.id}`;
    summary.append(label, createNodeActions(nodeId, node.id, node.id, collectPartKeys(node), label));
    const children = document.createElement("div");
    children.className = "part-children";
    node.children.forEach(child => renderPartNode(child, children, depth + 1));
    details.append(summary, children);
    parent.appendChild(details);
  }
  partTree.forEach(node => renderPartNode(node, partsContainer));

  const infoElements = {
    title: root.querySelector("[data-info-title]"),
    description: root.querySelector("[data-info-description]"),
    materials: root.querySelector("[data-info-materials]"),
    measurements: root.querySelector("[data-info-measurements]"),
    angles: root.querySelector("[data-info-angles]"),
    instructions: root.querySelector("[data-info-instructions]")
  };
  const infoTabs = [...root.querySelectorAll("[data-info-tab]")];
  const infoPanels = [...root.querySelectorAll("[data-info-panel]")];
  let activeInfoTab = "description";

  function selectInfoTab(tabKey, focus = false) {
    activeInfoTab = tabKey;
    infoTabs.forEach(tab => {
      const selected = tab.dataset.infoTab === tabKey;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
    infoPanels.forEach(panel => {
      panel.hidden = panel.dataset.infoPanel !== tabKey;
    });
  }

  infoTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectInfoTab(tab.dataset.infoTab));
    tab.addEventListener("keydown", event => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + infoTabs.length) % infoTabs.length;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % infoTabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = infoTabs.length - 1;
      selectInfoTab(infoTabs[nextIndex].dataset.infoTab, true);
    });
  });
  selectInfoTab(activeInfoTab);

  function hasVisibleParts(node) {
    return collectPartKeys(node).some(partKey => partVisibility.get(partKey));
  }

  function currentInfoKey() {
    if (activeFocusNodeId) return nodeControls.get(activeFocusNodeId)?.infoKey || "hood";
    const hoodNode = partTree[0];
    if (!visibilityWasManuallyChanged) return hoodNode.id;
    const allVisible = [...partVisibility.values()].every(Boolean);
    if (allVisible) return "hood";
    return hoodNode.children.find(hasVisibleParts)?.id || "hood";
  }

  function replaceList(list, values = []) {
    list.replaceChildren(...values.map(value => {
      const item = document.createElement("li");
      item.textContent = value;
      return item;
    }));
  }

  function renderInfoSidebar() {
    const key = currentInfoKey();
    const content = infoContent[currentLanguage]?.[key] || infoContent[currentLanguage]?.hood;
    if (!content) return;
    infoElements.title.textContent = translatedPartLabel(key);
    infoElements.description.textContent = content.description;
    replaceList(infoElements.materials, content.materials);
    replaceList(infoElements.measurements, content.measurements);
    replaceList(infoElements.angles, content.angles);
    replaceList(infoElements.instructions, content.instructions);
  }

  function applyLanguage(language) {
    currentLanguage = language;
    const text = uiText[language];
    document.documentElement.lang = language;
    document.title = text.viewerTitle;
    root.querySelectorAll("[data-language]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.language === language));
    });
    root.querySelectorAll("[data-i18n]").forEach(element => {
      element.textContent = text[element.dataset.i18n];
    });
    root.querySelector("[data-nav-title]").textContent = text.navigation;
    root.querySelector("[data-nav-rotate]").textContent = text.rotate;
    root.querySelector("[data-nav-pan]").textContent = text.pan;
    root.querySelector("[data-nav-zoom]").textContent = text.zoom;
    root.querySelector("[data-nav-focus]").textContent = text.focus;
    root.querySelector("[data-info-eyebrow]").textContent = text.activeComponent;
    const guide = onboardingCopy[language];
    const guideButton = root.querySelector("[data-onboarding-open]");
    guideButton.setAttribute("aria-label", guide.openLabel);
    guideButton.querySelector("[data-guide-label]").textContent = guide.guide;
    root.querySelectorAll("[data-info-heading]").forEach(element => {
      element.textContent = text[element.dataset.infoHeading];
    });
    controlsToggle.setAttribute("aria-label", text[controlsOpen ? "menuClose" : "menuOpen"]);
    const activeControl = activeFocusNodeId ? nodeControls.get(activeFocusNodeId) : null;
    root.querySelector("[data-caption]").textContent = activeControl
      ? translatedPartLabel(activeControl.labelKey)
      : text.completeCaption;
    updateNodeControls();
    if (onboardingState.active) renderOnboardingStep();
  }

  root.querySelectorAll("[data-language]").forEach(button => {
    button.addEventListener("click", () => applyLanguage(button.dataset.language));
  });

  function updateNodeControls() {
    nodeControls.forEach((control, nodeId) => {
      const label = translatedPartLabel(control.labelKey);
      control.labelElement.textContent = label;
      const visibleCount = control.partKeys.filter(partKey => partVisibility.get(partKey)).length;
      const visibility = visibleCount === 0
        ? "hidden"
        : visibleCount === control.partKeys.length ? "visible" : "partial";
      control.eyeButton.dataset.visibility = visibility;
      control.eyeButton.textContent = "👁";
      control.eyeButton.setAttribute(
        "aria-label",
        `${visibility === "visible" ? uiText[currentLanguage].hide : uiText[currentLanguage].show} ${label}`
      );
      control.targetButton.setAttribute(
        "aria-label",
        `${uiText[currentLanguage].isolate} ${label}`
      );
      control.targetButton.setAttribute("aria-pressed", String(activeFocusNodeId === nodeId));
    });
    renderInfoSidebar();
  }

  function restoreFocusVisibility() {
    if (!visibilityBeforeFocus) return;
    visibilityBeforeFocus.forEach((visible, partKey) => setPartVisibility(partKey, visible));
  }

  function clearFocusMode(restoreVisibility = true) {
    if (restoreVisibility) restoreFocusVisibility();
    activeFocusNodeId = null;
    visibilityBeforeFocus = null;
    highlightedPartKeys = new Set();
    root.querySelector("[data-caption]").textContent = uiText[currentLanguage].completeCaption;
    updateNodeControls();
    applyColourMode(colourModeToggle.checked);
  }

  function toggleNodeVisibility(nodeId) {
    const control = nodeControls.get(nodeId);
    if (!control) return;
    if (activeFocusNodeId) clearFocusMode(true);
    const shouldShow = !control.partKeys.every(partKey => partVisibility.get(partKey));
    control.partKeys.forEach(partKey => setPartVisibility(partKey, shouldShow));
    visibilityWasManuallyChanged = true;
    updateNodeControls();
  }

  function toggleNodeFocus(nodeId) {
    const control = nodeControls.get(nodeId);
    if (!control) return;
    if (activeFocusNodeId === nodeId) {
      clearFocusMode(true);
      return;
    }
    if (activeFocusNodeId) restoreFocusVisibility();
    visibilityBeforeFocus = new Map(partVisibility);
    activeFocusNodeId = nodeId;
    highlightedPartKeys = new Set(control.partKeys);
    partRegistry.forEach((entry, partKey) => {
      setPartVisibility(partKey, highlightedPartKeys.has(partKey));
    });
    updateNodeControls();
    applyColourMode(colourModeToggle.checked);
    focusCameraOnParts(control.partKeys, translatedPartLabel(control.labelKey));
  }

  updateNodeControls();
  applyLanguage("id");

  function colourForPart(partKey, colourCoded) {
    if (partKey.startsWith("led-") || partKey === "downlight") return 0xe3b52f;
    if (highlightedPartKeys.has(partKey)) return 0xffd21f;
    if (!colourCoded) return 0xc4c9cf;
    if (partKey.startsWith("removable-grille-")) return 0xd95d67;
    if (partKey.includes("rail")) return 0xe3b52f;
    if (partKey.startsWith("elbow-")) return 0xb15aa0;
    if (partKey.startsWith("transition-")) return 0x49a96f;
    if (partKey === "fan") return 0xe8893f;
    if (partKey === "rain-hood") return 0xc99c2b;
    return 0x2f70c9;
  }

  function applyColourMode(colourCoded) {
    partRegistry.forEach((entry, partKey) => {
      const colour = colourForPart(partKey, colourCoded);
      entry.objects.forEach(object => {
        object.traverse(child => {
          if (!child.isMesh || !child.material) return;
          if (!child.userData.viewerMaterialCloned) {
            child.material = Array.isArray(child.material)
              ? child.material.map(material => material.clone())
              : child.material.clone();
            child.userData.viewerMaterialCloned = true;
          }
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach(material => {
            if (material.color) material.color.setHex(child.userData.fixedColour ?? colour);
            material.needsUpdate = true;
          });
        });
      });
    });
  }

  const colourModeToggle = root.querySelector("[data-colour-mode]");
  colourModeToggle.addEventListener("change", event => {
    applyColourMode(event.currentTarget.checked);
  });
  applyColourMode(false);

  root.querySelectorAll("[data-parts-action]").forEach(button => {
    button.addEventListener("click", () => {
      const visible = button.dataset.partsAction === "show";
      if (activeFocusNodeId) clearFocusMode(true);
      partRegistry.forEach((entry, partKey) => setPartVisibility(partKey, visible));
      visibilityWasManuallyChanged = true;
      updateNodeControls();
    });
  });

  root.querySelector("[data-dimensions]").addEventListener("change", event => {
    dimensionGroup.visible = event.currentTarget.checked;
  });

  root.querySelector("[data-points]").addEventListener("change", event => {
    pointGroup.visible = event.currentTarget.checked;
  });

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 250;
  controls.maxDistance = 30000;

  camera.position.set(8200, 6500, 7200);
  controls.target.set(1300, 2300, -720);
  controls.update();

  function focusCameraOnParts(partKeys, label) {
    const bounds = new THREE.Box3();
    partKeys.forEach(partKey => {
      const entry = partRegistry.get(partKey);
      if (entry) entry.objects.forEach(object => bounds.expandByObject(object, true));
    });
    if (bounds.isEmpty()) return;
    const centre = bounds.getCenter(new THREE.Vector3());
    const sphere = bounds.getBoundingSphere(new THREE.Sphere());
    const direction = camera.position.clone().sub(controls.target);
    if (direction.lengthSq() < 0.001) direction.set(1, 0.7, 1);
    direction.normalize();
    const halfFov = THREE.MathUtils.degToRad(camera.fov * 0.5);
    const distance = Math.max(220, sphere.radius / Math.max(Math.sin(halfFov), 0.15) * 1.35);
    camera.position.copy(centre).add(direction.multiplyScalar(distance));
    camera.near = Math.max(1, distance / 200);
    camera.far = Math.max(4000, distance * 8);
    camera.updateProjectionMatrix();
    controls.target.copy(centre);
    controls.update();
    root.querySelector("[data-caption]").textContent = label;
  }

  focusCameraOnParts([...partRegistry.keys()], uiText[currentLanguage].completeCaption);

  function resize() {
    const width = Math.max(1, stage.clientWidth);
    const height = Math.max(1, stage.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(stage);
  resize();

  function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  const onboardingRoot = document.querySelector("[data-onboarding]");
  const onboardingStorageKey = "duct-option-d-onboarding-v1-complete";

  function clearOnboardingHighlight() {
    if (!onboardingState.highlighted) return;
    onboardingState.highlighted.classList.remove("onboarding-highlight");
    onboardingState.highlighted = null;
  }

  function renderOnboardingStep() {
    if (!onboardingState.active) return;
    const copy = onboardingCopy[currentLanguage];
    const step = copy.steps[onboardingState.step];
    clearOnboardingHighlight();
    if (step.target) {
      const target = document.querySelector(step.target);
      if (target) {
        target.classList.add("onboarding-highlight");
        target.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });
        onboardingState.highlighted = target;
      }
    }
    onboardingRoot.dataset.position = step.target ? "guided" : "welcome";
    onboardingRoot.querySelector("[data-onboarding-counter]").textContent =
      `${copy.step} ${onboardingState.step + 1} ${copy.of} ${copy.steps.length}`;
    onboardingRoot.querySelector("[data-onboarding-title]").textContent = step.title;
    onboardingRoot.querySelector("[data-onboarding-description]").textContent = step.description;
    onboardingRoot.querySelector("[data-onboarding-tip]").textContent = step.tip;
    onboardingRoot.querySelector("[data-onboarding-back]").textContent = copy.back;
    onboardingRoot.querySelector("[data-onboarding-back]").disabled = onboardingState.step === 0;
    onboardingRoot.querySelector("[data-onboarding-next]").textContent =
      onboardingState.step === copy.steps.length - 1 ? copy.finish : copy.next;
    onboardingRoot.querySelector("[data-onboarding-skip]").textContent = copy.skip;
    const progress = onboardingRoot.querySelector("[data-onboarding-progress]");
    progress.replaceChildren(...copy.steps.map((_, index) => {
      const dot = document.createElement("span");
      dot.className = index === onboardingState.step ? "is-active" : "";
      return dot;
    }));
  }

  function openOnboarding() {
    onboardingState.active = true;
    onboardingState.step = 0;
    onboardingRoot.hidden = false;
    document.body.classList.add("onboarding-open");
    renderOnboardingStep();
    onboardingRoot.querySelector("[data-onboarding-next]").focus();
  }

  function closeOnboarding(remember = true) {
    onboardingState.active = false;
    clearOnboardingHighlight();
    onboardingRoot.hidden = true;
    document.body.classList.remove("onboarding-open");
    if (remember) localStorage.setItem(onboardingStorageKey, "true");
    root.querySelector("[data-onboarding-open]").focus();
  }

  onboardingRoot.querySelector("[data-onboarding-next]").addEventListener("click", () => {
    const finalStep = onboardingCopy[currentLanguage].steps.length - 1;
    if (onboardingState.step >= finalStep) closeOnboarding(true);
    else {
      onboardingState.step += 1;
      renderOnboardingStep();
    }
  });
  onboardingRoot.querySelector("[data-onboarding-back]").addEventListener("click", () => {
    if (onboardingState.step > 0) {
      onboardingState.step -= 1;
      renderOnboardingStep();
    }
  });
  onboardingRoot.querySelector("[data-onboarding-skip]").addEventListener("click", () => closeOnboarding(true));
  root.querySelector("[data-onboarding-open]").addEventListener("click", openOnboarding);
  document.addEventListener("keydown", event => {
    if (!onboardingState.active) return;
    if (event.key === "Escape") closeOnboarding(true);
    if (event.key === "ArrowRight") onboardingRoot.querySelector("[data-onboarding-next]").click();
    if (event.key === "ArrowLeft") onboardingRoot.querySelector("[data-onboarding-back]").click();
  });

  if (localStorage.getItem(onboardingStorageKey) !== "true") {
    requestAnimationFrame(openOnboarding);
  }
