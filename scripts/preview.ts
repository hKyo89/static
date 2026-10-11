import { serveDir } from "@std/http/file-server";
const root = new URL("../dist/", import.meta.url).pathname;
await Deno.stat(`${root}/index.html`);
console.log("Static preview: http://localhost:8001/static/");
Deno.serve({ hostname: "127.0.0.1", port: 8001 }, (request) => {
  if (new URL(request.url).pathname === "/") {
    return Response.redirect(new URL("/static/", request.url), 307);
  }
  return serveDir(request, {
    fsRoot: root,
    urlRoot: "static",
    showDirListing: false,
    quiet: true,
  });
});
