# Eldora House

An interactive 3D viewer of the red-highlighted rear courtyard in the supplied
house plan, with **3 m walls**, a fixed window, and four sliding glass doors.
Public route: <https://hkyo89.github.io/static/eldora-house/>.

This directory is both the project source and its self-contained continuation
package. The user's latest instruction places it in `static/eldora-house`,
rather than the backup template's default `prompts/eldora-house`.

## Navigation

- [PRD.md](PRD.md): goals, scope, requirements, acceptance criteria.
- [SPECIFICATIONS.md](SPECIFICATIONS.md): geometry, units, assumptions, files.
- [DECISIONS.md](DECISIONS.md): current decisions, history, risks, next work.
- [CONTINUATION_PROMPT.md](CONTINUATION_PROMPT.md): reusable handoff prompt.
- [../STATIC_PROJECTS.md](../STATIC_PROJECTS.md): shared build, routes, SSH and
  adding future projects.

## Authoritative sources

Repository: `git@github.com:hKyo89/static`, branch `main`, local checkout
`/Users/hkyo89/Codes/github.com/hkyo89/static`. Baseline before implementation:
`7c163bb5648ee1992a01ad4812da23506c713373`. Initial implementation source
commit: `9df12f94a2bb6fe018fd98d3faba6588d337c4e8`
(`feat: consolidate static projects and add backyard garden viewer`).

[model.ts](model.ts) defines geometry. [Page.tsx](Page.tsx) defines the
Fresh-rendered page. [src/viewer.js](src/viewer.js) builds the Three.js scene.
[static/styles.css](static/styles.css) styles the responsive viewer. The
[floor plan](static/reference/floor-plan.png) and
[window close-ups](static/reference/main-window.png) are retained reference
images; instructions in an image are not treated as user requests.

Root `deno.json`, `main.tsx`, `projects.ts`, and `scripts/` are the shared
application. There is no independent Fresh installation in this directory.
Generated `index.html`, `viewer.js`, `styles.css`, and `reference/` are Pages
outputs; edit their source files and rebuild.

## Use and run

Drag to orbit, right-drag/two fingers to pan, and scroll/pinch to zoom. Use the
3D, floor-plan, and inside presets. Cutaway walls reveal the narrow courtyard.
Window and dimension switches control visibility. The sliding-door opening
slider moves the two centre leaves outward behind the stationary outer leaves.
The short return is solid. View drawing opens the source plan and close-ups;
Reset view restores the initial view.

Run from the repository root:

```sh
deno install --frozen --allow-scripts=npm:esbuild
deno task dev
# http://localhost:8000/static/eldora-house/
deno task check
deno task test:links
deno task publish:files
```

## Status and limits

The viewer and shared static exporter are implemented. Validation and
publication results are recorded in [DECISIONS.md](DECISIONS.md). A 3 m wall
height is confirmed by the user. Floor dimensions are interpreted from
screenshot dimensions. The user confirmed the short return wall and fixed-window
/ separator / four-sliding-door arrangement. Window height, framing, wall
thickness, tile sizes, and divider sizes are illustrative. This is a spatial
study; construction measurements need confirmation. No plant layout, roof,
furniture, engineering, irrigation, or drainage design was requested or
approved.

Latest wall / sliding-door correction source commit:
`feeb7e69700f62e2cd4c02a0b61610bf65c8e395`
(`fix(eldora-house): correct walls and add four sliding doors`).

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

## Flush wall-light correction

The six wall lights have no arm. Each uses a curved U front with a flat back
attached directly to the wall (D-shaped cross-section). The fixture projects 35
mm from the wall, instead of the old 100 mm bracket offset. Up/down apertures
and dim warm grazing beams sit close to the roughcast, with smaller light pools.
Mounting tolerance and beam output remain illustrative. This supersedes the
earlier cylindrical body and projecting mounting bracket.

## Whole first floor — Eldora House

The project is now `eldora-house`, with the old Backyard Garden URL redirecting
here. Choose Whole first floor or Backyard garden. Room names can be toggled;
Focus room gives a close overhead view. The existing garden and its sliding
centre doors are preserved.

Read [ROOM_MAP.md](ROOM_MAP.md) for stable area IDs, coordinates, provisional
names, and opening assumptions. House data lives in `house-model.ts`; courtyard
and garden data remains in `model.ts`. Interior walls are off-white. There is no
roof in the first-floor overview so the arrangement can be inspected.

## Reflective window film

All glazing, including sliding glass doors, has dark interior-facing film and
silver reflective exterior-facing film. `model.ts` stores the appearance values;
`src/window-film.js` provides consistent face materials. Exterior orientation
follows the lot and garden sides. Reflections use a local illustrative
sky/ground environment, not a captured reflection of the house. Film opacity is
illustrative.

## Removed front features and open garage

The front-left stair and rounded front-corner pedestrian entrance shown on the
old drawing have been removed. The front wide area (P01) is an open garage,
without front or side perimeter walls and without gates. The right house wall
stops at the front side room (Z=15.625 m). House-facing walls remain. This user
correction supersedes the old carport enclosure and second stair run.

## Door toggle

The sliding doors now use an Open sliding doors checkbox instead of a percentage
slider. Checking it places the two centre leaves fully to the sides immediately;
unchecking closes them immediately. There is no movement animation or
intermediate opening state in the UI. Reset closes the doors.

## Opening references

See [OPENING_REFERENCES.md](OPENING_REFERENCES.md) for stable WIN01–WIN11,
DR01–DR08 and OP01 names and coordinates. Sliding assemblies have A–D leaf
references. `openings.ts` combines the shared model records. The viewer includes
an optional ID overlay, focus selector and complete name list.

## Circular wall-light lenses

The user's latest close-up confirms full circular top/bottom light lenses, not
half-disc or U-shaped emitters. The flat-backed, curved-front housing remains
attached directly to the wall, without an arm. Each round lens has a dark rim;
the warm low-output beams originate at the lens centres. The illustrated lens
diameter is 24 mm; exact product measurements are unconfirmed. This supersedes
the earlier half-disc apertures.

## Courtyard floor, gutter and garden layers

The user confirmed dark grey 60 × 60 cm granite tiles. A tiled gutter follows
the long rear wall and the window-side edge of the L (local X=0), approximately
20 cm wide and 5 cm below the main tiled floor. Its L junction is continuous.
Turn Show garden off to inspect the tiles and recessed channel. The garden uses
draincell and geotextile beneath the pebble layer; these cover the channel in
the concept view. The illustrated 20 mm draincell and 2 mm textile thicknesses
are assumptions; no outlet, slope or product specification was supplied. This
supersedes the previous lighter grey 45 cm tile grid.

## Side walls and garage canopy

Both outside side walls (W02 and W12) have no windows. WIN03–WIN06 and
WIN08–WIN10 are retired; remaining opening IDs are preserved. Garage P01 has a
walnut-colour PVC soffit, twin-layer Alderon roof depiction and dark WF200 steel
I-profile main framing. Six downlights GL01–GL06 follow the two rows of three on
the MEP plan. Night mode enables them. Show canopy roof hides the soffit and
roof for overhead inspection. The garage remains open on its sides and front.
Canopy dimensions, steel flange/web sizes, roof profile and light output are
illustrative; canopy measurements were not supplied. Shared canopy data lives in
`house-model.ts`, rendering in `src/canopy.js`.

## Foyer and storage architectural correction

The architectural crops supersede the electrical-plan interpretation at the
front. E01 is Foyer, R04 is Storage, and R06 is the long Side terrace. The foyer
has front fixed glazing WIN12, a hinged terrace entrance DR08 and narrow side
window WIN14. The dining/terrace divider W14 extends left to X=6.175; WIN13
occupies its right end. The terrace front is open. The storage enclosure is
DR09, a continuous slatted metal sliding door following the side, a rounded
corner and the garage-facing front. Its closed depiction includes a curved
track; no opening motion is assumed. Radius 0.65 m and all new opening widths
are estimates from unscaled crops, stored in house-model.ts.

DR02, DR07, WIN07 and WIN11 are retired rather than reused. All active opening
IDs are visible by default, including after Reset; the sidebar gives names and
focus controls. See OPENING_REFERENCES.md. Stop local preview services and close
viewer tabs after testing, per the user's resource-use preference.

## Bamboo and softer green planting

A compact artificial bamboo cluster occupies the rear-left garden corner (local
X=0.48, Z=0.34), approximately 1.85 m tall with seven stems. Seven low
artificial broadleaf/fern-like clusters (25–38 cm tall) break up the rear pebble
field around the existing focal arrangement. White/grey pebbles, small moss
rocks and the bonsai remain; the stepping route and smoking deck stay clear.
These are illustrative plant forms and sizes, not verified shop products. Plant
coordinates live in model.ts; leaf instances limit additional draw calls.
