# Continue Backyard Garden

Copy this prompt into a new session:

```text
Continue my Backyard Garden project. Read these first:
- /Users/hkyo89/Codes/github.com/hkyo89/static/AGENTS.md
- /Users/hkyo89/Codes/github.com/hkyo89/static/STATIC_PROJECTS.md
- /Users/hkyo89/Codes/github.com/hkyo89/static/backyard-garden/README.md
- The PRD.md, SPECIFICATIONS.md and DECISIONS.md in that project directory.

Repository: git@github.com:hKyo89/static
Local: /Users/hkyo89/Codes/github.com/hkyo89/static
Branch: main
Baseline before this project: 7c163bb5648ee1992a01ad4812da23506c713373
Initial implementation source commit: 9df12f94a2bb6fe018fd98d3faba6588d337c4e8
Latest wall / sliding-door correction source commit: feeb7e69700f62e2cd4c02a0b61610bf65c8e395
Public route: https://hkyo89.github.io/static/backyard-garden/
Project directory name: backyard-garden
Chat name: Backyard Garden

This is one shared root Deno Fresh 2.3.0 app, not an independent app per site.
Root main.tsx and projects.ts serve /static/, /static/backyard-garden/,
/static/duct/ and /static/shopee/. Root deno.json and deno.lock own dependencies.
The explicit shared static exporter renders Fresh handlers at build time and
bundles browser code; GitHub Pages runs no Fresh server. It currently publishes
main at repository root. Preserve that setup unless I ask to change it.

Backyard source: backyard-garden/Page.tsx, model.ts, src/viewer.js,
static/styles.css, static/reference/floor-plan.png and three window close-ups.
Generated project index.html/viewer.js/styles.css/reference are outputs; edit
sources and rebuild. The project package follows my session backup template,
but my latest instruction placed it in static/backyard-garden rather than the
prompts repository. Do not move it back or create an unnecessary duplicate.

Model units are metres. Origin is rear-left, X to drawing-right, Z toward house,
Y up. Wall height 3 m is confirmed. Interpreted footprint: width 6.775 m,
main strip depth 1.225 m, return width 1.350 m and total return depth 2.025 m.
Area = 9.379375 m². Latest user corrections: the short 1.350 m return is solid,
not glass. The 5.425 m main frontage has a fixed left window, solid separator,
then four continuous sliding glass doors on the right. Blueprint sections are
1.600 m left bay and 3.825 m sliding opening. The assumed 0.120 m separator
occupies the right end of the left bay, giving fixed glass width 1.480 m.
Left-side window is 2.025 m; inset vertical return is solid. Four leaves slide
with the centre pair sliding outward behind the outer leaves using the opening slider (0..100%).
Reset closes them; fixed glass never moves. Track arrangement, 0.040 m overlap,
0.060 m track spacing and 0.020 m door threshold are illustrative.
Wall thickness 0.120 m,
window bottom 0.120 m, top 2.850 m, framing, tile sizes and divider sizes are assumptions.
Do not present screenshot readings as construction-ready measurements.
No plant, furniture, roof, drainage, lighting or structure design is approved.

The true Three.js viewer supports orbit/pan/zoom, 3D/plan/inside presets,
cutaway outer walls, glazing and dimension visibility, sliding-door opening,
reset and source dialog.
Preserve desktop/touch controls, fallback drawing links and responsive layout.
Preserve the existing Duct viewer model/control behavior, Shopee JSON/order
values, images, interactions, and /static/shopee/ PWA scope.

From repository root:
deno install --frozen --allow-scripts=npm:esbuild
deno task dev
# Fresh local: http://localhost:8000/static/backyard-garden/
deno task check
deno task test:links
deno task preview
# Pure static: http://localhost:8001/static/backyard-garden/
deno task publish:files

Use a repo-local DENO_DIR=$PWD/.deno-cache only if sandbox cache writes require
it. Inspect route/render tests, model area/opening tests, exported asset checks
and invoice tests. Test actual desktop/mobile browser interactions and inspect
console/asset failures. Regenerate tracked Pages output before a source commit.
Keep root instructions and the five project docs synchronized with the final
implementation. Record validation actually completed and unresolved assumptions.

Check branch, remote and dirty state before touching Git. Preserve unrelated
work. For authorized GitHub operations use /Users/hkyo89/.ssh/id_rsa with
IdentitiesOnly=yes and StrictHostKeyChecking=yes; it is a symlink to
/Users/hkyo89/Codes/github.com/hkyo89/mac-setup/.ssh/id_rsa. Never print or copy
private-key contents or credentials. Update safely, never force-push, and
verify remote state plus CI/Pages build after any publication.
```

[Overview](README.md) · [Current decisions](DECISIONS.md) ·
[Shared instructions](../STATIC_PROJECTS.md)

## Confirmed finishes

Floor: rough grey granite tiles. Walls: ivory roughcast. The long rear wall is
divided across its width into seven side-by-side sections with six slim recessed
U-profile dividers. Equal spacing, 18 mm divider width, 8 mm recess and 450 mm
tile spacing are illustrative; the user has not supplied sizes. Full walls are
shown initially so the dividers can be inspected; Cutaway walls remains
available. Textures are generated locally and require no external images.

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

Wall-light output is a low-power warm amber glow, with subdued apertures and
short, soft-edged light pools. The user confirmed warm colour and low wattage;
the preview brightness is illustrative rather than a photometric watt rating.

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

Night mode includes a warm ground spotlight in front of the bonsai, aimed upward
through the foliage toward the rear wall. Its shadow map projects the branches
and canopy onto the wall. The beam and fixture placement are illustrative.

The stepping stones now follow a gently staggered route with varied angles and
sizes, superseding the straight row. Placement is deliberate and stable between
visits, with the central doorway approach kept free of tall objects.

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

## Model data and wall junctions

`model.ts` is the shared typed source for courtyard measurements, wall paths,
window/door geometry, garden placements, canopy pads, turf patches, moss-rock
sizes, lights, decking and bin placement. Coordinates use metres: origin at the
rear-left plan corner, X right, Y up, Z toward the house. Edit layout data here
instead of changing mesh placement constants in the renderer. Rendering
subdivision, texture generation and small fixture construction details remain in
the browser source files. Stale earlier garden-bed/grass coordinates were
removed.

Solid wall ends extend by half their thickness to seal perpendicular corners.
Rear-wall end sections include matching corner coverage; the six intentional
U-divider recesses keep their exact end positions. Junction regression testing
checks the half-thickness coverage and divider behavior.
