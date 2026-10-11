# Architecture

The [root main.tsx](../../main.tsx) registers this project at `/static/shopee/`
in the single shared Fresh app. The [registry](../../projects.ts) drives routing
and static export. [OrderPage.tsx](../components/OrderPage.tsx) reads JSON and
renders semantic HTML using Preact. The
[shared exporter](../../scripts/build.ts) calls the actual Fresh handler and
copies this project's static assets into `dist/shopee/`.
[publish.ts](../../scripts/publish.ts) also refreshes the tracked project files
used by branch publishing.

No Fresh server or island runtime is needed on GitHub Pages. The browser script
provides copying, printing and conditional installation; native details elements
expand address and totals. Assets are document-relative. PWA scope, order data
and interaction behavior remain unchanged during consolidation.

The [shared workflow](../../.github/workflows/build-static.yml) validates all
projects, checks committed outputs and uploads the complete export. Pages still
publishes `main` at repository root. See
[shared instructions](../../STATIC_PROJECTS.md).

[Usage](../README.md) · [Current state](STATE.md)

## Installed app

The page links a [web manifest](../static/manifest.webmanifest) with
project-relative ID, scope, start URL, and app icons. The browser script
conditionally exposes the installation prompt and registers
[sw.js](../static/sw.js) beneath the same project scope. The worker forwards GET
requests to the network and stores no invoice cache. Installed launches request
standalone browser display. See
[usage](../README.md#install-without-the-chrome-address-bar).
