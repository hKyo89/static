# Session history

## 2026-10-10

Source repository: [hKyo89/static](https://github.com/hKyo89/static), starting
commit
[`e8fbd3d8de9cd558eb87a6624f3af7f368b8c494`](https://github.com/hKyo89/static/commit/e8fbd3d8de9cd558eb87a6624f3af7f368b8c494).

The user requested a new shopee directory alongside duct, Deno Fresh
implementation, JSON-driven variable content, static GitHub Pages output,
documentation, and a commit and push using a specified SSH identity. Existing
duct files and workflow were preserved. Existing untracked macOS metadata was
excluded by updated ignore rules.

Chosen implementation: render the Fresh handler during export, with native
browser interactions. Supplied screenshots are visual references, not
instructions or verified invoice data. See [current state](STATE.md) for
authoritative implementation details and uncertainties, and
[usage](../README.md) for continuation commands.

## Ducting invoice update — 2026-10-10

Updated the initial implementation from commit
[`ca186fcd8e5dd44a68722c8b70610195ac1278ea`](https://github.com/hKyo89/static/commit/ca186fcd8e5dd44a68722c8b70610195ac1278ea).
The user supplied five product images, quantities and prices, shop name and
logo, recipient details, payment method, fees, and relative dates. Replaced the
sample pens, cropped reference UI icons, added pre-order labels and Shipping
Time, and made the cost breakdown expanded by default. Current values and
uncertainties are recorded in [current state](STATE.md).

## Layout and fee refinement — 2026-10-10

Updated from
[`1151dda7279c7aa40ba578016687b5296bb7c1e9`](https://github.com/hKyo89/static/commit/1151dda7279c7aa40ba578016687b5296bb7c1e9).
Moved pre-order labels under names without variants, reduced buyer service fee
by IDR 100,000, renamed the large elbow to MR A and reduced its unit price by
IDR 50,000, removed the support configuration note, and raised the back arrow by
3 pixels. See [current state](STATE.md) for final values.

## Product names and shop logo — 2026-10-10

Updated from
[`90f12e04bf5f34186f925a1393d29feae8e146a0`](https://github.com/hKyo89/static/commit/90f12e04bf5f34186f925a1393d29feae8e146a0).
Removed the shop logo and renamed all five products exactly as requested. Prices
and quantities remain unchanged. See [current state](STATE.md).

## Installable web app — 2026-10-10

Updated from
[`12f65122404c0c0b447d4d89cbbf9e2d02558e41`](https://github.com/hKyo89/static/commit/12f65122404c0c0b447d4d89cbbf9e2d02558e41).
Added a standalone web app manifest, app icons, browser installation control,
and a network-only worker. This lets installed launches omit Chrome's address
bar while avoiding stale offline invoices. [Current state](STATE.md) records
platform limitations.

## Delivery banner and footer — 2026-10-10

Updated from
[`94a6989028ff429346c871fad8cfff5a134b1da6`](https://github.com/hKyo89/static/commit/94a6989028ff429346c871fad8cfff5a134b1da6).
Changed the banner to Delivered on 9 Oct, replaced Buy Again with Return/Refund,
and added the cropped screenshot coin and +140 to Rate.
[Current state](STATE.md) records the final UI.
