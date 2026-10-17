import { revisions as r } from "../eldora-house/revisions-model.ts";
import { importedModel } from "../eldora-house/imported-model.ts";
import { canopyModel } from "../eldora-house/house-model.ts";
import { gardenLayout, model } from "../eldora-house/model.ts";

Deno.test("courtyard registration matches the native ground-floor bounds", () => {
  const [x, y, x2, y2] = r.courtyard.sourceBounds;
  const close = (a: number, b: number) => Math.abs(a - b) < 1e-6;
  if (
    !close(importedModel.sourceOrigin[0] + r.courtyard.offset[0], x) ||
    !close(importedModel.sourceOrigin[1] - r.courtyard.offset[2], y2) ||
    !close(model.width, x2 - x) || !close(model.returnDepth, y2 - y)
  ) {
    throw new Error("Garden is outside the actual source courtyard");
  }
  const plants = [
    gardenLayout.bonsai,
    gardenLayout.ball,
    ...gardenLayout.grassClumps,
  ];
  if (
    plants.some((p) =>
      p.x <= 0 || p.x >= model.width || p.z <= 0 || p.z >= model.stripDepth
    )
  ) {
    throw new Error("Plant anchor lies outside the pebble strip");
  }
});
Deno.test("canopy cover reaches floor edge while frame and six lights stay fixed", () => {
  if (
    r.canopy.roofBounds[3] <= canopyModel.bounds[3] ||
    r.canopy.gutterDepth !== .20 || r.canopy.outlets.length !== 2 ||
    r.canopy.tileSize !== .60 || canopyModel.downlights.length !== 6 ||
    canopyModel.columns[0][1] !== 19.88 || canopyModel.columns[1][1] !== 19.88
  ) {
    throw new Error(
      "Canopy extension changed frame or missed drainage requirements",
    );
  }
});
Deno.test("approved seating counts and Madelline dimensions are preserved", () => {
  if (
    r.islandChairs.ys.length !== 4 ||
    r.diningChairs.xs.length * r.diningChairs.ys.length !== 6 ||
    r.sofa.endTable || r.sofa.leftArm.join() !== "1.08,1.04,0.94" ||
    r.sofa.armless.join() !== "0.86,1.04,0.94" ||
    r.sofa.ottoman.join() !== "0.88,1.05,0.51" ||
    r.sofa.coffeeTable.join() !== "1.05,0.9,0.435"
  ) {
    throw new Error("Incorrect seating or supplied furniture measurements");
  }
});
