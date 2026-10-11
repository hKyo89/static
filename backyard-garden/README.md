# Backyard Garden

An interactive 3D viewer of the red-highlighted rear courtyard in the supplied
house plan, with **3 m walls**, a fixed window, and four sliding glass doors.
Public route: <https://hkyo89.github.io/static/backyard-garden/>.

This directory is both the project source and its self-contained continuation
package. The user's latest instruction places it in `static/backyard-garden`,
rather than the backup template's default `prompts/backyard-garden`.

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
slider stacks four leaves on separate tracks. The short return is solid. View
drawing opens the source plan and close-ups; Reset view restores the initial
view.

Run from the repository root:

```sh
deno install --frozen --allow-scripts=npm:esbuild
deno task dev
# http://localhost:8000/static/backyard-garden/
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
(`fix(backyard-garden): correct walls and add four sliding doors`).

## Confirmed finishes

Floor: rough grey granite tiles. Walls: ivory roughcast. The long rear wall is
divided across its width into seven side-by-side sections with six slim recessed
U-profile dividers. Equal spacing, 18 mm divider width, 8 mm recess and 450 mm
tile spacing are illustrative; the user has not supplied sizes. Full walls are
shown initially so the dividers can be inspected; Cutaway walls remains
available. Textures are generated locally and require no external images.
