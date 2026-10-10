# Current state

As of 2026-10-10, this Fresh static invoice shows Bintang Ducting and the
supplied shop logo. Five products replace the original demonstration pens. All
products have Pre-Order labels. UI icons are cropped from the supplied mobile
screenshots; product photographs come from the supplied detail images.

## Order data

| Product                       | Quantity | Unit price (IDR) | Line total (IDR) |
| ----------------------------- | -------: | ---------------: | ---------------: |
| Elbow 90 130x200mm - 0.5mm    |        2 |          191,835 |          383,670 |
| Transisi 5 inch ke 35 X 35cm  |        2 |          195,000 |          390,000 |
| Ducting 200x130x800mm         |        5 |          135,000 |          675,000 |
| Elbow 90 degree pesanan MR M  |        1 |          300,000 |          300,000 |
| Hood 150 x 60 x 30 with Lamps |        1 |        1,380,500 |        1,380,500 |

Merchandise subtotal: IDR 3,129,170. Shipping: IDR 400,000. Buyer service fee:
IDR 230,000. Discounts: zero. Total: IDR 3,759,170. The hood price is the
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
