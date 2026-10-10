# Current state

As of 2026-10-10, the project implements a responsive order page with shipping,
recipient details, ten sample pen variants, computed totals, support rows,
payment metadata, copying, and printing. The layout follows the three supplied
mobile screenshots. It is an independent website, not an official Shopee
service.

## Confirmed data and limitations

- Sample unit price: IDR 18,000. Quantities: four black pens and two each of
  nine other colors. Subtotal: IDR 396,000.
- Sample shipping: IDR 16,000; shipping discount: IDR 12,000. Total: IDR
  400,000. These fees are illustrative: the screenshots show the total but do
  not disclose its breakdown.
- Customer name and phone are placeholders. Address and timestamps are sample
  values; payment time is not fully legible in the reference.
- Pen images are locally authored SVG illustrations, not original product
  photographs.
- Purchase, rating, and support URLs are unknown. Buttons remain disabled and
  support rows do not navigate until configured.
- The GitHub Pages publishing setting is external repository configuration.
  Committed static files support main/root branch publishing; an Actions-based
  deployment must include this folder in its site artifact.

[Usage](../README.md) · [Architecture](ARCHITECTURE.md) · [History](HISTORY.md)

## Validation

Deno formatting, linting, type checking, and the invoice arithmetic/static
response test passed. The static build succeeded. Browser checks at 390 × 844
verified the layout, expanded breakdown, and order-ID copy feedback. Markdown
formatting and relative links were checked across all five repository Markdown
files; required project documents are present.
