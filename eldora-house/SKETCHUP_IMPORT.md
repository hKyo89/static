# SketchUp house import

The garden registration and finish/visibility adjustments below are superseded
where applicable by the [13 October revisions](REVISIONS.md). The source house
origin remains unchanged; the garden is registered to the ground-floor bounds.

The user supplied `MODELING INTERIOR.skp` on 12 October 2026. The original file
is unchanged. Its native geometry, group/component transforms and material UVs
were read with the installed SketchUp 2026 C API. The browser asset is
`static/assets/house.glb`; generated Pages output copies it to
`assets/house.glb`.

The selected export contains 700,174 triangles and 97 embedded texture images.
Texture images are limited to 1024 pixels and compressed for the browser. The
47.35 MB asset retains the selected geometry without decimation. Detached study
copies outside the lot and underground staging objects are excluded. Source root
Groups-000 (site context) and Groups-027 (original garage canopy) are hidden in
the viewer so the established canopy remains authoritative.

Source coordinates use metres, X right, Y towards the rear, Z up. The viewer
maps these into its Y-up convention with origin `[4.948, 22.581, 0.43]`. The
existing canopy moves 1.075 m towards the front to align with the source lot.
This registration uses the lot/courtyard bounds; it does not reshape the house.
The existing garden geometry, lights and planting are preserved. The standing
ashtray has been removed following the user's latest correction.

The viewer defaults to a cutaway at 2.52 m above the garden floor. Upper floors
and roof restores the complete imported height. Show house model hides or shows
the source model as a whole; Show windows controls transparent source meshes.
Doors remain in the position stored in the source file. The earlier sliding-door
toggle applies only to the interpreted garden frontage when viewing Garden. The
earlier approximate room/opening lists remain historical references and are not
overlays on the imported house. Garden reference overlays remain available.

Rendering is on demand, with no continuous animation loop. After preview QA,
close the preview browser tab and stop its local service.

The conversion utilities and source inventory are retained locally under the
chat workspace `work/`; no SketchUp original or native SDK is published.

## Additional suites and facade — 18 October 2026

The supplied `MODELING INTERIOR LT 2 MASTER BEDROOM.skp`,
`MODELING INTERIOR LT.2 - KAMAR ANAK.skp` and `MODELING FACADE.skb` are read
through the installed SketchUp C API, including the facade backup file. The
originals remain unchanged. Selected geometry is exported to `master.glb`,
`girl.glb`, `boy.glb` and `facade.glb` with embedded textures, limited to 1024
pixels.

All three files share the original source coordinates and upstairs floor at 4.38
m. No translation or rescaling is applied beyond the established house
registration. Master exports include bed, wall treatment, dressing furniture,
makeup furniture and lighting. The children's file includes a boy's room and
detached study copies; both bedrooms and their WICs are included. Its dressing
and makeup inspection bounds now follow the supplied fitted furniture.

Facade additions replace the corresponding original front upper architectural
roots (10, 15, 17, 18); the original garage canopy and canceled fences remain
excluded. Master finish roots 46–49 are replaced by the supplied versions.
Duplicate house shells, garage gates, surrounding context and detached studies
are omitted. Other architecture is retained.

`src/additional-models.js` loads the selected additions, assigns storey and
ceiling visibility, and applies the same room isolation planes as the house.
Source material UVs and geometry are retained. Water and lighting depictions
remain illustrative; native design files are not published.

The added exports total approximately 69 MB (master 31.3 MB, girl 23.0 MB, boy
14.4 MB, facade 0.3 MB). These load once per page and are reused across room
navigation. The Boy’s WIC uses the shared fitted wardrobe geometry from the
children’s source file; it also has a dedicated inspection view.
