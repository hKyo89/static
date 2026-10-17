import { app } from "../main.tsx";
import { basePath, projects } from "../projects.ts";
import {
  floorArea,
  frontage,
  leafWidth,
  model,
  outline,
  slidingLeafPositions,
  slidingStart,
  wallPanelLength,
  wallSegments,
  windows,
} from "../eldora-house/model.ts";

Deno.test("all registered projects render beneath the Pages prefix", async () => {
  const handler = app.handler();
  for (const path of ["", ...projects.map((p) => `${p.slug}/`)]) {
    const response = await handler(
      new Request(`http://localhost${basePath}/${path}`),
    );
    const html = await response.text();
    if (response.status !== 200 || !html.includes("<html")) {
      throw new Error(`Cannot render ${path}`);
    }
    if (/\b(?:src|href)="\/(?!\/)/.test(html)) {
      throw new Error(`Non-portable asset in ${path}`);
    }
    if (/https:\/\/(?:cdn|unpkg|esm\.)/.test(html)) {
      throw new Error(`External runtime dependency in ${path}`);
    }
  }
});
Deno.test("slash redirects retain the request origin and route", async () => {
  for (
    const path of [
      "/static",
      "/static/eldora-house",
      "/static/duct",
      "/static/shopee",
    ]
  ) {
    const response = await app.handler()(
      new Request(`https://example.test${path}`),
    );
    if (
      response.status !== 308 ||
      response.headers.get("location") !== `https://example.test${path}/`
    ) throw new Error("Bad slash redirect");
    await response.body?.cancel();
  }
});
Deno.test("L-shaped floor area and window lengths match interpreted plan", () => {
  const polygonArea = Math.abs(
    outline.reduce((sum, p, i) => {
      const next = outline[(i + 1) % outline.length];
      return sum + p[0] * next[1] - next[0] * p[1];
    }, 0) / 2,
  );
  if (
    Math.abs(polygonArea - 7.63) > 1e-8 ||
    Math.abs(floorArea - polygonArea) > 1e-8
  ) throw new Error("Bad L-shaped footprint");
  const lengths = windows.map((w) =>
    Math.hypot(w.b[0] - w.a[0], w.b[1] - w.a[1])
  );
  if (
    Math.abs(lengths[0] - 1.48) > 1e-8 || lengths[1] !== 1.8
  ) throw new Error("Incorrect wall-wide openings");
  if (
    model.wallHeight !== 3 || model.windowTop >= model.wallHeight ||
    model.windowBottom < 0
  ) throw new Error("Window outside wall");
});
Deno.test("unknown pages and source files are not served", async () => {
  for (
    const path of [
      "/static/no-such-project/",
      "/static/.git/config",
      "/static/eldora-house/model.ts",
    ]
  ) {
    const response = await app.handler()(
      new Request(`http://localhost${path}`),
    );
    if (response.status !== 404) throw new Error(`Source leak: ${path}`);
    await response.body?.cancel();
  }
});

Deno.test("legacy Duct build URL redirects to the shared route", async () => {
  const response = await app.handler()(
    new Request("https://example.test/static/duct/dist/"),
  );
  if (
    response.status !== 308 ||
    response.headers.get("location") !== "https://example.test/static/duct/"
  ) throw new Error("Legacy Duct URL broken");
  await response.body?.cancel();
});

Deno.test("fixed window, wall separator and four sliding doors preserve frontage", () => {
  if (
    Math.abs(
      frontage.fixedBayWidth + frontage.slidingWidth -
        (model.width - model.returnWidth),
    ) > 1e-8
  ) throw new Error("Frontage spans do not match plan");
  const closed = slidingLeafPositions(0), open = slidingLeafPositions(1);
  if (closed.length !== 4 || open.length !== 4) {
    throw new Error("Expected four sliding leaves");
  }
  if (
    Math.abs(closed[3].x + leafWidth - model.width) > 1e-8 ||
    closed[0].x !== slidingStart
  ) throw new Error("Closed doors do not cover full opening");
  if (
    open[0].x !== closed[0].x || open[3].x !== closed[3].x ||
    open[1].x !== open[0].x || Math.abs(open[2].x - open[3].x) > 1e-8 ||
    open[1].z === open[0].z || open[2].z === open[3].z
  ) {
    throw new Error("Centre leaves must stack behind stationary outer leaves");
  }
  const gap = open[2].x - (open[1].x + leafWidth);
  if (Math.abs(gap - (frontage.slidingWidth - 2 * leafWidth)) > 1e-8) {
    throw new Error(
      "Expected central opening equal to span minus two outer leaves",
    );
  }
  const half = slidingLeafPositions(.5);
  if (!(half[1].x < closed[1].x && half[2].x > closed[2].x)) {
    throw new Error("Centre doors must move in opposite directions");
  }
  if (
    JSON.stringify(slidingLeafPositions(-1)) !== JSON.stringify(closed) ||
    JSON.stringify(slidingLeafPositions(2)) !== JSON.stringify(open)
  ) throw new Error("Invalid opening limits");
});

Deno.test("wall ends cover perpendicular corner extents without closing divider gaps", () => {
  for (const segment of wallSegments) {
    const axisLength = Math.hypot(
      segment.b[0] - segment.a[0],
      segment.b[1] - segment.a[1],
    );
    const length = wallPanelLength(segment.a, segment.b, model.wallThickness);
    const halfExtension = (length - axisLength) / 2;
    if (Math.abs(halfExtension - model.wallThickness / 2) > 1e-8) {
      throw new Error(`${segment.name} leaves a corner gap`);
    }
  }
  if (wallPanelLength([0, 0], [1, 0], model.wallThickness, false) !== 1) {
    throw new Error("Deliberate divider gaps must not be extended");
  }
});

Deno.test("first-floor openings stay ordered within walls and room IDs are unique", async () => {
  const { houseWalls, rooms, houseModel } = await import(
    "../eldora-house/house-model.ts"
  );
  if (new Set(rooms.map((r) => r.id)).size !== rooms.length) {
    throw new Error("Duplicate room ID");
  }
  for (const r of rooms) {
    const [x, z, x2, z2] = r.bounds;
    if (
      x < 0 || z < 0 || x2 > houseModel.width || z2 > houseModel.depth ||
      x2 <= x || z2 <= z
    ) throw new Error(`Invalid ${r.id}`);
  }
  for (const w of houseWalls) {
    const length = Math.hypot(w.b[0] - w.a[0], w.b[1] - w.a[1]);
    let end = 0;
    for (const o of w.openings) {
      if (o.at < end || o.width <= 0 || o.at + o.width > length + 1e-9) {
        throw new Error(`Invalid opening ${w.id}`);
      }
      end = o.at + o.width;
    }
  }
  const response = await app.handler()(
    new Request("https://example.test/static/backyard-garden/"),
  );
  if (
    response.status !== 308 ||
    response.headers.get("location") !==
      "https://example.test/static/eldora-house/"
  ) throw new Error("Lost old garden bookmark");
  await response.body?.cancel();
});

Deno.test("opening reference IDs are unique and cover every wall opening", async () => {
  const { openingReferences, slidingDoorReferences } = await import(
    "../eldora-house/openings.ts"
  );
  const { houseWalls } = await import("../eldora-house/house-model.ts");
  const ids = openingReferences.map((o) => o.id);
  if (ids.length !== 13 || new Set(ids).size !== ids.length) {
    throw new Error("Incomplete or duplicate opening references");
  }
  for (const wall of houseWalls) {
    for (const o of wall.openings) {
      if (!ids.includes(o.id)) throw new Error("Unreferenced opening");
    }
  }
  for (const assembly of slidingDoorReferences) {
    if (
      !ids.includes(assembly.id) || assembly.leaves.length !== assembly.count
    ) throw new Error("Invalid sliding leaf references");
  }
});
