# SketchUp house import

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
