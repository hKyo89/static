import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/addons/renderers/CSS2DRenderer.js";
import { model as m, windows } from "../model.ts";

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
  scene.add(new THREE.HemisphereLight(0xffffff, 0x82947e, 2.5));
  const sun = new THREE.DirectionalLight(0xfff4dd, 3);
  sun.position.set(-4, 10, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, {
    left: -8,
    right: 8,
    top: 8,
    bottom: -8,
    near: 0.1,
    far: 25,
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
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xe3e3d6,
    roughness: 0.93,
  });
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0xd9cbb1,
    roughness: 0.9,
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
  // Neutral paving joints illustrate the floor without prescribing a landscape design.
  const jointMaterial = new THREE.LineBasicMaterial({
    color: 0xb7ad98,
    transparent: true,
    opacity: 0.45,
  });
  function line(a, b, parent = world, material = jointMaterial) {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...a),
      new THREE.Vector3(...b),
    ]);
    parent.add(new THREE.Line(geometry, material));
  }
  for (let x = 0.45; x < m.width; x += 0.45) {
    line([x, 0.006, 0], [
      x,
      0.006,
      x < m.returnWidth ? m.returnDepth : m.stripDepth,
    ]);
  }
  for (let z = 0.45; z < m.returnDepth; z += 0.45) {
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
  panel(boundary, [0, 0], [m.width, 0], 0, m.wallHeight, wallMaterial);
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

  const cutawayInput = document.querySelector("[data-cutaway]");
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
    boundary.visible = !cutawayInput.checked;
    glazing.visible = windowsInput.checked;
    dimensions.visible = dimensionsInput.checked;
    status.textContent = `${
      view === "plan" ? "Floor plan" : view === "inside" ? "Inside" : "3D view"
    } · ${boundary.visible ? "full-height walls" : "cutaway walls"}`;
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
    } else camera.position.set(8.5, 7.2, -8.5);
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
  for (const input of [cutawayInput, windowsInput, dimensionsInput]) {
    input.onchange = refresh;
  }
  document.querySelector("[data-reset]").onclick = () => {
    cutawayInput.checked =
      windowsInput.checked =
      dimensionsInput.checked =
        true;
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
