import { roomNavigation } from "../eldora-house/room-navigation.ts";
import { app } from "../main.tsx";

Deno.test("room navigation preserves all user-defined floor names and ordering", () => {
  const expected = [
    [
      "Garden",
      "Karaoke",
      "Living",
      "Piano",
      "Dry kitchen",
      "Island",
      "Dining",
      "Foyer",
      "Garage",
      "Guest entrance",
      "Storage",
      "WIC",
      "Wet kitchen",
      "Bathroom",
      "Food storage",
    ],
    [
      "Master",
      "Master makeup",
      "Master bathroom",
      "Master WIC",
      "Living",
      "Kids bathroom",
      "Boy’s bedroom",
      "Girl’s bedroom",
      "Girls’ WIC",
      "Girl’s makeup",
      "Laundry",
      "Service area",
      "Storage",
    ],
  ];
  const ids = new Set();
  for (const floor of [1, 2]) {
    const list = roomNavigation.filter((room) => room.floor === floor);
    if (
      JSON.stringify(list.map((room) => room.name)) !==
        JSON.stringify(expected[floor - 1])
    ) throw new Error("Room names/order changed");
    for (const room of list) {
      if (ids.has(room.id)) throw new Error("Duplicate room URL");
      ids.add(room.id);
      const [x, y, x2, y2] = room.bounds;
      if (
        !(x < x2 && y < y2 && x >= 1.5 && x2 <= 11.8 && y >= 0 && y2 <= 21.6)
      ) throw new Error("Invalid room inspection bounds");
      if (floor === 2 && room.z < 3.5) {
        throw new Error("Second-floor camera is on the wrong storey");
      }
    }
  }
});
Deno.test("every room has a rendered direct link and selectable navigation option", async () => {
  const response = await app.handler()(
    new Request("http://localhost/static/eldora-house/"),
  );
  const html = await response.text();
  for (const room of roomNavigation) {
    if (
      !html.includes(`href="#${room.id}"`) ||
      !html.includes(`value="${room.id}"`)
    ) throw new Error(`Missing navigation for ${room.id}`);
  }
});
