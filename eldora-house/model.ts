// Metres. Origin: rear-left corner in the plan; +X right, +Z toward house, +Y up.
export const model = {
  width: 6.55,
  stripDepth: 1,
  returnWidth: 1.35,
  returnDepth: 1.8,
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
  slidingWidth: 3.6,
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
  tileSize: 0.60,
  tileColour: [76, 80, 84],
  tileGrain: 40,
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
  projection: 0.070,
  mountingGap: 0.001,
  lensRadius: 0.012,
  lensOffset: 0.035,
  lensRimWidth: 0.003,
  beamOffset: 0.035,
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
const referenceGardenLayout = {
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
  olive: {
    x: .27,
    z: 1.72,
    height: 1.50,
    crownRadius: .22,
    potRadius: .14,
    potHeight: .24,
  },
  bamboo: { x: .48, z: .34, height: 1.85, spread: .29, stems: 7 },
  minorPlants: [
    [.45, .32, .40],
    [.32, 1.38, .34],
    [.78, 1.42, .28],
    [1.55, .30, .38],
    [2.05, .33, .32],
    [1.05, .35, .24],
    [2.65, .27, .30],
    [3.45, .3, .25],
    [4.7, .24, .28],
    [5.25, .27, .23],
    [6.3, .23, .22],
  ],
  grassClumps: [
    { x: .22, z: .25, height: .46, heads: true },
    { x: .85, z: .22, height: .46, heads: false },
    { x: .24, z: 1.12, height: .46, heads: true },
    { x: 1.45, z: .28, height: .38, heads: false },
    { x: 2.05, z: .23, height: .46, heads: true },
    { x: 2.3, z: .48, height: .30, heads: false },
    { x: 3.15, z: .2, height: .38, heads: true },
    { x: 4.85, z: .22, height: .30, heads: false },
    { x: 5.55, z: .18, height: .38, heads: false },
    { x: 6.35, z: .18, height: .46, heads: true },
  ],
  bonsai: { x: 4.22, z: .35, height: 1.70 },
  lantern: { x: 5.65, z: .33 },
  fountain: { x: 6.13, z: .43, width: .64, depth: .64, height: .75 },
  rocks: [
    [.4, .38, .18],
    [.95, .25, .13],
    [1.35, .43, .18],
    [2.4, .28, .18],
    [3.5, .32, .16],
    [4.6, .38, .12],
    [5.1, .35, .23],
    [5.85, .24, .12],
    [6.48, .65, .12],
    [3.02, .34, .17],
  ],
  turfPatches: [
    [.62, .31, .53, .28],
    [.50, 1.38, .44, .26],
    [1.85, .32, .60, .26],
    [3.56, .3, .52, .24],
    [4.25, .34, .40, .26],
    [5.85, .35, .82, .29],
  ],
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
  canopyPads: [
    [-.32, .38, .02, .24],
    [.25, .50, -.02, .26],
    [-.27, .65, .02, .25],
    [.30, .79, 0, .24],
    [-.21, .92, .01, .23],
    [.16, 1.06, 0, .24],
    [.01, 1.2, 0, .25],
  ],
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

// Tiled drain channel: rear long wall and garden-side window edge of the L.
export const gutter = { width: .20, depth: .05 } as const;
// Layer thicknesses are illustrative; user confirmed draincell + geotextile.
// Preserve product sizes while registering planting positions to the SKP courtyard.
const sx = model.width / 6.775;
const sz = model.stripDepth / 1.225;
const position = (p: { x: number; z: number }) => ({
  ...p,
  x: p.x * sx,
  z: p.z <= 1.225 ? p.z * sz : p.z - .225,
});
export const gardenLayout = {
  ...referenceGardenLayout,
  steppingStones: referenceGardenLayout.steppingStones.map(([x, z]) =>
    [x * sx, z <= 1.225 ? z * sz : z - .225] as const
  ),
  olive: {
    ...referenceGardenLayout.olive,
    ...position(referenceGardenLayout.olive),
  },
  bamboo: {
    ...referenceGardenLayout.bamboo,
    ...position(referenceGardenLayout.bamboo),
  },
  bonsai: {
    ...referenceGardenLayout.bonsai,
    ...position(referenceGardenLayout.bonsai),
  },
  lantern: position(referenceGardenLayout.lantern),
  ball: {
    ...referenceGardenLayout.ball,
    ...position(referenceGardenLayout.ball),
  },
  accentRock: {
    ...referenceGardenLayout.accentRock,
    ...position(referenceGardenLayout.accentRock),
  },
  grassClumps: referenceGardenLayout.grassClumps.map((p) => ({
    ...p,
    ...position(p),
  })),
  minorPlants: referenceGardenLayout.minorPlants.map(([x, z, h]) =>
    [x * sx, z <= 1.225 ? z * sz : z - .225, h] as const
  ),
  rocks: referenceGardenLayout.rocks.map(([x, z, r]) =>
    [x * sx, z * sz, r] as const
  ),
  turfPatches: referenceGardenLayout.turfPatches.map(([x, z, rx, rz]) =>
    [x * sx, z <= 1.225 ? z * sz : z - .225, rx, rz * sz] as const
  ),
  glowingStones: referenceGardenLayout.glowingStones.map(([x, z, d]) =>
    [Math.min(x * sx, model.width - d / 2 - .04), z * sz, d] as const
  ),
};

export const gardenBuildUp = {
  draincellThickness: .020,
  geotextileThickness: .002,
} as const;
