# Floor and room navigation

Room names and order follow the user’s numbered bird’s-eye screenshots: 15
first-floor areas (including Food storage) and 14 second-floor areas (including
the added Boy’s WIC). Shared source-coordinate inspection bounds live in
[room-navigation.ts](room-navigation.ts). These bounds are viewing regions
rather than new architectural walls; crop-based shared edges, particularly the
second-floor dressing areas, remain adjustable.

Use Whole house, 1F or 2F, then choose a room. Room links use URL fragments such
as `#1f-karaoke` and `#2f-master`, so one loaded model is reused. Previous/next
buttons follow the user’s numbering within the selected floor. The room map and
on-model names are also clickable. Refreshing a room URL restores that room.

A room starts at an interior camera with the appropriate floor visible and
ceilings open. Show surrounding rooms restores context. Isolation clips source
meshes and furnishings to the room’s plan and elevation; clipped faces are open
inspection cuts, not newly modeled walls. Garden and garage stay separate. Reset
view reframes the current room. Whole house returns to the full model.

The orbit target can now be approached to 8 cm instead of 2 m; horizontal and
vertical panning and underside orbit remain available. The model renders on
interaction rather than continuously, with no extra model downloads per room.
The leftover ARANDELA 04 garden frame (source instance 63) is removed.
