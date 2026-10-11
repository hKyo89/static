# Eldora House first-floor map

Units: metres. Plan origin is the rear-left lot corner, X right, Z toward the
street, Y up. Lot width 10 m comes from the plan's 8200 + 1800 dimension; 20 m
depth comes from the left chain 4000 + 2550 + 3400 + 5050 + 5000. The garden
keeps its prior local coordinates: global X = garden X + 3.225. All room bounds,
wall paths, and openings are editable in `house-model.ts`.

| ID  | Name                  | Status                                      |
| --- | --------------------- | ------------------------------------------- |
| G01 | Backyard Zen garden   | Confirmed garden                            |
| G02 | Smoking nook          | Confirmed user concept                      |
| R01 | Rear room             | Use unconfirmed                             |
| R02 | Service room          | Possible bathroom / service room            |
| R03 | Side room & lightwell | Void visible, room use unconfirmed          |
| S01 | Stair & circulation   | Stair runs visible                          |
| R04 | Kitchen / pantry      | Provisional, based on counter-like outlines |
| R05 | Main living / dining  | Provisional large open area                 |
| E01 | Entrance hall         | Provisional approach zone                   |
| R06 | Front side room       | Use unconfirmed                             |
| T01 | Front terrace         | Provisional entrance transition             |
| P01 | Open garage           | Confirmed open garage                       |

The electrical drawing is not a complete architectural opening schedule. This is
a full-floor spatial interpretation, not a construction model. Newly added
window positions, door widths, swing directions, gate style, stair rises, and
interior floor finish are illustrative. Interior walls use off-white; courtyard
walls retain ivory roughcast. Wall height is 3 m throughout as requested. Some
electrical annotations and ceiling-light outlines are not walls. The large
rectangular outline in the main room is therefore not modelled as a partition.
Room IDs are stable references even if names are changed later.

The 1F overview omits the roof and upper floor. The garden-only view retains the
existing two-storey shadow envelope. New interior doors are shown partly open;
the original garden sliding-door slider still operates the centre pair. Source:
[full first-floor drawing](static/reference/first-floor.png).

## Removed front features and open garage

The front-left stair and rounded front-corner pedestrian entrance shown on the
old drawing have been removed. The front wide area (P01) is an open garage,
without front or side perimeter walls and without gates. The right house wall
stops at the front side room (Z=15.625 m). House-facing walls remain. This user
correction supersedes the old carport enclosure and second stair run.

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
