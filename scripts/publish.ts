import { buildSite, copyTree, repoRoot } from "./build.ts";
import { projects } from "../projects.ts";
await buildSite();
await Deno.copyFile(`${repoRoot}dist/index.html`, `${repoRoot}index.html`);
await Deno.copyFile(`${repoRoot}dist/.nojekyll`, `${repoRoot}.nojekyll`);
for (const project of projects) {
  await copyTree(
    `${repoRoot}dist/${project.slug}`,
    `${repoRoot}${project.slug}`,
  );
}
console.log("Updated tracked Pages files. Review git diff before committing.");
