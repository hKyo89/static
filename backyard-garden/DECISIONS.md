# Decisions and continuation state

[Overview](README.md) · [Requirements](PRD.md) ·
[Specifications](SPECIFICATIONS.md)

## Confirmed decisions

1. Chat name: **Backyard Garden**. Project directory and URL slug:
   **backyard-garden**.
2. The target is only the red-highlighted L-shaped rear area of the supplied
   plan. Wall height is **3 m**. The close-ups indicate wall-wide windows.
3. The working repository is `hkyo89/static`, with the project directory inside
   that repository. This overrides the backup template's default destination in
   `hkyo89/prompts`. No prompts-repository changes are needed.
4. Use one root Deno Fresh application for this, Duct and Shopee, and future
   projects. A shared project registry registers routes and drives export.
5. Preserve existing `/static/duct/` and `/static/shopee/` URLs and keep the
   invoice's scoped PWA/data and Duct viewer behavior.
6. Export Fresh-rendered HTML and bundled browser JavaScript. Preserve current
   GitHub Pages branch publishing from `main` at repository root.
7. Keep complete root instructions and the five-document project continuation
   package, with source drawings copied from transient attachments.
8. Use `/Users/hkyo89/.ssh/id_rsa` for GitHub SSH operations; it is the symlink
   to the key path in the supplied backup prompt. Never include key contents.

## History and superseded approaches

- The initial conversation delivered a lightweight inline Canvas projection. It
  was a spatial sketch, not a standalone Fresh project or WebGL website. The
  website now uses a true Three.js 3D scene and locally bundled controls.
- That sketch treated the inset vertical return as another glazed edge. The
  website initially interpreted that inset as solid and used three glazing
  sections. This was subsequently corrected by the user: the short return is
  also solid, and the main frontage is fixed glass + wall + four sliding doors.
- Duct previously had a Vite/npm app and committed `duct/dist` output. Shopee
  had its own Fresh setup and copied assets to its project root. The shared root
  app/exporter replaces the independent toolchains. Historical source is
  recoverable from baseline `7c163bb5648ee1992a01ad4812da23506c713373`.
- GitHub Pages Actions deployment was not introduced: inspected existing branch
  publishing already supports the preserved URLs. Shared CI validates all
  projects and confirms generated outputs are current.

## Reasoning and trade-offs

A single registry prevents route/export drift and provides one place to add a
future project. Fresh is used for actual page rendering; client interactions
remain portable static JavaScript. Bundling Three.js separately in each viewer
adds repeated download bytes across pages but keeps each site independent and
removes runtime CDN availability concerns. The Duct page adapter reuses trusted
checked-in markup, reducing risk to its existing complex controls.

Default cutaway hides the two exterior walls so the narrow footprint is visible.
Toggling it restores the 3 m boundary walls. Neutral paving illustrates scale
without inventing a landscape proposal. The page exposes measurement assumptions
instead of treating screenshot readings as surveyed facts.

## Known risks and unanswered questions

- Confirm whether the plan dimensions are clear, face-to-face, or centreline
  measurements. The model currently uses reference-line geometry.
- Confirm glazing height, framing, the left-side opening, wall thickness and
  material. Only wall height was explicitly stated by the user.
- No plant layout, roof, furniture, drainage, lighting or structural decisions
  have been made.
- WebGL requires compatible hardware/browser settings. The reference drawing
  remains accessible when rendering is unavailable.
- Future server-side features require a separate deployment/service; GitHub
  Pages cannot run Fresh request handlers.
- Branch publishing requires regenerated files to be committed. CI checks their
  freshness. Removed assets require explicitly removing old generated copies.

## Validation and publication

Initial implementation source commit: `9df12f94a2bb6fe018fd98d3faba6588d337c4e8`
(`feat: consolidate static projects and add backyard garden viewer`).

Validated locally on 2026-10-11:

- Formatting, lint, TypeScript checks and all **seven Deno tests** passed.
- Fresh rendering of the home and all three project routes, origin-preserving
  slash redirects, the legacy Duct URL, unknown/source-file 404s, polygon area,
  window lengths, invoice arithmetic and PWA scope were checked.
- Complete static build and export verification passed: document-relative assets
  exist, clients are bundled locally, and no transient nonce remains.
- All repository Markdown relative links passed validation.
- Static output was rebuilt twice and was byte-for-byte reproducible; published
  copies matched the export. Local Fresh development served the page and bundled
  viewer with HTTP 200.
- Actual static browser preview loaded the garden, Duct and invoice without
  captured console warnings/errors. All source-plan images loaded.
- Garden presets, switches, reference dialog, reset, direct orbit and zoom were
  exercised. Camera fitting was corrected after browser review exposed clipping;
  dimension labels now avoid one another in narrow views.
- Desktop layout and 390 px / 320 px responsive layouts were reviewed; neither
  mobile size had horizontal overflow. This does not claim physical touch-device
  or Android installation testing.
- Duct's onboarding and English language switch worked. The invoice retained
  five items, loaded images, and its collapsible total. Collection navigation
  from invoice back to home and then garden worked.

The shared workflow performs frozen dependency installation, full checks,
Markdown-link validation, rebuild comparison with committed Pages files, and
artifact upload. Branch publishing uses the same generated files. See the
repository's commit history and GitHub Actions for remote publication state; a
successful local build alone is not proof of a deployed site.

## Recommended next work

After this delivery, confirm the floor and window measurements from an original
PDF or site survey. If a garden layout is wanted, obtain the user's preferences
before adding planting, furniture, finishes or lighting. Continue through
[CONTINUATION_PROMPT.md](CONTINUATION_PROMPT.md), preserving the single-app
design.

## Corrections confirmed by the user — 2026-10-11

- The short return is a solid 3 m wall, not a window.
- The main frontage has a fixed window on the left, a wall separator, and four
  continuous sliding glass doors on the right. The old five fixed bays are
  superseded. The blueprint supplies a 1.600 m left section and 3.825 m right
  section. The exact separator width is not supplied.
- The viewer now uses an opening slider and four separate moving leaves. The
  assumed four-track left-stacking mechanism illustrates operability; it is not
  a confirmed fabrication specification. Fixed glass never moves.
- Original correction screenshots are retained under `corrections/`.
- Geometry regression testing verifies continuous closed coverage, four leaves,
  separate tracks, stacked opening and limits. Documentation has been updated to
  remove the old short-return glazing requirement.

Correction validation: all **eight Deno tests**, format/lint/type checks, static
export and Markdown links passed. Browser review verified the new slider opens
the four leaves, Reset closes them, the short return is opaque, and the fixed
window stays in place. The 390 px mobile layout had no horizontal overflow and
no console warnings/errors were captured.

Latest wall / sliding-door correction source commit:
`feeb7e69700f62e2cd4c02a0b61610bf65c8e395`
(`fix(backyard-garden): correct walls and add four sliding doors`).

Publication cache handling: exported page links include deterministic content
hashes for client scripts and styles. The viewer also tolerates an older cached
page without the opening control, showing the corrected model closed instead of
failing during initialization.

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
