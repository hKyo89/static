import { openingReferences } from "../openings.ts";
import { filmMaterials } from "./window-film.js";
import { createHouse } from "./house.js";
import { createImportedHouse } from "./imported-house.js";
import { importedModel } from "../imported-model.ts";
import { revisions } from "../revisions-model.ts";
import { createFurnishings, sourcePosition } from "./furnishings.js";
import { houseModel, rooms } from "../house-model.ts";
import { createGarden } from "./garden.js";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/addons/renderers/CSS2DRenderer.js";
import {
  finishes,
  frontage,
  gutter,
  leafWidth,
  lighting,
  model as m,
  slidingLeafPositions,
  slidingStart,
  wallLightPositions,
  wallLights,
  wallPanelLength,
  wallSegments,
  windows,
} from "../model.ts";

const stage = document.querySelector("#garden-stage");
const status = document.querySelector("[data-status]");
const dialog = document.querySelector("dialog");
document.querySelector("[data-reference-open]").onclick = () =>
  dialog.showModal();
document.querySelector("[data-reference-close]").onclick = () => dialog.close();
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

try {
  createViewer();
} catch (error) {
  console.error(error);
  stage.innerHTML =
    '<div class="viewer-error"><strong>The 3D view could not start.</strong><p>This viewer needs WebGL. Try a browser with hardware acceleration enabled.</p><a href="./reference/floor-plan.png">View the original floor plan →</a></div>';
  status.textContent = "3D unavailable · source drawing available";
}

function createViewer() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeef1e7);
  const perspectiveCamera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  const planCamera = new THREE.OrthographicCamera(-10, 10, 10, -10, .01, 100);
  let camera = perspectiveCamera;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.localClippingEnabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.setAttribute("aria-label", "Interactive backyard model");
  stage.querySelector("[data-loading]").remove();
  stage.append(renderer.domElement);
  const labels = new CSS2DRenderer();
  labels.domElement.style.cssText =
    "position:absolute;inset:0;pointer-events:none";
  stage.append(labels.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = false;
  controls.minDistance = 2;
  controls.maxDistance = 100;
  controls.maxPolarAngle = Math.PI / 2 - 0.015;
  const sky = new THREE.HemisphereLight(0xffffff, 0x82947e, 2.5);
  scene.add(sky);
  const sun = new THREE.DirectionalLight(0xfff4dd, 3);
  // The sun is directly above the courtyard in daylight.
  sun.position.set(...lighting.sunPosition);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, {
    left: -8,
    right: 8,
    top: 8,
    bottom: -8,
    near: 0.1,
    far: 35,
  });
  sun.shadow.normalBias = 0.03;
  scene.add(sun);
  const world = new THREE.Group();
  world.position.set(-m.width / 2, 0, -m.returnDepth / 2);
  scene.add(world);
  const boundary = new THREE.Group(),
    otherWalls = new THREE.Group(),
    glazing = new THREE.Group(),
    dimensions = new THREE.Group();
  world.add(boundary, otherWalls, glazing, dimensions);
  // Deterministic mineral grains provide local, offline surface textures.
  function mineralTexture(base, spread, repeat) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 256;
    const context = canvas.getContext("2d");
    const pixels = context.createImageData(256, 256);
    let seed = 92741;
    for (let i = 0; i < pixels.data.length; i += 4) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const grain = ((seed / 4294967296) - .5) * spread;
      for (let c = 0; c < 3; c++) pixels.data[i + c] = base[c] + grain;
      pixels.data[i + 3] = 255;
    }
    context.putImageData(pixels, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeat, repeat);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return texture;
  }
  const roughcast = mineralTexture([233, 226, 207], 32, 10);
  const granite = mineralTexture(finishes.tileColour, finishes.tileGrain, 12);
  const wallMaterial = new THREE.MeshStandardMaterial({
    map: roughcast,
    bumpMap: roughcast,
    bumpScale: .018,
    roughness: 1,
  });
  const floorMaterial = new THREE.MeshStandardMaterial({
    map: granite,
    bumpMap: granite,
    bumpScale: .012,
    roughness: .98,
  });
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x40584c,
    roughness: 0.7,
  });
  const glassMaterial = filmMaterials(false);
  const sideGlassMaterial = filmMaterials(false);

  function box(parent, width, height, depth, x, y, z, material, shadow = true) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      material,
    );
    mesh.position.set(x, y, z);
    mesh.castShadow = shadow;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  // Shadow-only house envelope: upper storey and house roof block sunlight,
  // while the courtyard stays open to the sky and visible in this focused view.
  const houseShadowMaterial = new THREE.MeshBasicMaterial({
    colorWrite: false,
    depthWrite: false,
  });
  const house = new THREE.Group();
  house.name = "Two-storey house shadow envelope";
  world.add(house);
  box(
    house,
    m.width - m.returnWidth,
    lighting.houseHeight - m.wallHeight,
    lighting.houseDepth,
    (m.width + m.returnWidth) / 2,
    (lighting.houseHeight + m.wallHeight) / 2,
    m.stripDepth + lighting.houseDepth / 2,
    houseShadowMaterial,
  );
  box(
    house,
    m.returnWidth,
    lighting.houseHeight - m.wallHeight,
    lighting.houseDepth,
    m.returnWidth / 2,
    (lighting.houseHeight + m.wallHeight) / 2,
    m.returnDepth + lighting.houseDepth / 2,
    houseShadowMaterial,
  );
  // Opaque floor/roof over the house prevents a sun path through its interior.
  box(
    house,
    m.width - m.returnWidth,
    .15,
    lighting.houseDepth,
    (m.width + m.returnWidth) / 2,
    m.wallHeight,
    m.stripDepth + lighting.houseDepth / 2,
    houseShadowMaterial,
  );
  // Separate raised field and lower tiled channel create the actual recess.
  const gw = gutter.width;
  box(
    world,
    m.width - gw,
    .12,
    m.stripDepth - gw,
    (m.width + gw) / 2,
    -.06,
    (m.stripDepth + gw) / 2,
    floorMaterial,
  );
  box(
    world,
    m.returnWidth - gw,
    .12,
    m.returnDepth - m.stripDepth,
    (m.returnWidth + gw) / 2,
    -.06,
    (m.returnDepth + m.stripDepth) / 2,
    floorMaterial,
  );
  box(
    world,
    m.width,
    .12 - gutter.depth,
    gw,
    m.width / 2,
    -(.12 + gutter.depth) / 2,
    gw / 2,
    floorMaterial,
  );
  box(
    world,
    gw,
    .12 - gutter.depth,
    m.returnDepth - gw,
    gw / 2,
    -(.12 + gutter.depth) / 2,
    (m.returnDepth + gw) / 2,
    floorMaterial,
  );
  // User-confirmed 600 mm tile grid, including the channel floor.
  const jointMaterial = new THREE.LineBasicMaterial({
    color: 0x55595a,
    transparent: true,
    opacity: 0.7,
  });
  function line(a, b, parent = world, material = jointMaterial) {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...a),
      new THREE.Vector3(...b),
    ]);
    parent.add(new THREE.Line(geometry, material));
  }
  for (let x = finishes.tileSize; x < m.width; x += finishes.tileSize) {
    const end = x < m.returnWidth ? m.returnDepth : m.stripDepth;
    line([x, -gutter.depth + .003, 0], [x, -gutter.depth + .003, gw]);
    line([x, .003, gw], [x, .003, end]);
  }
  for (let z = finishes.tileSize; z < m.returnDepth; z += finishes.tileSize) {
    const end = z <= m.stripDepth ? m.width : m.returnWidth;
    line([0, -gutter.depth + .003, z], [gw, -gutter.depth + .003, z]);
    line([gw, .003, z], [end, .003, z]);
  }

  function panel(
    parent,
    a,
    b,
    bottom,
    top,
    material,
    thickness = m.wallThickness,
    shadow = true,
    joined = material === wallMaterial,
  ) {
    const length = wallPanelLength(a, b, thickness, joined);
    const mesh = box(
      parent,
      length,
      top - bottom,
      thickness,
      (a[0] + b[0]) / 2,
      (top + bottom) / 2,
      (a[1] + b[1]) / 2,
      material,
      shadow,
    );
    mesh.rotation.y = -Math.atan2(b[1] - a[1], b[0] - a[0]);
    return mesh;
  }
  // Seven side-by-side roughcast panels, separated by six recessed U channels.
  const channelMaterial = new THREE.MeshStandardMaterial({
    color: 0xaaa591,
    roughness: .9,
  });
  const sconceMaterial = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    roughness: .65,
    metalness: .35,
  });
  const lampBeams = [];
  const lampMaterial = new THREE.MeshStandardMaterial({
    color: 0xffe4ae,
    emissive: 0xffbd73,
    emissiveIntensity: .35,
  });
  for (const [index, position] of wallLightPositions.entries()) {
    const fixture = new THREE.Group();
    fixture.name = `Wall light ${index + 1} from right`;
    fixture.position.set(position.x, position.y, position.z);
    boundary.add(fixture);
    // D-shaped cross section: curved U front, flat back flush to the wall.
    const profile = new THREE.Shape();
    profile.moveTo(-wallLights.radius, 0);
    profile.absarc(0, 0, wallLights.radius, Math.PI, 0, true);
    profile.lineTo(-wallLights.radius, 0);
    const body = new THREE.Mesh(
      new THREE.ExtrudeGeometry(profile, {
        depth: wallLights.bodyHeight,
        bevelEnabled: false,
        curveSegments: 20,
      }),
      sconceMaterial,
    );
    body.rotation.x = Math.PI / 2;
    body.position.y = wallLights.bodyHeight / 2;
    body.castShadow = body.receiveShadow = true;
    fixture.add(body);
    for (const direction of [-1, 1]) {
      const aperture = new THREE.Mesh(
        new THREE.CircleGeometry(wallLights.lensRadius, 32),
        lampMaterial,
      );
      aperture.rotation.x = direction > 0 ? -Math.PI / 2 : Math.PI / 2;
      aperture.position.set(
        0,
        direction * (wallLights.bodyHeight / 2 + .001),
        wallLights.lensOffset,
      );
      fixture.add(aperture);
      const rim = new THREE.Mesh(
        new THREE.RingGeometry(
          wallLights.lensRadius,
          wallLights.lensRadius + wallLights.lensRimWidth,
          32,
        ),
        sconceMaterial,
      );
      rim.rotation.x = aperture.rotation.x;
      rim.position.set(
        0,
        direction * (wallLights.bodyHeight / 2 + .003),
        wallLights.lensOffset,
      );
      fixture.add(rim);
      const beam = new THREE.SpotLight(
        0xffbd73,
        wallLights.beamIntensity,
        wallLights.beamRange,
        Math.PI / 7,
        .9,
        2,
      );
      beam.position.set(
        0,
        direction * (wallLights.bodyHeight / 2 + .003),
        wallLights.beamOffset,
      );
      beam.target.position.set(0, direction * .45, -wallLights.mountingGap);
      lampBeams.push(beam);
      fixture.add(beam, beam.target);
    }
  }
  const pitch = m.width / finishes.wallSections;
  for (let i = 0; i < finishes.wallSections; i++) {
    const left = (i === 0 ? -m.wallThickness / 2 : i * pitch) +
      (i ? finishes.dividerWidth / 2 : 0);
    const right = ((i === finishes.wallSections - 1)
      ? m.width + m.wallThickness / 2
      : (i + 1) * pitch) -
      (i < finishes.wallSections - 1 ? finishes.dividerWidth / 2 : 0);
    panel(
      boundary,
      [left, 0],
      [right, 0],
      0,
      m.wallHeight,
      wallMaterial,
      m.wallThickness,
      true,
      false,
    );
    if (i > 0) {
      const x = i * pitch;
      const w = finishes.dividerWidth;
      const d = finishes.dividerDepth;
      // Recessed web and two slender flanges form an actual U section.
      box(
        boundary,
        w,
        m.wallHeight,
        .002,
        x,
        m.wallHeight / 2,
        m.wallThickness / 2 - d,
        channelMaterial,
      );
      for (const side of [-1, 1]) {
        box(
          boundary,
          .002,
          m.wallHeight,
          d,
          x + side * (w / 2 - .001),
          m.wallHeight / 2,
          m.wallThickness / 2 - d / 2,
          channelMaterial,
        );
      }
    }
  }
  for (const segment of wallSegments) {
    const wall = panel(
      segment.boundary ? boundary : otherWalls,
      segment.a,
      segment.b,
      segment.bottom,
      segment.top,
      wallMaterial,
    );
    wall.name = segment.name;
  }
  panel(
    glazing,
    [slidingStart, m.stripDepth],
    [m.width, m.stripDepth],
    0,
    frontage.doorBottom,
    frameMaterial,
    frontage.trackSpacing * (frontage.trackCount - 1) + .06,
  );
  panel(
    glazing,
    [slidingStart, m.stripDepth],
    [m.width, m.stripDepth],
    m.windowTop - .025,
    m.windowTop,
    frameMaterial,
    frontage.trackSpacing * (frontage.trackCount - 1) + .06,
  );
  const doorLeaves = [];
  const doorHeight = m.windowTop - frontage.doorBottom;
  for (let i = 0; i < frontage.leafCount; i++) {
    const leaf = new THREE.Group();
    leaf.name = `DR01-${"ABCD"[i]} · Garden sliding leaf ${i + 1}`;
    glazing.add(leaf);
    doorLeaves.push(leaf);
    box(
      leaf,
      leafWidth - .08,
      doorHeight - .08,
      .012,
      leafWidth / 2,
      frontage.doorBottom + doorHeight / 2,
      0,
      glassMaterial,
      false,
    );
    for (const x of [.02, leafWidth - .02]) {
      box(
        leaf,
        .04,
        doorHeight,
        .04,
        x,
        frontage.doorBottom + doorHeight / 2,
        0,
        frameMaterial,
      );
    }
    for (const y of [frontage.doorBottom + .02, m.windowTop - .02]) {
      box(leaf, leafWidth, .04, .04, leafWidth / 2, y, 0, frameMaterial);
    }
    // Pulls sit at the meeting edges of the two operable centre leaves.
    if (i === 1 || i === 2) {
      box(
        leaf,
        .025,
        .22,
        .035,
        i === 1 ? leafWidth - .09 : .09,
        1.1,
        -.035,
        frameMaterial,
      );
    }
  }
  const openingInput = document.querySelector("[data-door-opening]");
  const openingOutput = document.querySelector("[data-door-output]");
  function setOpening() {
    const fraction = openingInput?.checked ? 1 : 0;
    slidingLeafPositions(fraction).forEach((position, i) =>
      doorLeaves[i].position.set(position.x, 0, position.z)
    );
    if (openingOutput) {
      openingOutput.textContent = fraction === 0 ? "Closed" : "Open";
    }
  }
  openingInput?.addEventListener("change", setOpening);
  setOpening();
  for (const window of windows) {
    const { a, b, bays } = window;
    panel(otherWalls, a, b, 0, m.windowBottom, wallMaterial);
    panel(otherWalls, a, b, m.windowTop, m.wallHeight, wallMaterial);
    panel(
      glazing,
      a,
      b,
      m.windowBottom,
      m.windowTop,
      a[0] === b[0] ? sideGlassMaterial : glassMaterial,
      0.012,
      false,
    );
    panel(
      glazing,
      a,
      b,
      m.windowBottom,
      m.windowBottom + 0.045,
      frameMaterial,
      0.055,
    );
    panel(
      glazing,
      a,
      b,
      m.windowTop - 0.045,
      m.windowTop,
      frameMaterial,
      0.055,
    );
    const angle = Math.atan2(b[1] - a[1], b[0] - a[0]);
    for (let i = 0; i <= bays; i++) {
      const t = i / bays;
      const post = box(
        glazing,
        0.045,
        m.windowTop - m.windowBottom,
        0.055,
        a[0] + (b[0] - a[0]) * t,
        (m.windowTop + m.windowBottom) / 2,
        a[1] + (b[1] - a[1]) * t,
        frameMaterial,
      );
      post.rotation.y = -angle;
    }
  }
  const dimensionMaterial = new THREE.LineBasicMaterial({ color: 0x73846d });
  function dimension(a, b, text, offset = [0, 0, 0]) {
    line(a, b, dimensions, dimensionMaterial);
    for (const p of [a, b]) {
      const tick = a[1] !== b[1]
        ? [0.10, 0, 0]
        : a[0] !== b[0]
        ? [0, 0, 0.10]
        : [0.10, 0, 0];
      line(
        p.map((v, i) => v - tick[i]),
        p.map((v, i) => v + tick[i]),
        dimensions,
        dimensionMaterial,
      );
    }
    const anchor = document.createElement("div");
    const element = document.createElement("span");
    element.className = "dimension-label";
    element.textContent = text;
    anchor.append(element);
    const label = new CSS2DObject(anchor);
    label.position.set(...a.map((v, i) => (v + b[i]) / 2 + offset[i]));
    dimensions.add(label);
  }
  dimension([0, .04, -.33], [m.width, .04, -.33], `${m.width.toFixed(3)} m`, [
    0,
    .12,
    0,
  ]);
  dimension(
    [m.width + .32, .04, 0],
    [m.width + .32, .04, m.stripDepth],
    `${m.stripDepth.toFixed(3)} m`,
    [.23, .10, 0],
  );
  dimension(
    [0, .04, m.returnDepth + .3],
    [m.returnWidth, .04, m.returnDepth + .3],
    "1.350 m",
    [0, .12, 0],
  );
  dimension(
    [-.4, .04, 0],
    [-.4, .04, m.returnDepth],
    `${m.returnDepth.toFixed(3)} m`,
    [
      -.18,
      .12,
      0,
    ],
  );
  dimension(
    [m.width + .24, 0, -.12],
    [m.width + .24, m.wallHeight, -.12],
    "3.00 m",
    [.22, 0, 0],
  );

  const garden = createGarden(world);
  const courtyard = new THREE.Group();
  courtyard.name = "Garden registered inside source courtyard";
  for (const child of [...world.children]) courtyard.add(child);
  courtyard.position.set(...revisions.courtyard.offset);
  world.add(courtyard);
  const furnishings = createFurnishings(world);
  const firstFloor = createHouse(world);
  // Keep only the established canopy from the earlier interpreted house.
  for (const child of firstFloor.group.children) {
    if (child !== firstFloor.canopy.group) child.visible = false;
  }
  firstFloor.canopy.group.position.z += importedModel.canopyOffsetZ;
  const importedHouse = createImportedHouse(world, (error) => {
    if (error) {
      console.error("SketchUp house failed to load", error);
      status.textContent =
        "House model could not load. Garden and canopy remain available.";
    } else {
      updateReflections();
      refresh();
    }
  });
  let reflecting = false;
  let reflectionsReady = false;
  const reflectionTarget = new THREE.WebGLCubeRenderTarget(128, {
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
  });
  const reflectionCamera = new THREE.CubeCamera(.05, 5, reflectionTarget);
  reflectionCamera.position.copy(sourcePosition([9.4, 11, 1.8]));
  world.add(reflectionCamera);
  function updateReflections() {
    if (reflecting || reflectionsReady) return;
    reflecting = true;
    scene.environment = null;
    const autoUpdate = renderer.shadowMap.autoUpdate;
    renderer.shadowMap.autoUpdate = false;
    try {
      reflectionCamera.update(renderer, scene);
    } finally {
      renderer.shadowMap.autoUpdate = autoUpdate;
    }
    scene.environment = reflectionTarget.texture;
    reflectionsReady = true;
    reflecting = false;
  }
  const scopeInput = document.querySelector("[data-scope]");
  const roomInput = document.querySelector("[data-room-focus]");
  const openingLabels = new THREE.Group();
  world.add(openingLabels);
  openingReferences.forEach((o) => {
    const el = document.createElement("span");
    el.className = "room-label";
    el.textContent = o.id;
    el.title = o.name;
    const label = new CSS2DObject(el);
    label.position.set(
      (o.labelPosition?.[0] ?? (o.a[0] + o.b[0]) / 2) -
        houseModel.gardenOffsetX,
      2.35,
      o.labelPosition?.[1] ?? (o.a[1] + o.b[1]) / 2,
    );
    label.userData.garden = o.garden;
    if (o.garden) {
      label.position.add(new THREE.Vector3(...revisions.courtyard.offset));
    }
    openingLabels.add(label);
  });
  const openingLabelsInput = document.querySelector("[data-opening-labels]");
  const openingFocusInput = document.querySelector("[data-opening-focus]");
  openingLabelsInput.onchange = () => refresh();
  document.querySelector("[data-canopy-roof]").onchange = () => refresh();
  document.querySelectorAll("[data-layer]").forEach((input) =>
    input.onchange = () => {
      fitCamera();
      refresh();
    }
  );
  openingFocusInput.onchange = () => {
    const o = openingReferences.find((o) => o.id === openingFocusInput.value);
    if (!o) return;
    scope = o.garden ? "garden" : "house";
    scopeInput.value = scope;
    focusedRoom = {
      bounds: [
        Math.min(...[o.a[0], o.b[0]]) - 1,
        Math.min(o.a[1], o.b[1]) - 1,
        Math.max(o.a[0], o.b[0]) + 1,
        Math.max(o.a[1], o.b[1]) + 1,
      ],
    };
    roomInput.value = "";
    openingLabelsInput.checked = true;
    setView("plan");
  };
  const roomLabelsInput = document.querySelector("[data-room-labels]");
  let scope = "house";
  let focusedRoom = null;
  scopeInput.onchange = () => {
    scope = scopeInput.value;
    focusedRoom = null;
    openingFocusInput.value = "";
    openingLabelsInput.checked = true;
    roomInput.value = "";
    setView(view);
  };
  roomInput.onchange = () => {
    const area = revisions.focusAreas.find((area) =>
      area.id === roomInput.value
    );
    if (area) {
      const [x, y, x2, y2] = area.bounds;
      focusedRoom = {
        bounds: [
          x - importedModel.sourceOrigin[0] + houseModel.gardenOffsetX,
          importedModel.sourceOrigin[1] - y2,
          x2 - importedModel.sourceOrigin[0] + houseModel.gardenOffsetX,
          importedModel.sourceOrigin[1] - y,
        ],
      };
      scope = "house";
      scopeInput.value = scope;
      setView("perspective");
      return;
    }
    focusedRoom = rooms.find((r) => r.id === roomInput.value) ?? null;
    scope = ["G01", "G02"].includes(roomInput.value) ? "garden" : "house";
    if (scope === "garden") {
      focusedRoom = {
        bounds: roomInput.value === "G02"
          ? [
            houseModel.gardenOffsetX,
            m.stripDepth,
            houseModel.gardenOffsetX + m.returnWidth,
            m.returnDepth,
          ]
          : [
            houseModel.gardenOffsetX,
            0,
            houseModel.gardenOffsetX + m.width,
            m.returnDepth,
          ],
      };
    }
    scopeInput.value = scope;
    setView("plan");
  };
  roomLabelsInput.onchange = () => refresh();
  const gardenInput = document.querySelector("[data-garden]");
  const wallsInput = document.querySelector("[data-walls]");
  const boundaryInput = document.querySelector("[data-garden-boundary]");
  const legacyCutawayInput = document.querySelector("[data-cutaway]");
  let lightingMode = "day";
  function setLighting(mode) {
    lightingMode = mode;
    stage.closest(".viewer").dataset.lighting = mode;
    const night = mode === "night";
    sun.visible = !night;
    garden.setNight(night);
    firstFloor.canopy.setNight(night);
    scene.environmentIntensity = night ? .12 : 1;
    sky.intensity = night ? .22 : 2.5;
    scene.background.set(night ? 0x111b28 : 0xeef1e7);
    lampMaterial.emissiveIntensity = night ? .35 : 0;
    for (const beam of lampBeams) beam.visible = night;
    document.querySelectorAll("[data-lighting]").forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.lighting === mode),
      )
    );
    refresh();
  }
  document.querySelectorAll("[data-lighting]").forEach((button) =>
    button.onclick = () => setLighting(button.dataset.lighting)
  );
  const windowsInput = document.querySelector("[data-windows]");
  const dimensionsInput = document.querySelector("[data-dimensions]");
  let view = "perspective";
  function fitCamera() {
    if (view === "inside") return;
    const direction = camera.position.clone().sub(controls.target).normalize();
    const right = new THREE.Vector3().crossVectors(camera.up, direction)
      .normalize();
    const up = new THREE.Vector3().crossVectors(direction, right).normalize();
    const vertical = Math.tan(
      THREE.MathUtils.degToRad(perspectiveCamera.fov / 2),
    );
    // Leave room for the labels and the stage's top/bottom navigation overlays.
    const horizontal = vertical * camera.aspect *
      Math.max(.4, (stage.clientWidth - 90) / stage.clientWidth);
    const availableVertical = vertical *
      Math.max(.5, (stage.clientHeight - 150) / stage.clientHeight);
    let distance = 0, extentX = 0, extentY = 0;
    const bounds = focusedRoom
      ? focusedRoom.bounds
      : scope === "house"
      ? [0, 0, houseModel.width, houseModel.depth]
      : [houseModel.gardenOffsetX, 0, 10, m.returnDepth];
    for (
      const x of [
        bounds[0] - houseModel.gardenOffsetX - m.width / 2 - .5,
        bounds[2] - houseModel.gardenOffsetX - m.width / 2 + .5,
      ]
    ) {
      for (
        const y of [
          -.12,
          scope === "house" &&
            [...document.querySelectorAll("[data-layer]")].some((input) =>
              input.dataset.layer !== "floor1" && input.checked
            )
            ? 11
            : m.wallHeight + .2,
        ]
      ) {
        for (
          const z of [
            bounds[1] - m.returnDepth / 2 - .5,
            bounds[3] - m.returnDepth / 2 + .5,
          ]
        ) {
          const point = new THREE.Vector3(x, y, z);
          if (scope === "garden") {
            point.add(new THREE.Vector3(...revisions.courtyard.offset));
          }
          point.sub(controls.target);
          extentX = Math.max(extentX, Math.abs(point.dot(right)));
          extentY = Math.max(extentY, Math.abs(point.dot(up)));
          distance = Math.max(
            distance,
            point.dot(direction) + Math.abs(point.dot(right)) / horizontal,
            point.dot(direction) + Math.abs(point.dot(up)) / availableVertical,
          );
        }
      }
    }
    if (camera.isOrthographicCamera) {
      const halfHeight = Math.max(
        extentY /
          Math.max(.5, (stage.clientHeight - 150) / stage.clientHeight),
        extentX /
          (camera.aspect *
            Math.max(.4, (stage.clientWidth - 90) / stage.clientWidth)),
      ) * 1.04;
      camera.left = -halfHeight * camera.aspect;
      camera.right = halfHeight * camera.aspect;
      camera.top = halfHeight;
      camera.bottom = -halfHeight;
      camera.zoom = 1;
      camera.updateProjectionMatrix();
      camera.position.copy(controls.target).addScaledVector(direction, 25);
      return;
    }
    camera.position.copy(controls.target).addScaledVector(
      direction,
      distance * 1.04,
    );
  }
  function refresh() {
    garden.group.visible = gardenInput?.checked ?? true;
    otherWalls.visible = wallsInput
      ? wallsInput.checked
      : !legacyCutawayInput?.checked;
    boundary.visible = boundaryInput
      ? boundaryInput.checked
      : otherWalls.visible;
    firstFloor.group.visible = scope === "house";
    firstFloor.walls.visible = false;
    furnishings.group.visible = wallsInput.checked &&
      document.querySelector('[data-layer="floor1"]').checked;
    importedHouse.setState({
      visible: true,
      enclosure: otherWalls.visible,
      windows: windowsInput.checked && otherWalls.visible,
      layers: Object.fromEntries(
        [...document.querySelectorAll("[data-layer]")].map((
          input,
        ) => [input.dataset.layer, input.checked]),
      ),
    });
    // Source-model openings replace the approximate garden frontage.
    otherWalls.visible = false;
    openingLabels.visible = openingLabelsInput.checked;
    openingLabels.children.forEach((label) =>
      label.visible = scope === "garden" && label.userData.garden
    );
    firstFloor.names.visible = false;
    firstFloor.names.children.forEach((label, i) => {
      label.element.textContent = view === "plan"
        ? `${rooms[i].id} · ${rooms[i].name}`
        : rooms[i].id;
    });
    firstFloor.glazing.visible = false;
    firstFloor.canopy.roof.visible =
      document.querySelector("[data-canopy-roof]").checked;
    house.visible = false;
    glazing.visible = false;
    dimensions.visible = dimensionsInput.checked;
    status.textContent = `${
      view === "plan" ? "Floor plan" : view === "inside" ? "Inside" : "3D view"
    } · ${
      scope === "house" && wallsInput.checked
        ? "SketchUp house"
        : otherWalls.visible && boundary.visible
        ? "full-height walls"
        : boundary.visible
        ? "garden back/right walls only"
        : otherWalls.visible
        ? "garden boundary hidden"
        : "walls hidden"
    } · ${lightingMode}`;
    if (importedHouse.group.children.length) updateReflections();
    render();
  }
  function setView(name) {
    const nextCamera = name === "plan" ? planCamera : perspectiveCamera;
    if (camera !== nextCamera) {
      nextCamera.position.copy(camera.position);
      nextCamera.quaternion.copy(camera.quaternion);
      camera = nextCamera;
      controls.object = camera;
    }
    camera.aspect = stage.clientWidth / stage.clientHeight;
    view = name;
    controls.maxPolarAngle = name === "inside"
      ? Math.PI - .015
      : Math.PI / 2 - .015;
    camera.up.set(0, 1, 0);
    const b = focusedRoom?.bounds;
    const centre = b
      ? [
        (b[0] + b[2]) / 2 - houseModel.gardenOffsetX - m.width / 2,
        (b[1] + b[3]) / 2 - m.returnDepth / 2,
      ]
      : scope === "house"
      ? [5 - houseModel.gardenOffsetX - m.width / 2, 10 - m.returnDepth / 2]
      : [revisions.courtyard.offset[0], revisions.courtyard.offset[2]];
    if (b && scope === "garden") {
      centre[0] += revisions.courtyard.offset[0];
      centre[1] += revisions.courtyard.offset[2];
    }
    controls.target.set(centre[0], .75, centre[1]);
    if (name === "plan") {
      controls.target.set(centre[0], 0, centre[1]);
      camera.position.set(centre[0], 25, centre[1] + .001);
    } else if (name === "inside") {
      if (scope === "house") {
        camera.position.set(centre[0], 1.6, centre[1] + 1.8);
        controls.target.set(centre[0], 2.4, centre[1] - 2);
      } else {
        camera.position.set(2.5, 1.6, -.55);
        controls.target.set(-1.5, 1.4, -.55);
      }
    } else camera.position.set(centre[0] + 12, 16, centre[1] + 18);
    fitCamera();
    document.querySelectorAll("[data-camera]").forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.camera === name),
      )
    );
    controls.update();
    refresh();
  }
  document.querySelectorAll("[data-camera]").forEach((button) =>
    button.onclick = () => setView(button.dataset.camera)
  );
  for (
    const input of [
      wallsInput ?? legacyCutawayInput,
      windowsInput,
      boundaryInput,
      dimensionsInput,
      gardenInput,
    ]
  ) {
    if (input) input.onchange = refresh;
  }
  document.querySelector("[data-hide-enclosure]").onclick = () => {
    wallsInput.checked = false;
    windowsInput.checked = false;
    boundaryInput.checked = false;
    refresh();
  };
  document.querySelector("[data-reset]").onclick = () => {
    document.querySelectorAll("[data-layer]").forEach((input) =>
      input.checked = input.dataset.layer === "floor1"
    );
    if (boundaryInput) boundaryInput.checked = true;
    if (wallsInput) wallsInput.checked = true;
    if (gardenInput) gardenInput.checked = true;
    if (legacyCutawayInput) legacyCutawayInput.checked = false;
    focusedRoom = null;
    openingFocusInput.value = "";
    openingLabelsInput.checked = true;
    roomInput.value = "";
    scope = "house";
    scopeInput.value = "house";
    setLighting("day");
    windowsInput.checked = dimensionsInput.checked = true;
    if (openingInput) openingInput.checked = false;
    setOpening();
    setView("perspective");
  };
  function resize() {
    const width = stage.clientWidth, height = stage.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    labels.setSize(width, height);
    fitCamera();
    render();
  }
  new ResizeObserver(resize).observe(stage);
  resize();
  setView("perspective");
  setLighting("day");
  function render() {
    renderer.render(scene, camera);
    labels.render(scene, camera);
    if (dimensions.visible) {
      const placed = [];
      for (const element of stage.querySelectorAll(".dimension-label")) {
        if (element.parentElement.style.display === "none") continue;
        element.style.display = "inline-block";
        element.style.transform = "";
        const rect = element.getBoundingClientRect();
        let shift = 0;
        for (let attempt = 0; attempt < 5; attempt++) {
          if (
            !placed.some((p) =>
              rect.left < p.right + 4 && rect.right > p.left - 4 &&
              rect.top + shift < p.bottom + 4 && rect.bottom + shift > p.top - 4
            )
          ) break;
          shift -= 29;
        }
        element.style.transform = `translateY(${shift}px)`;
        placed.push({
          left: rect.left,
          right: rect.right,
          top: rect.top + shift,
          bottom: rect.bottom + shift,
        });
      }
    }
  }
  controls.addEventListener("change", render);
  render();
}
