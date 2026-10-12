import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { importedModel as data } from "../imported-model.ts";

export function createImportedHouse(parent, onLoad) {
  const group = new THREE.Group();
  group.name = "House from supplied SketchUp model";
  parent.add(group);
  let state = { visible: true, enclosure: true, windows: true, upper: false };
  let ready = false;
  function apply() {
    group.visible = state.visible;
    if (!ready) return;
    group.traverse((node) => {
      if (node.userData.sourceKind) {
        const bounds = node.userData.boundsMetres;
        const excluded = node.userData.sourceKind === "Groups" &&
          data.excludedGroups.includes(node.userData.sourceIndex);
        node.visible = !excluded &&
          (state.upper || bounds[0][2] < data.upperFloorThreshold);
      }
      if (node.isMesh) {
        const materials = Array.isArray(node.material)
          ? node.material
          : [node.material];
        const glass = materials.some((mat) =>
          /KACA|GLASS|RYBEN|SILENT CLEAR/i.test(mat.name)
        );
        node.visible = glass ? state.windows : state.enclosure;
        for (const material of materials) {
          material.clippingPlanes = state.upper ? [] : [
            new THREE.Plane(new THREE.Vector3(0, -1, 0), 2.52),
          ];
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
      source.traverse((node) => {
        if (!node.isMesh) return;
        if (!node.geometry.attributes.normal) {
          node.geometry.computeVertexNormals();
        }
        node.castShadow = node.receiveShadow = true;
      });
      group.add(source);
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
