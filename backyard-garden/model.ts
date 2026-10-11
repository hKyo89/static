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
export const windows = [
  {
    name: "Main house window",
    a: [model.returnWidth, model.stripDepth],
    b: [model.width, model.stripDepth],
    bays: 5,
  },
  {
    name: "Return window",
    a: [0, model.returnDepth],
    b: [model.returnWidth, model.returnDepth],
    bays: 1,
  },
  { name: "Left-side window", a: [0, 0], b: [0, model.returnDepth], bays: 2 },
] as const;
