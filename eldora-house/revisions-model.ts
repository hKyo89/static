// Source SKP metres: X right, Y towards rear, Z up. Product dimensions in metres.
export const revisions = {
  focusAreas: [
    {
      id: "display-cabinets",
      name: "Clear glass / bottle cabinets",
      bounds: [10.8, 12.1, 11.57, 16.25],
      insideCamera: [9.7, 12.53, 2.95],
      insideTarget: [11.15, 12.53, 2.95],
    },
    {
      id: "wet-kitchen",
      name: "Wet kitchen / Option D exhaust",
      bounds: [1.87, 12.2, 4.1, 15.1],
    },
    {
      id: "living-seating",
      insideCamera: [10.1, 16.3, 2.65],
      insideTarget: [8.35, 18.6, 1.05],
      name: "Madelline seating / TV",
      bounds: [6.7, 16.6, 11.57, 20.25],
    },
    {
      id: "rear-sofa",
      insideCamera: [3.38, 18.5, 1.8],
      insideTarget: [3.38, 20.77, 1.15],
      name: "Panel sofa / blue marble",
      bounds: [1.8732, 19.8, 5.02, 21.36],
    },
    {
      id: "digital-piano",
      name: "Digital piano",
      bounds: [5.0, 12.75, 6.4, 15.3],
    },
    {
      id: "kitchen-island",
      name: "Kitchen island / taps",
      bounds: [8.25, 12.5, 10.2, 15.5],
    },
    {
      id: "dining-seating",
      name: "Dining table / grey chairs",
      bounds: [8.4, 9.2, 11.57, 12.2],
    },
    {
      id: "garage-canopy",
      name: "Garage / rain chains",
      bounds: [1.723, .2063, 11.723, 6.5063],
    },
  ],
  wetKitchenExhaust: {
    // Native wall-face sections from house.glb, not the standalone Duct room.
    roomX: [1.8732, 3.6732],
    rearWallY: 14.8813,
    hoodRearGap: .01,
    hoodWidth: 1.5,
    floorZ: .6,
    shaftBounds: [1.8732, 12.1313, 2.7732, 12.5313],
    riserCentre: [2.1732, 12.3313],
    riserSection: [.35, .15],
    lateralStraight: .05,
  },
  courtyard: {
    sourceBounds: [5.0232, 19.5563, 11.5732, 21.3563],
    offset: [.0752, 0, 1.2247],
    width: 6.55,
    stripDepth: 1,
    returnWidth: 1.35,
    returnDepth: 1.8,
  },
  hiddenGroups: [78, 79, 88, 89],
  hiddenInstances: [35, 36, 53, 63, 66, 67, 68, 71], // canceled large painting and replaced wet-kitchen hood
  hiddenNodes: [3082], // replace the island's original rectangular tap
  marble: {
    node: 2186,
    material: "20 - Default",
    texture: "./assets/blue-gold-marble.png",
  },
  sofa: {
    centre: [7.78, 18.6, .6],
    leftArm: [1.08, 1.04, .94],
    armless: [.86, 1.04, .94],
    ottoman: [.88, 1.05, .51],
    coffeeTable: [1.05, .90, .435],
    coffeeCentre: [9.5, 18.93, .6],
    endTable: false,
    armlessCount: 3,
  },
  panelSofa: {
    centre: [3.38, 20.77, .6],
    size: [2.75, .95, .90],
    remainingGap: .26,
  },
  piano: { centre: [5.34, 14.03, .6], size: [1.35, .48, .84] },
  islandChairs: {
    xs: 8.58,
    ys: [13.12, 13.72, 14.32, 14.92],
    floor: .6,
    seat: .65,
  },
  diningChairs: {
    xs: [9.18, 9.97, 10.76],
    ys: [9.76, 11.73],
    floor: .6,
    seat: .46,
  },
  taps: {
    // Sink opening spans source Y 13.0063–13.6063 m; outer bases inset 5 cm.
    main: [9.36, 13.3063, 1.5],
    soap: [9.36, 13.5563, 1.5],
    drinking: [9.36, 13.0563, 1.5],
  },
  canopy: {
    roofBounds: [0, 15, 10, 21.3],
    gutterDepth: .20,
    gutterWidth: .20,
    outlets: [.16, 9.84],
    tileSize: .60,
  },
} as const;
