import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function hasDeclarationFiles(dirPath) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory() && hasDeclarationFiles(entryPath)) {
      return true;
    }
    if (entry.isFile() && entry.name.endsWith(".d.ts")) {
      return true;
    }
  }

  return false;
}

const packageJson = readJson(path.join(root, "package.json"));

const expectedExports = new Set([
  ".",
  "./server",
  "./phosphor.css",
  "./fonts.css",
  "./tokens.css",
  "./typography.css",
  "./global.css",
  "./components.css",
  "./package.json",
]);

const actualExports = new Set(Object.keys(packageJson.exports ?? {}));
for (const key of expectedExports) {
  assert(actualExports.has(key), `Missing public package export: ${key}`);
}
for (const key of actualExports) {
  assert(expectedExports.has(key), `Unexpected public package export: ${key}`);
}

assert(packageJson.types === "dist/esm/index.d.ts", "types must point to dist/esm/index.d.ts");
assert(packageJson.main === "dist/cjs/index.js", "main must point to dist/cjs/index.js");
assert(packageJson.module === "dist/esm/index.js", "module must point to dist/esm/index.js");
assert(packageJson.style === "dist/styles/phosphor.css", "style must point to dist/styles/phosphor.css");

const typeComponentRoot = path.join(root, "types/components");
const allowedTypeDirs = new Set([
  "admin",
  "atoms",
  "content",
  "molecules",
  "organisms",
  "pages",
  "presets",
  "templates",
]);

if (fs.existsSync(typeComponentRoot)) {
  for (const entry of fs.readdirSync(typeComponentRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const entryPath = path.join(typeComponentRoot, entry.name);
    assert(
      allowedTypeDirs.has(entry.name) || !hasDeclarationFiles(entryPath),
      `Stale flattened type snapshot found: types/components/${entry.name}`,
    );
  }
}

const sourceIndex = fs.readFileSync(path.join(root, "src/index.ts"), "utf8");
const typeIndex = fs.readFileSync(path.join(root, "types/index.d.ts"), "utf8");

for (const exportLine of [
  "export * from './components'",
  "export * from './foundations'",
  "export * from './hooks'",
]) {
  assert(sourceIndex.includes(exportLine), `src/index.ts missing ${exportLine}`);
  assert(typeIndex.includes(exportLine), `types/index.d.ts missing ${exportLine}`);
}

console.log("Public API audit passed.");
