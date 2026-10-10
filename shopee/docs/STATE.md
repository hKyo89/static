# Current state

As of 2026-10-10, this Fresh static invoice shows Bintang Ducting without a shop
logo. Five products replace the original demonstration pens. All products have
Pre-Order labels. UI icons are cropped from the supplied mobile screenshots;
product photographs come from the supplied detail images.

## Order data

| Product                           | Quantity | Unit price (IDR) | Line total (IDR) |
| --------------------------------- | -------: | ---------------: | ---------------: |
| 400x400mm                         |        2 |          191,835 |          383,670 |
| 10 inch ke 350x150mm - 0.5mm      |        2 |          195,000 |          390,000 |
| 1200x350x150mm                    |        5 |          135,000 |          675,000 |
| Elbow 90 degree pesanan 350x150mm |        1 |          250,000 |          250,000 |
| Hood 1500x600x300 dengan lampu    |        1 |        1,380,500 |        1,380,500 |

Merchandise subtotal: IDR 3,079,170. Shipping: IDR 400,000. Buyer service fee:
IDR 130,000. Discounts: zero. Total: IDR 3,609,170. The hood price is the
reference IDR 380,500 plus the requested IDR 1,000,000.

Payment method: CIMB [*2863]. Carrier: Shop Courier. Order and payment date:
2026-09-28 (12 days before 2026-10-10). Delivery date: 2026-10-09 (yesterday).
Shipping Time below Payment Time uses the same data field as delivery. Dates are
fixed invoice data and do not move with the viewing date.

The recipient name, phone, and address are user-supplied. Totals start expanded
and remain collapsible. Invoice printing and order-ID copying remain available.

## Unresolved details

- Clock times were not newly supplied. Existing 12:42 delivery and 10:36
  order/payment times were retained; these should be confirmed by the user.
- No new tracking number or order ID was supplied. The former SPX tracking
  number was removed; the original demonstration order ID remains.
- Purchase, rating, and support URLs remain unconfigured.
- GitHub Pages uses legacy branch publishing from `main` at repository root.

[Usage](../README.md) · [Architecture](ARCHITECTURE.md) · [History](HISTORY.md)

## Validation

Formatting, linting, type checks, the invoice arithmetic/render test, and static
export passed. Mobile browser checks verified the cropped assets, five pre-order
products, recipient metadata, and collapse/re-expansion of the totals. All five
repository Markdown files passed formatting and relative-link checks.

Pre-Order labels sit directly below item names when variants are empty,
alongside quantities. The seller configuration note has been removed. The back
icon is raised by 3 pixels.

## Installable app

A web app manifest, 192/512-pixel icons, maskable icon, Apple touch icon,
installation prompt button, and scoped service worker are included. Installed
launch uses `standalone` display, which hides the normal browser address bar.
Browser tabs retain their normal interface. Start URL, app ID, and service
worker scope remain under `/static/shopee/`. Requests use the network without
invoice caching. Actual installation on the user's Android device has not been
tested; install controls depend on browser support and eligibility. See
[installation instructions](../README.md#install-without-the-chrome-address-bar).

Validation for app installation: manifest scope and standalone display tests
passed; all icon dimensions match the manifest; the static build succeeded.
Browser inspection confirmed the manifest link and no captured console errors.
The test browser did not expose Android installation or service-worker lifecycle
inspection, so device installation remains unverified.
