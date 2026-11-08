import fs from "node:fs/promises";
const manifest = JSON.parse(await fs.readFile("lib/media.json", "utf8"));
const results = [];
for (const [key, source] of Object.entries(manifest)) {
  const bytes = await fs.readFile("public" + source);
  const png = source.endsWith(".png");
  const valid = png
    ? bytes
        .subarray(0, 8)
        .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
    : bytes[0] === 255 && bytes[1] === 216;
  if (!valid) throw Error("Invalid image asset: " + source);
  const result = {
    key,
    source,
    bytes: bytes.length,
    format: png ? "PNG" : "JPEG",
  };
  results.push(result);
  console.log("PASS", key, result.format, result.bytes, "bytes");
}
await fs.mkdir(".test-results", { recursive: true });
await fs.writeFile(
  ".test-results/asset-results.json",
  JSON.stringify({ executedAt: new Date().toISOString(), results }, null, 2),
);
console.log(
  "All image assets are bundled locally. No image download is required.",
);
