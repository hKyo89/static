// First-floor interpretation of the supplied electrical plan. Metres.
// Global plan origin: rear-left lot corner; X right, Z toward street, Y up.
// Courtyard renderer retains its original origin at global X=3.225.
export const houseModel = {
  width: 10,
  depth: 20,
  gardenOffsetX: 3.225,
  wallHeight: 3,
  thickness: .12,
  interiorColour: 0xf1eee7,
} as const;
export const rooms = [
  {
    id: "G01",
    name: "Backyard Zen garden",
    bounds: [3.225, 0, 10, 1.225],
    note: "Confirmed garden, plus short L-shaped smoking nook.",
  },
  {
    id: "G02",
    name: "Smoking nook",
    bounds: [3.225, 1.225, 4.575, 2.025],
    note: "Walnut decking and concealed ashtray bin.",
  },
  {
    id: "R01",
    name: "Rear room",
    bounds: [0, 0, 3.225, 4],
    note: "Room use unconfirmed; provisional bedroom / utility room.",
  },
  {
    id: "R02",
    name: "Service room",
    bounds: [0, 4, 2.025, 6.55],
    note: "Room use unconfirmed; possible bathroom / service area.",
  },
  {
    id: "R03",
    name: "Side room & lightwell",
    bounds: [0, 6.55, 2.025, 9.95],
    note: "Void shown on plan; room use unconfirmed.",
  },
  {
    id: "S01",
    name: "Stair & circulation",
    bounds: [2.025, 3.4, 4.575, 9.95],
    note: "Stair flights and adjoining passage.",
  },
  {
    id: "R04",
    name: "Storage",
    bounds: [0, 9.95, 4.575, 15],
    note: "Confirmed storage; rounded sliding metal enclosure toward garage.",
  },
  {
    id: "R05",
    name: "Main living / dining",
    bounds: [4.575, 1.225, 10, 12.2],
    note: "Large open room opposite the garden; use provisional.",
  },
  {
    id: "E01",
    name: "Foyer",
    bounds: [4.575, 12.2, 8.2, 14.35],
    note: "Main approach from front terrace.",
  },
  {
    id: "R06",
    name: "Side terrace",
    bounds: [8.2, 12.2, 10, 15.625],
    note: "Terrace beside foyer, confirmed by architectural crop.",
  },
  {
    id: "T01",
    name: "Foyer front approach",
    bounds: [4.575, 14.35, 8.2, 15.625],
    note: "Covered entrance transition; roof omitted for viewing.",
  },
  {
    id: "P01",
    name: "Open garage",
    bounds: [0, 15.625, 10, 20],
    note: "Confirmed open garage without perimeter walls or gates.",
  },
] as const;
// Openings are offsets along wall centre-lines. New sizes/heights are illustrative.
export const houseWalls = [
  { id: "W01", a: [0, 0], b: [3.225, 0], openings: [] },
  {
    id: "W02",
    a: [0, 0],
    b: [0, 15],
    openings: [],
  },
  {
    id: "W03",
    a: [0, 4],
    b: [3.225, 4],
    openings: [{
      id: "DR03",
      name: "Rear room to stair passage",
      at: 2.18,
      width: .85,
      kind: "door",
    }],
  },
  { id: "W04", a: [3.225, 2.025], b: [3.225, 4], openings: [] },
  {
    id: "W05",
    a: [2.025, 4],
    b: [2.025, 9.95],
    openings: [{
      id: "DR04",
      name: "Service room to stair passage",
      at: .45,
      width: .8,
      kind: "door",
    }, {
      id: "DR05",
      name: "Side room to stair passage",
      at: 3.25,
      width: .8,
      kind: "door",
    }],
  },
  { id: "W06", a: [0, 6.55], b: [2.025, 6.55], openings: [] },
  {
    id: "W07",
    a: [0, 9.95],
    b: [4.575, 9.95],
    openings: [{
      id: "DR06",
      name: "Storage — rear passage door",
      at: 2.3,
      width: .9,
      kind: "door",
    }],
  },
  {
    id: "W08",
    a: [4.575, 2.025],
    b: [4.575, 8.9],
    openings: [{
      id: "OP01",
      name: "Living area to stair passage",
      at: .15,
      width: 1,
      kind: "passage",
    }],
  },
  { id: "W09", a: [3.225, 8.9], b: [4.575, 8.9], openings: [] },
  {
    id: "W12",
    a: [10, 1.225],
    b: [10, 15.625],
    openings: [],
  },
  {
    id: "W13",
    a: [4.575, 14.35],
    b: [8.2, 14.35],
    openings: [{
      id: "WIN12",
      name: "Foyer — front fixed glazing",
      at: .06,
      width: 3.505,
      kind: "window",
      bottom: .12,
      top: 2.85,
    }],
  },
  {
    id: "W14",
    a: [6.175, 12.2],
    b: [10, 12.2],
    openings: [{
      id: "WIN13",
      name: "Dining divider — terrace-side window",
      at: 3.325,
      width: .44,
      kind: "window",
    }],
  },
  {
    id: "W15",
    a: [8.2, 12.2],
    b: [8.2, 15.625],
    openings: [{
      id: "WIN14",
      name: "Foyer — narrow terrace-side window",
      at: .12,
      width: .48,
      kind: "window",
    }, {
      id: "DR08",
      name: "Foyer — hinged terrace entrance",
      at: .72,
      width: 1,
      kind: "door",
    }],
  },
] as const;
// Continuous rounded metal sliding enclosure, closed depiction. Dimensions estimated.
export const storageDoor = {
  id: "DR09",
  name: "Storage — curved sliding metal door",
  start: [0, 15],
  cornerCentre: [3.925, 14.35],
  radius: .65,
  end: [4.575, 9.95],
  height: 2.85,
  slatPitch: .08,
  labelPosition: [4.385, 14.81],
} as const;

export const lightwells = [{ bounds: [.15, 8.85, 1.2, 9.8] }] as const;

// Photo-confirmed canopy finishes/frame; dimensions below are illustrative.
export const canopyModel = {
  bounds: [0, 15, 10, 20],
  ceilingHeight: 3,
  steelDepth: .20,
  steelWidth: .10,
  flangeThickness: .008,
  webThickness: .0055,
  roofGap: .04,
  roofColour: 0xc6c9c8,
  columns: [[.12, 19.88], [9.88, 19.88]],
  beamRows: [15.12, 17.5, 19.88],
  downlights: [[1.925, 16.775], [5, 16.775], [7.825, 16.775], [1.925, 18.775], [
    5,
    18.775,
  ], [7.825, 18.775]],
  lightRadius: .065,
} as const;
