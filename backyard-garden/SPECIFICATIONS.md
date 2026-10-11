# Specifications

[Overview](README.md) · [Requirements](PRD.md) · [Decisions](DECISIONS.md)

## Geometry

All values are **metres**. The plan origin is the rear-left corner. X increases
rightward across the drawing, Z increases toward the house, and Y points up. The
Three.js scene translates this model to centre it; authoritative geometry
remains in [model.ts](model.ts).

| Parameter                    | Value                                                                               | Authority                                  |
| ---------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------ |
| Wall height                  | 3.000                                                                               | Explicitly confirmed by user               |
| Overall highlighted width    | 6.775                                                                               | Interpreted as 1.350 + 5.425 from plan     |
| Main strip depth             | 1.225                                                                               | Interpreted from right-side plan dimension |
| Return width                 | 1.350                                                                               | Interpreted from top dimension             |
| Overall depth at left return | 2.025                                                                               | Interpreted from plan's left dimension     |
| Extra return depth           | 0.800                                                                               | Derived: 2.025 − 1.225                     |
| Floor area                   | 9.379375 m²                                                                         | Derived from model; UI rounds to 9.38      |
| House frontage width         | 5.425                                                                               | Derived: 6.775 − 1.350                     |
| Short return solid wall      | 1.350                                                                               | User correction: solid wall, no window     |
| Left-side window width       | 2.025                                                                               | Model interpretation of close-up           |
| Wall thickness               | 0.120                                                                               | Illustrative assumption                    |
| Window bottom above floor    | 0.120                                                                               | Illustrative assumption                    |
| Window top above floor       | 2.850                                                                               | Illustrative assumption                    |
| Glazed opening height        | 2.730                                                                               | Derived from illustrative vertical limits  |
| Frame widths                 | 0.045 / 0.055                                                                       | Illustrative assumption                    |
| Window / door arrangement    | Fixed left window, wall separator, 4 sliding right doors; left-side window retained | User-confirmed arrangement                 |
| Floor slab / joint spacing   | 0.120 / 0.450                                                                       | Illustrative material depiction            |

The screenshots do not establish whether dimensions refer to clear widths, wall
faces or centrelines. The model uses perimeter reference lines and centres wall
thickness on them. Reported floor area is the footprint calculation, not a
surveyed net area after wall thickness. No scaling from phone screenshot pixels
is claimed as measurement precision.

### Footprint vertices (X, Z)

```text
(0, 0)
(6.775, 0)
(6.775, 1.225)
(1.350, 1.225)
(1.350, 2.025)
(0, 2.025)
```

The two solid outer walls run along Z=0 and X=6.775. The inset return wall is
solid, as is the **1.350 m short return at Z=2.025** (user correction #1). The
main frontage at Z=1.225 is divided into the blueprint's 1.600 m left bay and
3.825 m sliding opening on the right (user correction #2). The left bay contains
a fixed window and a 0.120 m separator wall; the exact separator width is
assumed and occupies the right end of the 1.600 m bay. Fixed glass therefore
spans X=1.350…2.830, separator X=2.830…2.950, and doors X=2.950…6.775. The fixed
window is not an operable door and never moves. Left-side glazing remains at
X=0, Z=0…2.025.

Four leaves form one continuous right opening. The outer pair stays stationary;
the two centre leaves slide in opposite directions behind them on an
illustrative two-track system, 0.060 m apart. Each leaf is 0.98625 m wide with
0.040 m overlap. At 100% open, two pairs sit at the sides and leave about 1.853
m clear in the centre. Track dimensions, threshold and vertical dimensions
remain illustrative. `slidingLeafPositions` clamps opening fractions to 0…1.

## Source references

| Retained image                                          | Original attachment                                        |
| ------------------------------------------------------- | ---------------------------------------------------------- |
| [floor-plan.png](static/reference/floor-plan.png)       | `codex-clipboard-9d3c69f8-0be4-44f7-b610-bc1d0aefee7d.png` |
| [main-window.png](static/reference/main-window.png)     | `codex-clipboard-5bf6e696-21dd-446f-942d-de74850a9ec9.png` |
| [return-window.png](static/reference/return-window.png) | `codex-clipboard-2f2cfe2b-a50d-4085-82c8-3f70f55b0c5d.png` |
| [side-window.png](static/reference/side-window.png)     | `codex-clipboard-8ec9582c-ceb5-4982-9c14-5308c671d199.png` |

The original attachment paths were temporary macOS clipboard files. Retained
copies are authoritative continuation references and remove that dependency.

## Viewer and browser interfaces

- `Page.tsx` exports `BackyardPage`, registered under slug `backyard-garden`.
- `src/viewer.js` imports the shared model and Three.js 0.180.0.
- Stage selector: `#garden-stage`.
- View buttons: `data-camera="perspective|plan|inside"`.
- Switches: `data-cutaway`, `data-windows`, `data-dimensions`.
- Actions: `data-reset`, `data-reference-open`, `data-reference-close`.
- Sliding-door control: `data-door-opening` (0…100) and `data-door-output`.
- OrbitControls: damped navigation, distances 2…40 m, polar angle limited above
  the ground, normal desktop and multi-touch gestures.
- Perspective camera: 40° field of view, near/far 0.1 / 100 m.
- Renderer: WebGL, antialiasing, pixel ratio capped at 2, soft shadows.
- Dimension labels: CSS2DRenderer with pointer events disabled.
- User input stays local; no viewer network API or persistent storage is used.

The exported document uses `./styles.css`, `./viewer.js`, and `./reference/...`.
Source assets live under `static/`; generated copies appear at the project root.
The site base is `/static/`, never `/` on the production GitHub Pages domain.

## Toolchain and exact paths

See [../STATIC_PROJECTS.md](../STATIC_PROJECTS.md) for pinned dependencies,
shared file responsibilities, SSH key paths, Git workflow and instructions. Run
all tasks from `/Users/hkyo89/Codes/github.com/hkyo89/static`. Build output is
`dist/backyard-garden/`. Branch-published files are refreshed into
`backyard-garden/`. Do not edit generated bundles directly.

Unknowns: actual clear site measurements, glazing vertical dimensions, frame
layout, exact tile and divider dimensions, and any garden design.

## User corrections — 2026-10-11

[Solid-return screenshot](corrections/solid-return.png) identifies the short
return previously modelled incorrectly as glass.
[Sliding-frontage screenshot](corrections/sliding-frontage.png) identifies the
previous five-bay model, superseded by fixed window + solid separator + four
sliding doors. These are screenshots of the incorrect viewer, retained to locate
the correction; their depicted geometry is not authoritative.

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
