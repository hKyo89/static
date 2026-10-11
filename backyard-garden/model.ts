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
  trackCount: 2,
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
// Outer leaves stay in place; the centre pair slides outward behind them.
export function slidingLeafPositions(openFraction: number) {
  const fraction = Math.max(
    0,
    Math.min(1, Number.isFinite(openFraction) ? openFraction : 0),
  );
  const pitch = leafWidth - frontage.overlap;
  return Array.from({ length: frontage.leafCount }, (_, i) => ({
    x: slidingStart + i * pitch +
      (i === 1 ? -pitch * fraction : i === 2 ? pitch * fraction : 0),
    z: model.stripDepth +
      ((i === 1 || i === 2) ? .5 : -.5) * frontage.trackSpacing,
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
  sunPosition: [0, 12, 0],
} as const;

// Six compact up/down sconces, counting sections from the right.
export const wallLights = {
  count: 6,
  height: 2,
  bodyHeight: 0.16,
  radius: 0.035,
  projection: 0.10,
} as const;
export const wallLightPositions = Array.from(
  { length: wallLights.count },
  (_, i) => ({
    x: model.width - (i + .5) * model.width / finishes.wallSections,
    y: wallLights.height,
    z: model.wallThickness / 2 + wallLights.projection,
  }),
);

// Concept layout: rear-wall bed opposite the sliding doors, clear granite approach.
export const gardenLayout = {
  // Deliberately staggered, not random on each load; X/Z positions in metres.
  steppingStones: [
    [.57, 1.72],
    [.84, 1.26],
    [.54, .80],
    [1.08, .95],
    [1.61, .72],
    [2.18, .94],
    [2.73, .76],
    [3.26, .97],
    [3.82, .79],
    [4.38, .98],
    [4.94, .76],
    [5.48, .95],
    [6.06, .79],
  ],
  bed: { x: 4.8, z: .36, width: 3.6, depth: .50 },
  bonsai: { x: 4.22, z: .35, height: 1.35 },
  lantern: { x: 5.65, z: .33 },
  pebbleLight: { x: 6.18, z: .40 },
  rocks: [[3.50, .32, .16], [4.60, .38, .12], [5.14, .28, .18]],
  grass: [[3.28, .37], [4.78, .42], [6.40, .30]],
} as const;
