import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { importedModel as data } from "../imported-model.ts";

// These exports contain selected additions only, never another complete house.
export function createAdditionalModels(parent, onLoad) {
  const group = new THREE.Group();
  group.name = "Supplied upstairs suites and facade";
  parent.add(group);
  let state = { visible: true, enclosure: true, windows: true, layers: {} };
  const loaded = new Set();
  function apply() {
    group.visible = state.visible;
    group.traverse((node) => {
      if (!node.isMesh) return;
      for (const material of node.material) {
        const glass = /KACA|GLASS|RYBEN/i.test(material.name);
        material.visible = !!state.layers[material.userData.houseLayer] &&
          (glass ? state.windows : state.enclosure);
        material.clippingPlanes = state.roomPlanes ?? [];
        material.clipShadows = true;
      }
    });
  }
  for (const id of ["master", "girl", "boy", "facade"]) {
    new GLTFLoader().load(
      `./assets/${id}.glb`,
      (gltf) => {
        const source = gltf.scene;
        source.name = `${id} SketchUp additions`;
        source.rotation.x = -Math.PI / 2;
        source.position.set(
          -data.sourceOrigin[0],
          -data.sourceOrigin[2],
          data.sourceOrigin[1],
        );
        group.add(source);
        source.updateWorldMatrix(true, true);
        function tagCeiling(node, ceiling = false) {
          if (node.userData.sourceKind) {
            const kind = node.userData.sourceKind,
              index = node.userData.sourceIndex;
            ceiling = id === "boy" && kind === "Instances" && index === 19 ||
              id === "girl" &&
                (kind === "Groups" && index === 28 ||
                  kind === "Instances" && [8, 9].includes(index)) ||
              id === "master" &&
                (kind === "Groups" && index === 44 ||
                  kind === "Instances" &&
                    [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 19, 21, 22, 23]
                      .includes(index));
          }
          node.userData.additionCeiling = ceiling;
          for (const child of node.children) tagCeiling(child, ceiling);
        }
        tagCeiling(source);
        source.traverse((node) => {
          if (!node.isMesh) return;
          const geometry = node.geometry.clone();
          const positions = geometry.attributes.position;
          const indices = geometry.index?.array ??
            Array.from({ length: positions.count }, (_, i) => i);
          const original = Array.isArray(node.material)
            ? node.material
            : [node.material];
          const sections = geometry.groups.length
            ? geometry.groups
            : [{ start: 0, count: indices.length, materialIndex: 0 }];
          const buckets = new Map();
          const point = new THREE.Vector3();
          for (const section of sections) {
            for (
              let i = section.start;
              i < section.start + section.count;
              i += 3
            ) {
              let height = 0;
              for (let j = 0; j < 3; j++) {
                point.fromBufferAttribute(positions, indices[i + j])
                  .applyMatrix4(node.matrixWorld);
                height += (point.y - parent.position.y + data.sourceOrigin[2]) /
                  3;
              }
              const name = original[section.materialIndex].name;
              const ceiling = node.userData.additionCeiling ||
                /PLAF|CEILING/i.test(name);
              // Furniture is assigned to its floor even when tall doors cross
              // the ceiling height; only actual ceiling surfaces are cut away.
              const layer = id !== "facade" && !ceiling
                ? "floor2"
                : ceiling
                ? "ceiling2"
                : height >= 7.35
                ? "roof"
                : height >= 6.62
                ? "ceiling2"
                : "floor2";
              const key = `${section.materialIndex}:${layer}`;
              if (!buckets.has(key)) {
                buckets.set(key, {
                  layer,
                  material: original[section.materialIndex],
                  indices: [],
                });
              }
              buckets.get(key).indices.push(
                indices[i],
                indices[i + 1],
                indices[i + 2],
              );
            }
          }
          const reordered = [], materials = [];
          geometry.clearGroups();
          for (const bucket of buckets.values()) {
            const material = bucket.material.clone();
            material.userData.houseLayer = bucket.layer;
            material.side = THREE.DoubleSide;
            geometry.addGroup(
              reordered.length,
              bucket.indices.length,
              materials.length,
            );
            for (const index of bucket.indices) reordered.push(index);
            materials.push(material);
          }
          geometry.setIndex(reordered);
          geometry.computeVertexNormals();
          node.geometry = geometry;
          node.material = materials;
          node.castShadow = node.receiveShadow = true;
        });
        loaded.add(id);
        apply();
        onLoad(null, id);
      },
      undefined,
      (error) => onLoad(error, id),
    );
  }
  return {
    loaded,
    setState(next) {
      state = next;
      apply();
    },
  };
}
