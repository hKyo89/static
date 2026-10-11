import { app } from "../main.tsx";
import { basePath, projects } from "../projects.ts";
import {
  floorArea,
  model,
  outline,
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
    Math.abs(lengths[0] - 5.425) > 1e-8 || lengths[1] !== 1.35 ||
    lengths[2] !== 2.025
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
