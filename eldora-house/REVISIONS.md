# Confirmed revisions - 13 October 2026

Publishing means committing and pushing the verified source and generated Pages
files. The user's pending revision list is implemented from source baseline
`11a901e`.

## Courtyard registration

The earlier garden used an upper-floor projection as its rear coordinate. The
house and steel frame retain their registration. The garden now uses the native
ground-floor courtyard: source X 5.0232-11.5732 m, source Y 19.5563-21.3563 m.
The main strip is 6.55 x 1.00 m; its short leg is 1.35 m wide and reaches 1.80 m
total depth. The L-shaped surface is 7.63 square metres. These model-derived
values supersede the earlier electrical-plan approximation of 9.38 square
metres. Product sizes are unchanged; planting anchors are adjusted to fit.

The seven-section rear wall, right return, bamboo, olive, small moss rocks,
grasses, bonsai spotlight, luminous rocks and Mars sphere remain. Native floor
surfaces beneath the replacement courtyard no longer obscure its pebbles.

## Interiors and finishes

- The canceled upper wood fence and the large abstract painting at the rear
  sitting-room panel are hidden. Other artwork remains.
- The island basin and fridge door/body surfaces have stainless metal finishes.
- Decorative grey mirror surfaces reflect a captured local room environment.
  Reflections are captured once at load and dimmed at night to avoid repeated or
  continuous rendering.
- The rear marble panel uses a blue-white-gold texture recreated from the
  supplied construction photo with the built-in image-generation tool. The wood
  sections and gold trim remain. This is a visual interpretation of the pattern.
- The main kitchen tap depicts the Modena KT 1915 SPCR gooseneck form. A
  built-in metal soap dispenser and a separate drinking tap are added, with
  drinking water on the right from the island seating side.
- A generic digital piano and bench occupy the indicated stair-panel area.

## Furniture

The Madelline arrangement faces the TV: beige left-arm seat 108 x 104 x 94 cm,
armless seat 86 x 104 x 94 cm, ottoman 88 x 105 x 51 cm, and natural-beige
coffee table 105 x 90 x 43.5 cm. The 95 x 39 x 50 cm natural-oak end table is
omitted.

The separate panel sofa is depicted as 2.75 x .95 x .90 m, leaving about 26 cm
total spare width at its 3.01 m wall. Four island chairs face the countertop.
Six grey dining chairs form two rows of three, with no end chairs. Piano,
secondary sofa and chair dimensions are illustrative because exact products were
not supplied.

## Garage canopy

The Alderon roof and walnut PVC ceiling extend to the full floor footprint, 10.0
x 6.3 m. Steel frame rows and columns remain at their existing coordinates, as
do the six MEP downlights. A 20 cm-deep front gutter has two corner outlets with
Japanese-style cup rain chains. The garage surface is rough, dry/matte dark grey
granite, with a 60 x 60 cm grid. Gutter width, chain style and hardware sizes
are illustrative; this viewer does not model hydraulic flow.

## Files and viewing

[revisions-model.ts](revisions-model.ts) holds source registration, selections,
product dimensions, furniture positions, canopy coverage and drainage values.
[src/furnishings.js](src/furnishings.js) builds additions.
[src/imported-house.js](src/imported-house.js) applies source-model overrides.
The original SketchUp file and the imported GLB remain unchanged.

Focus area now offers the seating, marble panel, piano, island, dining table and
canopy. Floor plan uses an orthographic camera so wall height does not distort
the courtyard outline. The renderer remains idle between interactions. Close
temporary preview tabs and stop their service after verification.

## Independent house layers

Five checkboxes control the first floor, first-floor ceiling, second floor,
second-floor ceiling, and roof/service deck independently. Reset shows the first
floor with its ceiling open. Source triangles are assigned by storey height and
ceiling material; geometry spanning a storey boundary is split at triangle
level. The retained garden and garage canopy keep their separate controls.

Garage floor, frame, drains and rain chains follow the 1st floor checkbox. Show
canopy roof independently controls the roof, ceiling and its downlights. Garden
controls do not change either garage layer. Garden-only area hides the entire
garage.

## Garden planting and feature revision

The olive and WPC deck are removed; white pebbles now continue around the entire
L return. Bamboo planting is replaced by moss, moss rocks, natural grey rocks,
seven fern clusters and nine ilalang clumps. Broader irregular moss islands
include a continuous low right-hand composition. All glowing stones and the
glowing ball are removed. The 1.70 m pine remains the tallest focal point, with
layered asymmetrical needle foliage.

The supplied pagoda reference replaces the round lantern with a charcoal square
stone plinth, pierced chamber and swept roof. Warm light shines through chamber
openings at night. A static two-stage bamboo water fountain in a stone tray sits
near the right wall. Two ground spots aim at the pine and fountain. Fountain and
lantern sizes are illustrative because their product dimensions were not given;
the water depiction is static to preserve idle rendering.
