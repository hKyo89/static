import * as THREE from "three";
import { windowFilm as film } from "../model.ts";
let reflection;
function reflectionMap() {
  if (reflection) return reflection;
  // Local illustrative sky/ground reflection, requiring no network image assets.
  const faces = Array.from({ length: 6 }, (_, i) => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const ctx = c.getContext("2d");
    const g = ctx.createLinearGradient(0, 0, 0, 128);
    g.addColorStop(0, i === 3 ? "#4b514b" : "#e4edf7");
    g.addColorStop(.48, "#b8c8d9");
    g.addColorStop(.52, "#798574");
    g.addColorStop(1, "#3e443d");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    return c;
  });
  reflection = new THREE.CubeTexture(faces);
  reflection.colorSpace = THREE.SRGBColorSpace;
  reflection.needsUpdate = true;
  return reflection;
}
export function filmMaterials(outsidePositive) {
  const inside = new THREE.MeshPhysicalMaterial({
    color: film.insideColour,
    transparent: true,
    opacity: film.insideOpacity,
    roughness: .32,
    metalness: .15,
    depthWrite: true,
  });
  const outside = new THREE.MeshPhysicalMaterial({
    color: film.outsideColour,
    transparent: true,
    opacity: film.outsideOpacity,
    roughness: film.outsideRoughness,
    metalness: film.outsideMetalness,
    envMap: reflectionMap(),
    envMapIntensity: 1.1,
    depthWrite: true,
  });
  // BoxGeometry faces: +X, -X, +Y, -Y, +Z, -Z. Broad faces have distinct finishes.
  return [
    inside,
    inside,
    inside,
    inside,
    outsidePositive ? outside : inside,
    outsidePositive ? inside : outside,
  ];
}
