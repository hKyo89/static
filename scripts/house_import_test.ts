import { importedModel } from "../eldora-house/imported-model.ts";

Deno.test("SketchUp browser asset has valid bounded geometry and embedded textures", async () => {
  const bytes = await Deno.readFile(
    new URL("../eldora-house/static/assets/house.glb", import.meta.url),
  );
  const view = new DataView(bytes.buffer);
  if (view.getUint32(0, true) !== 0x46546c67 || view.getUint32(4, true) !== 2) {
    throw new Error("Not a glTF 2 binary asset");
  }
  if (
    view.getUint32(8, true) !== bytes.length || bytes.length > 80 * 1024 ** 2
  ) {
    throw new Error("Invalid or oversized browser asset");
  }
  const jsonLength = view.getUint32(12, true);
  const asset = JSON.parse(
    new TextDecoder().decode(bytes.slice(20, 20 + jsonLength)),
  );
  const binaryLength = view.getUint32(20 + jsonLength, true);
  for (const part of asset.bufferViews) {
    if (
      part.byteOffset < 0 || part.byteOffset + part.byteLength > binaryLength
    ) {
      throw new Error("Buffer view falls outside the binary payload");
    }
  }
  for (const mesh of asset.meshes) {
    for (const primitive of mesh.primitives) {
      const position = asset.accessors[primitive.attributes.POSITION];
      if (
        !position?.count || !position.min.every(Number.isFinite) ||
        !position.max.every(Number.isFinite)
      ) {
        throw new Error("Missing or invalid position bounds");
      }
    }
  }
  if (
    asset.images.length < 90 ||
    asset.images.some((image: { uri?: string; bufferView?: number }) =>
      image.uri || image.bufferView === undefined
    )
  ) throw new Error("Source textures must be embedded for offline use");
  if (importedModel.sourceOrigin.length !== 3) {
    throw new Error("Missing source registration");
  }
});
