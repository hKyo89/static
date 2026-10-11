// Metres. Origin: rear-left corner in the plan; +X right, +Z toward house, +Y up.
export const model = {
  width: 6.775,
  stripDepth: 1.225,
  returnWidth: 1.35,
  returnDepth: 2.025,
  wallHeight: 3,
  wallThickness: 0.12,
  windowBottom: 0.12,
  windowTop: 2.85,
} as const;
export const floorArea = model.width * model.stripDepth +
  model.returnWidth * (model.returnDepth - model.stripDepth);
export const outline = [
  [0, 0],
  [model.width, 0],
  [model.width, model.stripDepth],
  [model.returnWidth, model.stripDepth],
  [model.returnWidth, model.returnDepth],
  [0, model.returnDepth],
] as const;
// The blueprint's 1.600 m left bay includes the illustrative separator.
export const frontage = {
  fixedBayWidth: 1.6,
  separatorWidth: 0.12,
  slidingWidth: 3.825,
  leafCount: 4,
  overlap: 0.04,
  trackSpacing: 0.06,
  doorBottom: 0.02,
} as const;
export const slidingStart = model.returnWidth + frontage.fixedBayWidth;
export const leafWidth =
  (frontage.slidingWidth + (frontage.leafCount - 1) * frontage.overlap) /
  frontage.leafCount;
export const windows = [
  {
    name: "Fixed frontage window",
    a: [model.returnWidth, model.stripDepth],
    b: [slidingStart - frontage.separatorWidth, model.stripDepth],
    bays: 1,
  },
  { name: "Left-side window", a: [0, 0], b: [0, model.returnDepth], bays: 2 },
] as const;
// Four separate tracks allow leaves to stack without passing through one another.
// The stacking arrangement is illustrative; the confirmed fact is four sliding doors.
export function slidingLeafPositions(openFraction: number) {
  const fraction = Math.max(
    0,
    Math.min(1, Number.isFinite(openFraction) ? openFraction : 0),
  );
  return Array.from({ length: frontage.leafCount }, (_, i) => ({
    x: slidingStart + i * (leafWidth - frontage.overlap) * (1 - fraction),
    z: model.stripDepth +
      (i - (frontage.leafCount - 1) / 2) * frontage.trackSpacing,
  }));
}

// User-confirmed finishes and seven sections across the long rear wall.
export const finishes = {
  wallSections: 7,
  dividerWidth: 0.018,
  dividerDepth: 0.008,
  tileSize: 0.45,
} as const;

// Two storeys confirmed; total height/depth and sun angle are illustrative.
export const lighting = {
  houseHeight: 6,
  houseDepth: 4,
  sunPosition: [-4, 12, -8],
} as const;
