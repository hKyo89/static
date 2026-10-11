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
   the two centre leaves outward to reveal a central passage. Reset closes the
   doors. The fixed window never moves.
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

## Courtyard lighting correction

The backyard is open to the sky; the house is two storeys. Sunlight now comes
from the open rear side, not through the house windows. A shadow-only upper
storey and house roof envelope blocks light from the house side without adding a
roof over the courtyard. The 6 m total house height, 4 m modelled house depth
and sun angle are illustrative. This is not a date/location solar study. Reset
restores the full-wall starting view.

## Centre-opening correction

The user confirmed the two centre doors slide outward behind the outer pair,
leaving a central opening. This supersedes the earlier four-track left stack.
Only the centre pair moves; handles are placed on their meeting edges.

## Wall lights

Six small black cylindrical up/down sconces match the supplied reference style.
They are centred in the six rightmost long-wall sections (leftmost unlit), with
fixture centres 2 m above the floor. Each has a mounting bracket, warm apertures
and upward/downward light beams. The compact 160 mm body, 70 mm diameter,
projection and beam output are illustrative; no exact product size was supplied.
Fixtures belong to the boundary wall and hide with Cutaway walls.

## Day/night and wall controls

Show walls is enabled by default; unchecking it hides the outer boundary. Day is
the default, with sunlight directly overhead and sconces off. Night turns off
the sun, reduces sky illumination and enables the six warm up/down sconces.
Reset restores Day and Show walls. This supersedes the earlier rear-side sun
direction and Cutaway walls control. Lighting is an illustrative preview.

## Artificial Zen garden concept

The viewer now includes an artificial bonsai, white/grey pebble bed with black
edges, three rocks, small artificial moss/grass accents, one stone lantern and
one subdued warm pebble light opposite the sliding doors. A Show garden toggle
compares the concept with the original space. See
[GARDEN_DESIGN.md](GARDEN_DESIGN.md) for layout, quantities, reference links and
unverified shopping details.

## Full-courtyard revision

The garden now covers the entire L-shaped floor with predominantly white and
grey pebbles and a restrained black perimeter. The former narrow rear-wall bed
is superseded. The bonsai, rocks and lights stay in their original focal
arrangement opposite the sliding doors. Flush grey stepping stones provide a
route beside the doors and through the return. Granite remains beneath the
removable concept. All planting is artificial; pebble depth and installation
details remain illustrative.

## Layered garden redesign

Three uneven artificial moss/grass islands replace the small repeated tufts.
Each island has twelve small moss-covered rocks, 5–8 cm diameter (36 total),
with irregular green mounds and grass texture. A larger grey feature stone adds
contrast. Two glowing stones, 31 and 33 cm wide, replace the small pebble light.
One 50 cm Mars-style ball sits in the deeper left return, off the path. The
bonsai, stone lantern, uplight and staggered stepping route remain. This
supersedes earlier decorative counts. Product geometry and output are
illustrative; the concept deliberately keeps broad white-pebble gaps.

## Concealed smoking nook

The short return now has walnut-look WPC decking (1.35 × 0.80 m concept area)
and a compact black cylindrical ashtray/trash bin tucked behind the opaque wall.
The bin is illustrated at 62 cm tall and 24 cm diameter; actual product
dimensions are unconfirmed. Stepping stones and loose pebbles stop at the
decking edge. The 50 cm ball light moves to the rear-left pebble area, leaving
the deck clear for standing. This supersedes the fully pebbled return and prior
ball location.

The black perimeter stripe has been removed. White and grey pebbles continue to
the edges, with only a sparse scattering of dark pebbles throughout. This
supersedes the earlier black edging and softens the garden’s outline.

## Flat grass and focal-point corrections

Raised stylized grass mounds and tall tufts are removed. The three green areas
are now flat cut-to-shape artificial turf patches. Thirty-six separate 5–8 cm
moss-covered stones sit around their edges, above the gravel, with brighter
green contrast. The 50 cm Mars-style ball moves beside the bonsai at X=5.14,
Z=0.33 opposite the sliding doors. Its previous rear-left placement is
superseded.
