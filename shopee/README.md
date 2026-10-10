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
