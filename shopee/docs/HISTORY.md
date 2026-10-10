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
