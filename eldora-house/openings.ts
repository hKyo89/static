import { houseModel, houseWalls } from "./house-model.ts";
import { frontage, model, slidingStart, windows } from "./model.ts";
// Stable references to complete opening assemblies, using global plan X/Z metres.
export const openingReferences = [
  ...windows.map((w) => ({
    id: w.id,
    name: w.name,
    kind: "window",
    a: [w.a[0] + houseModel.gardenOffsetX, w.a[1]],
    b: [w.b[0] + houseModel.gardenOffsetX, w.b[1]],
    garden: true,
  })),
  {
    id: "DR01",
    name: "Living area — garden sliding doors",
    kind: "sliding",
    a: [slidingStart + houseModel.gardenOffsetX, model.stripDepth],
    b: [10, model.stripDepth],
    garden: true,
  },
  ...houseWalls.flatMap((w) => {
    const length = Math.hypot(w.b[0] - w.a[0], w.b[1] - w.a[1]);
    const point = (
      t: number,
    ) => [
      w.a[0] + (w.b[0] - w.a[0]) * t / length,
      w.a[1] + (w.b[1] - w.a[1]) * t / length,
    ];
    return w.openings.map((o) => ({
      id: o.id,
      name: o.name,
      kind: o.kind,
      a: point(o.at),
      b: point(o.at + o.width),
      garden: false,
    }));
  }),
];
// Sliding leaf suffixes count from drawing-left to drawing-right. Only DR01
// centre leaves B/C operate; the front assembly is a provisional static depiction.
export const slidingDoorReferences = [
  {
    id: "DR01",
    leaves: ["DR01-A", "DR01-B", "DR01-C", "DR01-D"],
    count: frontage.leafCount,
  },
  { id: "DR02", leaves: ["DR02-A", "DR02-B", "DR02-C", "DR02-D"], count: 4 },
] as const;
