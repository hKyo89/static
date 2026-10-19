Deno.test("suite and facade exports contain registered additions without duplicate shells", async () => {
  for (
    const [id, expectedRoots] of [["master", 48], ["girl", 30], ["boy", 19], [
      "facade",
      5,
    ]] as const
  ) {
    const bytes = await Deno.readFile(`eldora-house/static/assets/${id}.glb`);
    const view = new DataView(bytes.buffer);
    if (view.getUint32(0, true) !== 0x46546c67) {
      throw new Error(`${id}: invalid GLB`);
    }
    const length = view.getUint32(12, true);
    const asset = JSON.parse(
      new TextDecoder().decode(bytes.subarray(20, 20 + length)),
    );
    const roots = asset.nodes[0].children;
    if (roots.length !== expectedRoots) {
      throw new Error(`${id}: unexpected export selection`);
    }
    for (const index of roots) {
      const root = asset.nodes[index].extras;
      const [lo, hi] = root.boundsMetres;
      if (
        lo[0] < 1.8 || hi[0] > 11.6 || lo[1] < 5 || hi[1] > 21.4 ||
        lo[2] < (id === "facade" ? 3 : 3.5)
      ) {
        throw new Error(`${id}: detached or unrelated root ${index}`);
      }
    }
    if (asset.images.some((image: { uri?: string }) => image.uri)) {
      throw new Error(`${id}: external texture dependency`);
    }
  }
});
