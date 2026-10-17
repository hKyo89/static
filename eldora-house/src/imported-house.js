import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { importedModel as data } from "../imported-model.ts";
import { filmMaterials } from "./window-film.js";
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
  let night = false;
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
      if (node.userData.ledStripLight) {
        node.visible = night && state.enclosure && !!state.layers.floor1;
      }
      if (node.isMesh) {
        const materials = Array.isArray(node.material)
          ? node.material
          : [node.material];
        const glass = materials.some((mat) =>
          /KACA|GLASS|RYBEN|SILENT CLEAR|Exterior window film/i.test(mat.name)
        );
        node.visible = !node.userData.canceledSurface &&
          (glass ? state.windows : state.enclosure);
        for (const material of materials) {
          material.visible = !!state.layers[material.userData.houseLayer];
          material.clipShadows = true;
          if (material.userData.ledStrip) {
            material.emissiveIntensity = night ? 2.4 : 0;
          }
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
      function tag(node, inherited, root = null) {
        node.userData.sourceNode = gltf.parser.associations.get(node)?.nodes ??
          inherited;
        if (node.userData.sourceKind) {
          root = {
            kind: node.userData.sourceKind,
            index: node.userData.sourceIndex,
          };
        }
        node.userData.sourceRoot = root;
        for (const child of node.children) {
          tag(child, node.userData.sourceNode, root);
        }
      }
      tag(source, undefined);
      // Remove canceled objects from the scene graph permanently, so filters
      // and resets cannot restore nested fence pieces.
      const canceled = [];
      source.traverse((node) => {
        const kind = node.userData.sourceKind,
          index = node.userData.sourceIndex;
        if (
          kind === "Groups" &&
            [...data.excludedGroups, ...revisions.hiddenGroups].includes(
              index,
            ) ||
          kind === "Instances" && revisions.hiddenInstances.includes(index)
        ) canceled.push(node);
      });
      canceled.forEach((node) => node.removeFromParent());
      const cabinetGlass = new THREE.MeshPhysicalMaterial({
        name: "Clear cabinet glass",
        color: 0xffffff,
        transparent: true,
        opacity: .12,
        roughness: .04,
        metalness: 0,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const filmEnvironment = filmMaterials(true)[4].envMap;
      const stripIds = new Set([24, 25, 26, 27, 28, 29, 32, 48, 55, 56, 57]);

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
            [2962, 3023, 3026].includes(node.userData.sourceNode) &&
            material.name === "RYBEN"
          ) return cabinetGlass;
          const root = node.userData.sourceRoot;
          if (
            material.name === "EMISIVE CABINET" ||
            root?.kind === "Instances" && stripIds.has(root.index)
          ) {
            const led = new THREE.MeshStandardMaterial({
              name: "Warm white LED strip",
              color: 0xf2e6c9,
              emissive: 0xffd3a0,
              emissiveIntensity: 0,
              side: THREE.DoubleSide,
            });
            led.userData.ledStrip = true;
            return led;
          }
          if (material.name === "KACA JENDELA") {
            node.userData.exteriorFilm = true;
            const pane = new THREE.MeshPhysicalMaterial({
              name: "Exterior window film",
              color: 0x303a3f,
              transparent: true,
              opacity: .45,
              metalness: .15,
              roughness: .25,
              side: THREE.DoubleSide,
              envMap: filmEnvironment,
              envMapIntensity: 1.1,
              depthWrite: false,
            });
            return pane;
          }

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
      source.traverse((node) => {
        if (!node.isMesh || !node.userData.exteriorFilm) return;
        const root = node.userData.sourceRoot;
        const bounds = new THREE.Box3().setFromObject(node),
          centre = bounds.getCenter(new THREE.Vector3());
        let outward;
        if (root?.kind === "Groups" && root.index === 26) {
          outward = new THREE.Vector3(-1, 0, 0);
        } else if (root?.kind === "Instances" && [7, 8].includes(root.index)) {
          outward = new THREE.Vector3(1, 0, 0);
        } else if (
          root?.kind === "Groups" && root.index === 25 ||
          root?.kind === "Instances" && [10, 11, 12].includes(root.index)
        ) outward = new THREE.Vector3(0, 0, 1);
        else outward = new THREE.Vector3(0, 0, -1);
        node.onBeforeRender = (
          _renderer,
          _scene,
          camera,
          _geometry,
          material,
        ) => {
          const exterior =
            camera.getWorldPosition(new THREE.Vector3()).sub(centre).dot(
              outward,
            ) > 0;
          material.color.setHex(exterior ? 0xc5cbd0 : 0x273238);
          material.opacity = exterior ? .82 : .46;
          material.metalness = exterior ? .98 : .10;
          material.roughness = exterior ? .07 : .28;
        };
      });
      // Low-output strip spill at the three marked first-floor wall runs.
      for (
        const p of [[8.97, 19.97, 3.25], [6.25, 14.5, 3.42], [
          4.64,
          20.35,
          3.23,
        ]]
      ) {
        const spill = new THREE.PointLight(0xffd3a0, 1.1, 2.2, 2);
        spill.position.set(
          p[0] - data.sourceOrigin[0],
          p[2] - data.sourceOrigin[2],
          data.sourceOrigin[1] - p[1],
        );
        spill.userData.ledStripLight = true;
        group.add(spill);
      }
      ready = true;
      apply();
      onLoad(null);
    },
    undefined,
    (error) => onLoad(error),
  );
  return {
    group,
    setNight(value) {
      night = value;
      apply();
    },
    setState(next) {
      state = next;
      apply();
    },
  };
}
