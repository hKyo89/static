import * as esbuild from "esbuild";
import { app } from "../main.tsx";
import { basePath, projects } from "../projects.ts";

export const repoRoot = new URL("../", import.meta.url).pathname;
export async function copyTree(source: string, destination: string) {
  await Deno.mkdir(destination, { recursive: true });
  for await (const entry of Deno.readDir(source)) {
    const from = `${source}/${entry.name}`, to = `${destination}/${entry.name}`;
    if (entry.isDirectory) await copyTree(from, to);
    else if (entry.isFile) await Deno.copyFile(from, to);
  }
}
export async function buildSite() {
  const out = `${repoRoot}dist`;
  await Deno.remove(out, { recursive: true }).catch((error) => {
    if (!(error instanceof Deno.errors.NotFound)) throw error;
  });
  await Deno.mkdir(out, { recursive: true });
  const handler = app.handler();
  async function render(path: string, destination: string) {
    const response = await handler(
      new Request(`http://localhost${basePath}/${path}`),
    );
    if (!response.ok) throw new Error(`Render ${path}: ${response.status}`);
    const html = (await response.text()).replace(/ nonce="[^"]*"/g, "");
    await Deno.writeTextFile(
      destination,
      html.startsWith("<!DOCTYPE") || html.startsWith("<!doctype")
        ? html
        : `<!doctype html>\n${html}`,
    );
  }
  await render("", `${out}/index.html`);
  try {
    for (const project of projects) {
      const destination = `${out}/${project.slug}`;
      await Deno.mkdir(destination, { recursive: true });
      if (project.assets) {
        await copyTree(`${repoRoot}${project.assets}`, destination);
      }
      if (project.stylesheet) {
        await Deno.copyFile(
          `${repoRoot}${project.stylesheet}`,
          `${destination}/styles.css`,
        );
      }
      if (project.client) {
        await esbuild.build({
          absWorkingDir: repoRoot,
          entryPoints: [project.client],
          outfile: `${destination}/viewer.js`,
          bundle: true,
          format: "esm",
          platform: "browser",
          target: "es2022",
          minify: true,
        });
      }
      await render(`${project.slug}/`, `${destination}/index.html`);
      for (const alias of project.legacyAliases ?? []) {
        if (!/^[a-z0-9-]+$/.test(alias)) {
          throw new Error("Invalid legacy alias");
        }
        await Deno.mkdir(`${destination}/${alias}`, { recursive: true });
        await Deno.writeTextFile(
          `${destination}/${alias}/index.html`,
          `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=../"><title>Viewer moved</title></head><body><p><a href="../">Open the viewer at its current address</a></p></body></html>\n`,
        );
      }
    }
  } finally {
    esbuild.stop();
  }
  await Deno.writeTextFile(`${out}/.nojekyll`, "");
  console.log(
    `Built ${projects.length} projects + home into dist/ (mount at ${basePath}/)`,
  );
}
if (import.meta.main) await buildSite();
