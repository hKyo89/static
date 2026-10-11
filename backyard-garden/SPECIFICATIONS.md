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

Four sliding leaves form one continuous right opening. The illustrative design
uses four tracks, 0.060 m apart, with 0.040 m leaf overlap. Each leaf is 0.98625
m wide; closed leaves cover the full 3.825 m span. At 100% open they stack at
the left of that opening, leaving about 2.839 m clear. The doors have an
illustrative 0.020 m threshold instead of a wall sill across the opening. Actual
track system, stacking direction, separator thickness, threshold and vertical
glazing dimensions still require confirmation. `slidingLeafPositions` clamps
opening fractions to 0…1 and returns separate track positions.

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
