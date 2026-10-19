import { app } from "../main.tsx";

Deno.test("EV home exposes only the approved promo route and scoped installation assets", async () => {
  const response = await app.handler()(
    new Request("https://example.test/static/ev-prototype/"),
  );
  const html = await response.text();
  if (
    response.status !== 200 || !html.includes('href="#promo"') ||
    !html.includes('id="back"')
  ) throw new Error("Missing promo navigation");
  if (html.includes("09:30") || html.includes("09:33")) {
    throw new Error("Phone status bar must be excluded");
  }
  const manifest = JSON.parse(
    await Deno.readTextFile("ev-prototype/static/manifest.webmanifest"),
  );
  const base = new URL(
    "https://example.test/static/ev-prototype/manifest.webmanifest",
  );
  for (const key of ["id", "scope", "start_url"]) {
    if (new URL(manifest[key], base).pathname !== "/static/ev-prototype/") {
      throw new Error("PWA escapes project scope");
    }
  }
  if (manifest.display !== "standalone") {
    throw new Error("Missing standalone mode");
  }
  const worker = await Deno.readTextFile("ev-prototype/static/sw.js");
  const assets = JSON.parse(
    worker.match(/const ASSETS = (\[[\s\S]*?\]);/)![1].replace(/,\s*]/, "]"),
  );
  for (const asset of assets) {
    if (!asset.startsWith("./")) throw new Error("Nonrelative precache URL");
    if (["./", "./index.html", "./styles.css", "./viewer.js"].includes(asset)) {
      continue;
    }
    await Deno.stat(`ev-prototype/static/${asset.slice(2)}`);
  }
});
