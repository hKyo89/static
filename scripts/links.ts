// Repository-relative Markdown links; external links and anchors are excluded.
const root = new URL("../", import.meta.url);
const skip = new Set([".git", "node_modules", ".deno-cache", "dist"]);
let count = 0;
async function walk(directory: URL) {
  for await (const entry of Deno.readDir(directory)) {
    if (skip.has(entry.name)) continue;
    const path = new URL(
      entry.name + (entry.isDirectory ? "/" : ""),
      directory,
    );
    if (entry.isDirectory) await walk(path);
    else if (entry.name.endsWith(".md")) {
      const text = await Deno.readTextFile(path);
      for (
        const match of text.matchAll(/\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)
      ) {
        const href = match[1].replace(/^<|>$/g, "").split("#")[0];
        if (!href || /^[a-z]+:/i.test(href) || href.startsWith("/")) continue;
        await Deno.stat(new URL(href, path)).catch(() => {
          throw new Error(`Broken link: ${path.pathname} → ${href}`);
        });
      }
      count++;
    }
  }
}
await walk(root);
console.log(`Checked relative links in ${count} Markdown files.`);
