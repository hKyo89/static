# Shopee-style invoice

A mobile order-details page built with Deno Fresh 2.3.0, exported to static HTML
for [GitHub Pages](https://hkyo89.github.io/static/shopee/).

## Edit and build

Requires Deno 2.7 or later. From this directory:

```sh
deno install
deno task dev
deno task build
```

Edit [data/order.json](data/order.json) for all order-specific values: shop,
status, delivery, items, image paths, quantities, unit prices, fees, currency,
payment, timestamps, and action URLs. Replace illustrations in
[static/images](static/images). Images use relative `./images/...` paths. The
total is computed from item quantities × unit prices plus shipping and service
fee, minus shipping discount and discount. It is not an independently editable
number that could become inconsistent.

The build renders the Fresh handler directly, copies static assets into `dist/`,
then publishes the same assets and HTML into this directory. Commit the root
`index.html`, `styles.css`, `interactions.js`, and `images/` after changing data
or source. GitHub Pages branch publishing uses these files at `/static/shopee/`;
`dist/` is ignored. No server or API is required at runtime. Do not publish
confidential invoice data.

```sh
deno task check
```

See [current state](docs/STATE.md), [architecture](docs/ARCHITECTURE.md), and
[session history](docs/HISTORY.md).

The `totalsExpanded` setting controls the initial breakdown state.
`items[].preOrder` controls each Pre-Order label. The seller name is shown
without a shop logo. Delivery and Shipping Time both read
`shipping.deliveredAt`. The displayed service fee is the buyer service fee. UI
crops live in [static/icons](static/icons).

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
