import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/addons/renderers/CSS2DRenderer.js";
import {
  finishes,
  frontage,
  leafWidth,
  lighting,
  model as m,
  slidingLeafPositions,
  slidingStart,
  wallLightPositions,
  wallLights,
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
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
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
  controls.enableDamping = true;
  controls.minDistance = 2;
  controls.maxDistance = 40;
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
    glazing = new THREE.Group(),
    dimensions = new THREE.Group();
  world.add(boundary, glazing, dimensions);
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
  const granite = mineralTexture([133, 137, 139], 85, 12);
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
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x99cbd5,
    transparent: true,
    opacity: 0.28,
    roughness: 0.13,
    metalness: 0.05,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

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
  box(
    world,
    m.width,
    0.12,
    m.stripDepth,
    m.width / 2,
    -0.06,
    m.stripDepth / 2,
    floorMaterial,
  );
  box(
    world,
    m.returnWidth,
    0.12,
    m.returnDepth - m.stripDepth,
    m.returnWidth / 2,
    -0.06,
    (m.returnDepth + m.stripDepth) / 2,
    floorMaterial,
  );
  // Granite tile joints; tile size remains illustrative.
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
    line([x, 0.006, 0], [
      x,
      0.006,
      x < m.returnWidth ? m.returnDepth : m.stripDepth,
    ]);
  }
  for (let z = finishes.tileSize; z < m.returnDepth; z += finishes.tileSize) {
    line([0, 0.006, z], [
      z <= m.stripDepth ? m.width : m.returnWidth,
      0.006,
      z,
    ]);
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
  ) {
    const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
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
    emissive: 0xffd18b,
    emissiveIntensity: 2,
  });
  for (const [index, position] of wallLightPositions.entries()) {
    const fixture = new THREE.Group();
    fixture.name = `Wall light ${index + 1} from right`;
    fixture.position.set(position.x, position.y, position.z);
    boundary.add(fixture);
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(
        wallLights.radius,
        wallLights.radius,
        wallLights.bodyHeight,
        24,
      ),
      sconceMaterial,
    );
    body.castShadow = body.receiveShadow = true;
    fixture.add(body);
    box(
      fixture,
      .045,
      .07,
      wallLights.projection,
      0,
      0,
      -wallLights.projection / 2,
      sconceMaterial,
    );
    for (const direction of [-1, 1]) {
      const aperture = new THREE.Mesh(
        new THREE.CylinderGeometry(
          wallLights.radius * .83,
          wallLights.radius * .83,
          .003,
          24,
        ),
        lampMaterial,
      );
      aperture.position.y = direction * (wallLights.bodyHeight / 2 + .002);
      fixture.add(aperture);
      const beam = new THREE.SpotLight(0xffd394, 4, 1.8, Math.PI / 5, .7, 2);
      beam.position.set(0, direction * wallLights.bodyHeight / 2, .005);
      beam.target.position.set(0, direction * .8, -wallLights.projection);
      lampBeams.push(beam);
      fixture.add(beam, beam.target);
    }
  }
  const pitch = m.width / finishes.wallSections;
  for (let i = 0; i < finishes.wallSections; i++) {
    const left = i * pitch + (i ? finishes.dividerWidth / 2 : 0);
    const right = (i + 1) * pitch -
      (i < finishes.wallSections - 1 ? finishes.dividerWidth / 2 : 0);
    panel(boundary, [left, 0], [right, 0], 0, m.wallHeight, wallMaterial);
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
  panel(
    boundary,
    [m.width, 0],
    [m.width, m.stripDepth],
    0,
    m.wallHeight,
    wallMaterial,
  );
  panel(
    world,
    [m.returnWidth, m.stripDepth],
    [m.returnWidth, m.returnDepth],
    0,
    m.wallHeight,
    wallMaterial,
  );
  // User-confirmed short return wall; it remains solid in every view.
  panel(
    world,
    [0, m.returnDepth],
    [m.returnWidth, m.returnDepth],
    0,
    m.wallHeight,
    wallMaterial,
  );
  panel(
    world,
    [slidingStart - frontage.separatorWidth, m.stripDepth],
    [slidingStart, m.stripDepth],
    0,
    m.wallHeight,
    wallMaterial,
  );
  // Continuous opening with four independent glass leaves, not five fixed bays.
  panel(
    world,
    [slidingStart, m.stripDepth],
    [m.width, m.stripDepth],
    m.windowTop,
    m.wallHeight,
    wallMaterial,
  );
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
    leaf.name = `Sliding door ${i + 1}`;
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
    const fraction = Number(openingInput?.value ?? 0) / 100;
    slidingLeafPositions(fraction).forEach((position, i) =>
      doorLeaves[i].position.set(position.x, 0, position.z)
    );
    if (openingOutput) {
      openingOutput.textContent = fraction === 0
        ? "Closed"
        : `${Math.round(fraction * 100)}% open`;
    }
  }
  openingInput?.addEventListener("input", setOpening);
  setOpening();
  for (const window of windows) {
    const { a, b, bays } = window;
    panel(world, a, b, 0, m.windowBottom, wallMaterial);
    panel(world, a, b, m.windowTop, m.wallHeight, wallMaterial);
    panel(
      glazing,
      a,
      b,
      m.windowBottom,
      m.windowTop,
      glassMaterial,
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
  dimension([0, .04, -.33], [m.width, .04, -.33], "6.775 m", [0, .12, 0]);
  dimension(
    [m.width + .32, .04, 0],
    [m.width + .32, .04, m.stripDepth],
    "1.225 m",
    [.23, .10, 0],
  );
  dimension(
    [0, .04, m.returnDepth + .3],
    [m.returnWidth, .04, m.returnDepth + .3],
    "1.350 m",
    [0, .12, 0],
  );
  dimension([-.4, .04, 0], [-.4, .04, m.returnDepth], "2.025 m", [
    -.18,
    .12,
    0,
  ]);
  dimension(
    [m.width + .24, 0, -.12],
    [m.width + .24, m.wallHeight, -.12],
    "3.00 m",
    [.22, 0, 0],
  );

  const wallsInput = document.querySelector("[data-walls]");
  const legacyCutawayInput = document.querySelector("[data-cutaway]");
  let lightingMode = "day";
  function setLighting(mode) {
    lightingMode = mode;
    stage.closest(".viewer").dataset.lighting = mode;
    const night = mode === "night";
    sun.visible = !night;
    sky.intensity = night ? .22 : 2.5;
    scene.background.set(night ? 0x111b28 : 0xeef1e7);
    lampMaterial.emissiveIntensity = night ? 2 : 0;
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
    const vertical = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    // Leave room for the labels and the stage's top/bottom navigation overlays.
    const horizontal = vertical * camera.aspect *
      Math.max(.4, (stage.clientWidth - 90) / stage.clientWidth);
    const availableVertical = vertical *
      Math.max(.5, (stage.clientHeight - 150) / stage.clientHeight);
    let distance = 0;
    for (const x of [-m.width / 2 - .8, m.width / 2 + .9]) {
      for (const y of [-.12, m.wallHeight + .2]) {
        for (const z of [-m.returnDepth / 2 - .5, m.returnDepth / 2 + .6]) {
          const point = new THREE.Vector3(x, y, z).sub(controls.target);
          distance = Math.max(
            distance,
            point.dot(direction) + Math.abs(point.dot(right)) / horizontal,
            point.dot(direction) + Math.abs(point.dot(up)) / availableVertical,
          );
        }
      }
    }
    camera.position.copy(controls.target).addScaledVector(
      direction,
      distance * 1.04,
    );
  }
  function refresh() {
    boundary.visible = wallsInput
      ? wallsInput.checked
      : !legacyCutawayInput?.checked;
    glazing.visible = windowsInput.checked;
    dimensions.visible = dimensionsInput.checked;
    status.textContent = `${
      view === "plan" ? "Floor plan" : view === "inside" ? "Inside" : "3D view"
    } · ${
      boundary.visible ? "full-height walls" : "cutaway walls"
    } · ${lightingMode}`;
  }
  function setView(name) {
    view = name;
    camera.up.set(0, 1, 0);
    controls.target.set(0, .75, 0);
    if (name === "plan") {
      controls.target.set(0, 0, 0);
      camera.position.set(0, 13, .001);
    } else if (name === "inside") {
      camera.position.set(2.5, 1.6, -.55);
      controls.target.set(-1.5, 1.4, -.55);
    } else camera.position.set(8.5, 7.2, 8.5);
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
      dimensionsInput,
    ]
  ) {
    if (input) input.onchange = refresh;
  }
  document.querySelector("[data-reset]").onclick = () => {
    if (wallsInput) wallsInput.checked = true;
    if (legacyCutawayInput) legacyCutawayInput.checked = false;
    setLighting("day");
    windowsInput.checked = dimensionsInput.checked = true;
    if (openingInput) openingInput.value = "0";
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
  }
  new ResizeObserver(resize).observe(stage);
  resize();
  setView("perspective");
  setLighting("day");
  renderer.setAnimationLoop(() => {
    controls.update();
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
  });
}
