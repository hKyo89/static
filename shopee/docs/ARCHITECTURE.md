# Architecture

[main.tsx](../main.tsx) registers a Fresh handler and local static files.
[OrderPage.tsx](../components/OrderPage.tsx) reads the JSON data and renders
semantic HTML using Preact. [build.ts](../scripts/build.ts) requests the handler
in process and writes the response as static HTML. This avoids requiring Fresh
server deployment or island hydration on GitHub Pages. The small browser script
provides copying and printing; native details elements expand the address and
totals.

All assets use document-relative paths, so the static export works beneath
`/static/shopee/`. Print styles hide navigation and actions; the print action
opens the breakdown and restores its previous state afterward. The app needs no
external image hosts, fonts, database, or credentials.

The build workflow validates and uploads `dist/` as an artifact. It does not
replace the existing duct workflow or change repository-wide Pages settings.

[Usage](../README.md) · [Current state](STATE.md)

## Installed app

The page links a [web manifest](../static/manifest.webmanifest) with
project-relative ID, scope, start URL, and app icons. The browser script
conditionally exposes the installation prompt and registers
[sw.js](../static/sw.js) beneath the same project scope. The worker forwards GET
requests to the network and stores no invoice cache. Installed launches request
standalone browser display. See
[usage](../README.md#install-without-the-chrome-address-bar).
