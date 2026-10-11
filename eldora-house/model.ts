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
    id: "WIN01",
    name: "Living area — garden fixed window",
    a: [model.returnWidth, model.stripDepth],
    b: [slidingStart - frontage.separatorWidth, model.stripDepth],
    bays: 1,
  },
  {
    id: "WIN02",
    name: "Rear room — garden-side window",
    a: [0, 0],
    b: [0, model.returnDepth],
    bays: 2,
  },
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
  projection: 0.035,
  mountingGap: 0.001,
  beamOffset: 0.018,
  beamIntensity: 0.45,
  beamRange: 0.9,
} as const;
export const wallLightPositions = Array.from(
  { length: wallLights.count },
  (_, i) => ({
    x: model.width - (i + .5) * model.width / finishes.wallSections,
    y: wallLights.height,
    z: model.wallThickness / 2 + wallLights.mountingGap,
  }),
);

// Concept layout: rear-wall bed opposite the sliding doors, clear granite approach.
export const gardenLayout = {
  // Deliberately staggered, not random on each load; X/Z positions in metres.
  steppingStones: [
    [.94, 1.76],
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
  bonsai: { x: 4.22, z: .35, height: 1.35 },
  lantern: { x: 5.65, z: .33 },
  rocks: [[3.50, .32, .16], [4.60, .38, .12], [2.40, .28, .18]],
  turfPatches: [[1.68, .30, .29, .20], [3.84, .34, .44, .22], [
    5.94,
    .35,
    .42,
    .24,
  ]],
  mossRocks: { perPatch: 12, minRadius: .025, maxRadius: .04 },
  glowingStones: [[3.02, .34, .33], [6.40, .39, .31]],
  ball: { x: 5.14, y: .29, z: .33, diameter: .50 },
  accentRock: { x: 3.35, y: .17, z: .32, scale: [.23, .20, .16] },
  bin: { x: 1.08, z: 1.76, height: .62, radius: .12, base: .05 },
  deck: {
    boards: 9,
    gap: .006,
    thickness: .045,
    centreY: .027,
    endInset: .025,
  },
  canopyPads: [[-.24, .55, .03, .23], [.24, .78, -.03, .23], [
    -.19,
    .98,
    .01,
    .22,
  ], [.01, 1.2, 0, .28]],
  spotlight: {
    offset: [.08, .09, .55],
    targetY: .85,
    targetZ: .03,
    intensity: 6,
    range: 4,
  },
} as const;

// Wall paths are centre-lines in metres. Solid-wall ends overlap by half their
// thickness to seal perpendicular junctions. Divider gaps use exact ends.
export const wallSegments = [
  {
    name: "Right boundary",
    a: [model.width, 0],
    b: [model.width, model.stripDepth],
    bottom: 0,
    top: model.wallHeight,
    boundary: true,
  },
  {
    name: "Inset return",
    a: [model.returnWidth, model.stripDepth],
    b: [model.returnWidth, model.returnDepth],
    bottom: 0,
    top: model.wallHeight,
    boundary: false,
  },
  {
    name: "Solid short return",
    a: [0, model.returnDepth],
    b: [model.returnWidth, model.returnDepth],
    bottom: 0,
    top: model.wallHeight,
    boundary: false,
  },
  {
    name: "Fixed-window separator",
    a: [slidingStart - frontage.separatorWidth, model.stripDepth],
    b: [slidingStart, model.stripDepth],
    bottom: 0,
    top: model.wallHeight,
    boundary: false,
  },
  {
    name: "Sliding-door header",
    a: [slidingStart, model.stripDepth],
    b: [model.width, model.stripDepth],
    bottom: model.windowTop,
    top: model.wallHeight,
    boundary: false,
  },
] as const;
export function wallPanelLength(
  a: readonly number[],
  b: readonly number[],
  thickness: number,
  joined = true,
) {
  return Math.hypot(b[0] - a[0], b[1] - a[1]) + (joined ? thickness : 0);
}

// User-confirmed film appearance; opacity/roughness are visual approximations.
export const windowFilm = {
  insideColour: 0x171c21,
  insideOpacity: .82,
  outsideColour: 0xd5d9df,
  outsideOpacity: .96,
  outsideMetalness: .95,
  outsideRoughness: .13,
} as const;
