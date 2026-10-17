import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { importedModel as data } from "../imported-model.ts";
import { revisions } from "../revisions-model.ts";

export function createImportedHouse(parent, onLoad) {
  const group = new THREE.Group();
  group.name = "House from supplied SketchUp model";
  parent.add(group);
  let state = {
    visible: true,
    enclosure: true,
    windows: true,
    layers: { floor1: true },
  };
  let ready = false;
  function apply() {
    group.visible = state.visible;
    if (!ready) return;
    group.traverse((node) => {
      if (node.userData.sourceKind) {
        const excluded = node.userData.sourceKind === "Groups"
          ? [...data.excludedGroups, ...revisions.hiddenGroups].includes(
            node.userData.sourceIndex,
          )
          : revisions.hiddenInstances.includes(node.userData.sourceIndex);
        node.visible = !excluded;
        if (!node.visible) return;
      }
      if (revisions.hiddenNodes.includes(node.userData.sourceNode)) {
        node.visible = false;
        return;
      }
      if (node.isMesh) {
        const materials = Array.isArray(node.material)
          ? node.material
          : [node.material];
        const glass = materials.some((mat) =>
          /KACA|GLASS|RYBEN|SILENT CLEAR/i.test(mat.name)
        );
        node.visible = !node.userData.canceledSurface &&
          (glass ? state.windows : state.enclosure);
        for (const material of materials) {
          material.visible = !!state.layers[material.userData.houseLayer];
          material.clipShadows = true;
        }
      }
    });
  }
  new GLTFLoader().load(
    data.asset,
    (gltf) => {
      const source = gltf.scene;
      // SketchUp Z-up to Three Y-up; rear-to-front becomes positive Three Z.
      source.rotation.x = -Math.PI / 2;
      source.position.set(
        -data.sourceOrigin[0],
        -data.sourceOrigin[2],
        data.sourceOrigin[1],
      );
      function tag(node, inherited) {
        node.userData.sourceNode = gltf.parser.associations.get(node)?.nodes ??
          inherited;
        for (const child of node.children) tag(child, node.userData.sourceNode);
      }
      tag(source, undefined);
      const stainless = new THREE.MeshStandardMaterial({
        name: "Confirmed stainless steel",
        color: 0xbac1c3,
        metalness: .95,
        roughness: .28,
        side: THREE.DoubleSide,
      });
      const greyMirror = new THREE.MeshStandardMaterial({
        name: "Grey-tinted mirror",
        color: 0x929b9e,
        metalness: 1,
        roughness: .045,
        side: THREE.DoubleSide,
      });
      const marble = new THREE.TextureLoader().load(
        revisions.marble.texture,
        () => onLoad(null),
      );
      marble.colorSpace = THREE.SRGBColorSpace;
      marble.flipY = true;
      const marbleMaterial = new THREE.MeshStandardMaterial({
        name: "Blue-white-gold marble",
        map: marble,
        roughness: .3,
        side: THREE.DoubleSide,
      });
      source.traverse((node) => {
        if (!node.isMesh) return;
        if (!node.geometry.attributes.normal) {
          node.geometry.computeVertexNormals();
        }
        const materials = Array.isArray(node.material)
          ? node.material
          : [node.material];
        node.material = materials.map((material) => {
          if (
            material.name === "[0003_DeepPink]" ||
            /Referigator stainless|YI0112|YI0114|YI0102/.test(material.name)
          ) return stainless;
          if (
            material.name === "Steve_Glasses_Black" ||
            material.name === "CERMIN STD1"
          ) return greyMirror;
          if (
            node.userData.sourceNode === revisions.marble.node &&
            material.name === revisions.marble.material
          ) return marbleMaterial;
          if (material.name === "COOPER") {
            material.metalness = .8;
            material.roughness = .3;
          }
          if (
            node.userData.sourceNode === 2795 &&
            ["CAT BESI HITAM", "TILE BACKYARD 2"].includes(material.name)
          ) node.userData.canceledSurface = true;
          if (
            node.userData.sourceNode === 3112 &&
            material.name === "TILE BACKYARD 1"
          ) {
            node.userData.canceledSurface = true;
          }
          return material;
        });
        if (!Array.isArray(materials) || node.material.length === 1) {
          node.material = node.material[0];
        }
        node.castShadow = !materials.every((m) =>
          /LANTAI|TILE|KACA|GLASS|RYBEN/.test(m.name)
        );
        node.receiveShadow = true;
      });
      group.add(source);
      source.updateWorldMatrix(true, true);
      source.traverse((node) => {
        if (!node.isMesh || node.material !== marbleMaterial) return;
        node.geometry = node.geometry.clone();
        const bounds = new THREE.Box3().setFromObject(node);
        const position = node.geometry.attributes.position;
        const uv = new Float32Array(position.count * 2);
        for (let i = 0; i < position.count; i++) {
          const p = new THREE.Vector3().fromBufferAttribute(position, i)
            .applyMatrix4(node.matrixWorld);
          uv[i * 2] = (p.x - bounds.min.x) / (bounds.max.x - bounds.min.x);
          uv[i * 2 + 1] = (p.y - bounds.min.y) / (bounds.max.y - bounds.min.y);
        }
        node.geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
      });
      // Partition triangles once, so each storey and ceiling switches independently.
      source.traverse((node) => {
        if (!node.isMesh) return;
        const geometry = node.geometry.clone();
        const positions = geometry.attributes.position;
        const indices = geometry.index?.array ??
          Array.from({ length: positions.count }, (_, i) => i);
        const original = Array.isArray(node.material)
          ? node.material
          : [node.material];
        const groups = geometry.groups.length
          ? geometry.groups
          : [{ start: 0, count: indices.length, materialIndex: 0 }];
        const buckets = new Map();
        const point = new THREE.Vector3();
        for (const section of groups) {
          for (
            let i = section.start;
            i < section.start + section.count;
            i += 3
          ) {
            let height = 0;
            for (let j = 0; j < 3; j++) {
              point.fromBufferAttribute(positions, indices[i + j]).applyMatrix4(
                node.matrixWorld,
              );
              height += (point.y + data.sourceOrigin[2]) / 3;
            }
            const name = original[section.materialIndex].name;
            const ceiling = /PLAF|CEILING/i.test(name);
            const layer = height >= 7.35
              ? "roof"
              : ceiling
              ? (height < 3.6 ? "ceiling1" : "ceiling2")
              : height >= 6.62
              ? "ceiling2"
              : height >= 3.6
              ? "floor2"
              : "floor1";
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
        const reordered = [];
        const materials = [];
        geometry.clearGroups();
        for (const bucket of buckets.values()) {
          const material = bucket.material.clone();
          material.userData.houseLayer = bucket.layer;
          geometry.addGroup(
            reordered.length,
            bucket.indices.length,
            materials.length,
          );
          for (const index of bucket.indices) reordered.push(index);
          materials.push(material);
        }
        geometry.setIndex(reordered);
        node.geometry = geometry;
        node.material = materials;
      });
      ready = true;
      apply();
      onLoad(null);
    },
    undefined,
    (error) => onLoad(error),
  );
  return {
    group,
    setState(next) {
      state = next;
      apply();
    },
  };
}
