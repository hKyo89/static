import { app } from "../main.tsx";
async function copyTree(source: string, destination: string) {
  await Deno.mkdir(destination, { recursive: true });
  for await (const entry of Deno.readDir(source)) {
    const from = `${source}/${entry.name}`;
    const to = `${destination}/${entry.name}`;
    if (entry.isDirectory) await copyTree(from, to);
    else await Deno.copyFile(from, to);
  }
}
const response = await app.handler()(new Request("http://localhost/"));
if (!response.ok) throw new Error(`Render failed: ${response.status}`);
const html = (await response.text()).replace(/ nonce="[^"]*"/g, "");
await Deno.mkdir("dist", { recursive: true });
await Deno.writeTextFile("dist/index.html", html);
await copyTree("static", "dist");
await Deno.copyFile("dist/index.html", "index.html");
await copyTree("static", ".");
console.log("Built static invoice for /static/shopee/");
