// Source coordinates are SketchUp metres: X right, Y towards rear, Z up.
// Match the lot's 10 m width, rear courtyard and retained canopy, without
// changing the imported house's proportions.
export const importedModel = {
  asset: "./assets/house.glb",
  sourceOrigin: [4.948, 22.581, .43],
  canopyOffsetZ: 1.075,
  upperFloorThreshold: 3.8,
  excludedGroups: [0, 27], // site context and original garage canopy
} as const;
