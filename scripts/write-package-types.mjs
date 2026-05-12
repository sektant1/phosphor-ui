import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const packageTypes = [
  ["dist/esm/package.json", { type: "module" }],
  ["dist/cjs/package.json", { type: "commonjs" }],
];

for (const [relativePath, contents] of packageTypes) {
  const fullPath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, `${JSON.stringify(contents, null, 2)}\n`);
}

console.log("Wrote dist package type markers.");
