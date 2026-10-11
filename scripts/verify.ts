import { projects } from "../projects.ts";
const dist = new URL("../dist/", import.meta.url);
for (const path of ["", ...projects.map((p) => `${p.slug}/`)]) {
  const page = new URL(`${path}index.html`, dist);
  const html = await Deno.readTextFile(page);
  for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const target = match[1];
    if (/^(?:https?:|data:|mailto:|tel:)/.test(target)) continue;
    const url = new URL(target, page);
    if (!url.pathname.startsWith(dist.pathname)) {
      throw new Error(`Asset escapes dist: ${target}`);
    }
    const destination = url.pathname.endsWith("/")
      ? new URL("index.html", url)
      : url;
    await Deno.stat(destination);
  }
  if (html.includes("nonce=")) {
    throw new Error("Build retained transient CSP nonce");
  }
}
for (const project of projects.filter((p) => p.client)) {
  const bundle = await Deno.readTextFile(
    new URL(`${project.slug}/viewer.js`, dist),
  );
  if (/from\s*["'](?:three|https?:\/\/)/.test(bundle)) {
    throw new Error("Unbundled browser dependency");
  }
}
const manifest = JSON.parse(
  await Deno.readTextFile(new URL("shopee/manifest.webmanifest", dist)),
);
const manifestURL = new URL(
  "https://hkyo89.github.io/static/shopee/manifest.webmanifest",
);
for (const field of [manifest.id, manifest.scope, manifest.start_url]) {
  if (new URL(field, manifestURL).pathname !== "/static/shopee/") {
    throw new Error("Invoice PWA scope changed");
  }
}
await Deno.stat(new URL(".nojekyll", dist));
console.log(
  "Verified static pages, local asset links, bundled clients, and invoice PWA scope.",
);
