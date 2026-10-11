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
  windows,
} from "../backyard-garden/model.ts";

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
      "/static/backyard-garden",
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
    Math.abs(polygonArea - 9.379375) > 1e-8 ||
    Math.abs(floorArea - polygonArea) > 1e-8
  ) throw new Error("Bad L-shaped footprint");
  const lengths = windows.map((w) =>
    Math.hypot(w.b[0] - w.a[0], w.b[1] - w.a[1])
  );
  if (
    Math.abs(lengths[0] - 1.48) > 1e-8 || lengths[1] !== 2.025
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
      "/static/backyard-garden/model.ts",
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
