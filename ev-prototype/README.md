# EV prototype

Installable PLN Mobile home and Home Charging Services 2.0 detail prototype.
Route: <https://hkyo89.github.io/static/ev-prototype/>.

## Scope and assumptions

The supplied screenshots are the visual source. Artwork, service icons, account
cards, navigation and recommendation cards are cropped directly from those
images; no artwork is redrawn. The first promotion uses the approved recreated
banner. The phone status bar and gesture bar are excluded. Other banners and
account cards can be swiped. Only the first promotion opens a detail page; its
back control and browser back restore the home scroll position. Other navigation
is decorative. Detail copy is selectable HTML. Shared content lives in
`model.ts`.

The home is a mobile layout capped at 500 CSS pixels on desktop. Screenshot
panels retain their baked-in fonts and sample account data. No live account
requests occur. The detail typography uses a local sans-serif fallback because
no font file was supplied. The approved dates are 19 October–18 November 2026.

## Development and installation

Use the repository root tasks described in
[STATIC_PROJECTS.md](../STATIC_PROJECTS.md). Run `deno task check`,
`deno task test:links`, and `deno task publish:files`. No separate application
or dependency installation is needed.

The manifest and service worker are scoped to this project only. Serve over
HTTPS (or localhost), then use the browser install action; iOS uses Add to Home
Screen. An install button appears when the browser provides an install prompt.
Assets are cached after first load for offline use. No phone status bar is
simulated.

## Continue

Edit `Page.tsx`, `model.ts`, `src/`, and `static/`; regenerate Pages output from
the root before committing. Keep other projects and their service-worker scopes
intact.
