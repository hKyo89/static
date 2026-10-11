# Shopee-style invoice

A mobile order-details page built with Deno Fresh 2.3.0, exported to static HTML
for [GitHub Pages](https://hkyo89.github.io/static/shopee/).

## Edit and build

This project uses the repository's **one root Fresh app**. From the repository
root (not this directory):

```sh
deno install --frozen --allow-scripts=npm:esbuild
deno task dev
deno task check
deno task publish:files
```

The local route is `http://localhost:8000/static/shopee/`. Edit
[data/order.json](data/order.json) for shop, delivery, items, quantities,
prices, fees, currency, payment, timestamps and action URLs. Replace images in
[static/images](static/images). Totals are calculated from the data.

Root `projects.ts` registers this page, and the shared exporter renders the
Fresh handler and copies `static/` assets. `build` creates `dist/shopee/`;
`publish:files` refreshes the tracked files in this directory for existing
GitHub Pages `main`/root publishing. Commit regenerated outputs after changing
source. No runtime server or API is needed. The separate nested Deno app and
exporter were retired; do not recreate them.

`totalsExpanded` controls the initial breakdown. `items[].preOrder` controls
Pre-Order labels. Shipping Time and delivery use `shipping.deliveredAt`. Service
fee is the buyer service fee. The seller has no shop logo. Invoice printing,
order-ID copying and the scoped installable app remain.

See [shared instructions](../STATIC_PROJECTS.md),
[current state](docs/STATE.md), [architecture](docs/ARCHITECTURE.md), and
[session history](docs/HISTORY.md).

## Install without the Chrome address bar

Open [the published invoice](https://hkyo89.github.io/static/shopee/) in Chrome
on Android. Choose **Install** if the page shows the button, or use Chrome’s
menu → **Install app** / **Add to Home screen**, then launch from its installed
icon. Opening a normal browser tab still shows the address bar. On iPhone, use
Safari → Share → Add to Home Screen and enable Open as Web App when offered.
Browser wording and availability vary.

The [manifest](static/manifest.webmanifest) sets the app name, icons, start URL,
and `standalone` display. Its scope is confined to this project. The Install
button appears only when the browser supplies an installation prompt; no
automatic installation occurs. The [service worker](static/sw.js) uses
network-only requests, so the invoice needs internet and does not retain an
offline invoice cache.
