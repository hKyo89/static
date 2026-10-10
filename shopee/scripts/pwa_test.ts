import { app } from "../main.tsx";
Deno.test("installable manifest stays within project scope", async () => {
  const manifest = JSON.parse(
    await Deno.readTextFile("static/manifest.webmanifest"),
  );
  const base = new URL(
    "https://hkyo89.github.io/static/shopee/manifest.webmanifest",
  );
  for (const value of [manifest.id, manifest.start_url, manifest.scope]) {
    if (new URL(value, base).pathname !== "/static/shopee/") {
      throw new Error("Incorrect app scope");
    }
  }
  if (manifest.display !== "standalone") {
    throw new Error("Browser chrome would remain");
  }
  for (const size of ["192x192", "512x512"]) {
    const icon = manifest.icons.find((icon: { sizes: string }) =>
      icon.sizes === size
    );
    if (!icon) throw new Error("Missing install icon");
    await Deno.stat(`static/${icon.src}`);
  }
  const html = await (await app.handler()(new Request("http://localhost/")))
    .text();
  if (!html.includes('rel="manifest"') || !html.includes("data-install")) {
    throw new Error("Missing install entry points");
  }
});
