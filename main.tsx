import { App } from "fresh";
import { serveDir } from "@std/http/file-server";
import { basePath, projects } from "./projects.ts";
import { HomePage } from "./routes/HomePage.tsx";

export const app = new App();
for (const path of ["/static/backyard-garden", "/static/backyard-garden/"]) {
  app.get(
    path,
    (ctx) => Response.redirect(new URL("/static/eldora-house/", ctx.url), 308),
  );
}
app.get("/", (ctx) => Response.redirect(new URL(`${basePath}/`, ctx.url), 307));
app.get(
  basePath,
  (ctx) => Response.redirect(new URL(`${basePath}/`, ctx.url), 308),
);
app.get(`${basePath}/`, (ctx) => ctx.render(<HomePage />));
for (const { slug, Page, legacyAliases = [] } of projects) {
  app.get(
    `${basePath}/${slug}`,
    (ctx) => Response.redirect(new URL(`${basePath}/${slug}/`, ctx.url), 308),
  );
  app.get(`${basePath}/${slug}/`, (ctx) => ctx.render(<Page />));
  for (const alias of legacyAliases) {
    app.get(
      `${basePath}/${slug}/${alias}/`,
      (ctx) => Response.redirect(new URL("../", ctx.url), 308),
    );
  }
}
// Only exported assets are served: source files, data and .git stay private locally.
app.use((ctx) =>
  serveDir(ctx.req, {
    fsRoot: new URL("./dist/", import.meta.url).pathname,
    urlRoot: basePath.slice(1),
    showDirListing: false,
    quiet: true,
  })
);
if (import.meta.main) await app.listen({ hostname: "127.0.0.1", port: 8000 });
