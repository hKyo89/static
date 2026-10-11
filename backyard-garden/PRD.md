# Product requirements

[Overview](README.md) · [Specifications](SPECIFICATIONS.md) ·
[Decisions](DECISIONS.md) · [Continue](CONTINUATION_PROMPT.md)

## Purpose and users

Help the homeowner inspect the red-highlighted rear backyard spatially, using 3
m walls and the large windows visible in the supplied plan close-ups. A future
assistant or collaborator must be able to continue from the files without this
conversation. The chat is named **Backyard Garden**; the project slug is
`backyard-garden`.

## Goals

- Show the entire L-shaped highlighted region as a genuine interactive 3D model.
- Make narrow dimensions, wall height, and house-facing glazing easy to inspect.
- Provide desktop and touch navigation, a top-down plan, and a courtyard view.
- Build with Deno Fresh and export a static website for GitHub Pages.
- Consolidate Duct, Shopee and this viewer into one shared root Fresh app.
- Document a repeatable workflow for future static projects, including SSH.

## Scope

Included: courtyard floor, two outer boundary walls, the inset return wall, a
fixed frontage window, wall separator, four sliding doors and the left-side
window, illustrative frames, rough grey granite tiles and ivory roughcast walls,
dimension labels, original references, project docs, shared router, home page,
static export, validation and existing branch-Pages compatibility.

Excluded: the rest of the house, new plant/furniture design,
structure/engineering, roof, sunlight or drainage analysis, authenticated
services, an online editor, and modifications to the invoice's order data or the
Duct model.

## Functional requirements

1. The model uses metres and a confirmed 3 m wall height. The L-shaped footprint
   follows the interpreted drawing dimensions listed in SPECIFICATIONS.md.
2. The short return edge is solid. The long house frontage has a fixed window on
   the left, a solid wall separator, and four continuous sliding glass doors on
   the right. The left-side window and solid inset return remain.
3. Users can orbit, pan, zoom, choose three view presets, reset, and toggle
   boundary-wall cutaway, glazing, and dimension labels. An opening slider moves
   four separate leaves along parallel tracks to reveal a usable passage. Reset
   closes the doors. The fixed window never moves.
4. Source drawing and all three close-ups are available in an accessible dialog.
5. The page shows which dimensions are interpreted and which are assumptions.
6. When WebGL cannot initialize, show a readable failure state and source-plan
   link. Without JavaScript, keep the explanatory document and plan link usable.
7. The route is `/static/backyard-garden/`. `/static/` indexes all projects;
   `/static/duct/` and `/static/shopee/` retain their behavior and assets.
8. One root registry, dependency configuration, app and exporter serve all
   projects. No nested Fresh or Vite setup is needed for a new project.

## Non-functional requirements

- Static output has no request-time server or external runtime CDN dependency.
- Assets resolve under the GitHub Pages `/static/` prefix and trailing-slash
  URLs.
- Layout fits desktop and mobile screens; native buttons and toggles are
  keyboard operable, with focus indication and live view status.
- Viewer uses WebGL with capped pixel density and supports touch gestures.
- Source drawings and project documentation are retained for continuation.
- Preserve existing PWA scope, invoice values, and Duct controls.
- Never put SSH private-key contents or credentials in the repository.

## Architecture and user experience

Fresh renders semantic Preact documents at development/build time. The static
exporter calls the same shared Fresh handler used locally, enumerating pages
from `projects.ts`. esbuild bundles browser code; Three.js and OrbitControls run
entirely client-side. GitHub Pages serves tracked generated outputs.

The viewer pairs a compact measurement/control sidebar with a large 3D stage. On
mobile the controls stack above the stage. The initial full-wall view shows
seven sections across the rear wall with six slim U-profile dividers. Cutaway
mode exposes the floor and windows. Materials follow the user’s confirmed
finishes; tile and divider dimensions are illustrative.

## Acceptance and verification

- Root install, format/lint/type checks, tests, static build, export-asset
  checks and Markdown-link checks pass.
- All four routes render and navigate with the `/static/` prefix.
- Model tests verify polygon area, opening lengths, and vertical extents.
- Actual static preview loads both viewers and the invoice without asset
  failures.
- Browser checks exercise camera presets, reset, switches, source dialog and
  navigation; desktop and mobile layouts are inspected.
- Generated Pages files match the source build and no per-project framework
  configurations remain.
- If publishing, verify remote commit and GitHub Pages/CI status; a push alone
  is insufficient evidence of deployment.
- Before construction, the homeowner confirms the original drawing dimensions,
  window sizes/divisions, wall thickness, materials, and actual surveyed site.
