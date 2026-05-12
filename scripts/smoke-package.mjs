import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const require = createRequire(import.meta.url);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertFile(relativePath) {
  const fullPath = path.join(root, relativePath);
  assert(fs.existsSync(fullPath), `Missing package artifact: ${relativePath}`);
  assert(fs.statSync(fullPath).isFile(), `Expected file artifact: ${relativePath}`);
}

function dryRunPackFiles() {
  const output = execFileSync("npm", ["pack", "--dry-run", "--json"], {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  const [pack] = JSON.parse(output);
  return new Set(pack.files.map((file) => file.path));
}

const packageJson = readJson(path.join(root, "package.json"));

assert(packageJson.types === "dist/esm/index.d.ts", "package.json types must point at dist/esm/index.d.ts");
assert(packageJson.main === "dist/cjs/index.js", "package.json main must point at dist/cjs/index.js");
assert(packageJson.module === "dist/esm/index.js", "package.json module must point at dist/esm/index.js");
assert(packageJson.style === "dist/styles/phosphor.css", "package.json style must point at dist/styles/phosphor.css");

const requiredExports = [
  ".",
  "./phosphor.css",
  "./fonts.css",
  "./tokens.css",
  "./typography.css",
  "./global.css",
  "./components.css",
  "./package.json",
];

for (const key of requiredExports) {
  assert(packageJson.exports?.[key], `Missing package export: ${key}`);
}

const requiredFiles = [
  "dist/cjs/index.js",
  "dist/cjs/package.json",
  "dist/esm/index.js",
  "dist/esm/index.d.ts",
  "dist/esm/package.json",
  "dist/styles/phosphor.css",
  "dist/styles/components.css",
  "dist/styles/fonts.css",
  "dist/styles/tokens.css",
  "dist/styles/typography.css",
  "dist/styles/global.css",
];

for (const file of requiredFiles) {
  assertFile(file);
}

assert(readJson(path.join(root, "dist/esm/package.json")).type === "module", "dist/esm must be marked as ESM");
assert(readJson(path.join(root, "dist/cjs/package.json")).type === "commonjs", "dist/cjs must be marked as CommonJS");

const componentsCss = fs.readFileSync(path.join(root, "dist/styles/components.css"), "utf8");
assert(componentsCss.includes(".video-js"), "components.css must include Video.js base styles");
assert(componentsCss.includes("VideoPlayer-module_host"), "components.css must include VideoPlayer module styles");

const typeEntry = fs.readFileSync(path.join(root, "dist/esm/index.d.ts"), "utf8");
assert(typeEntry.includes("export * from './components'"), "dist type entry must export components");
assert(typeEntry.includes("export * from './foundations'"), "dist type entry must export foundations");
assert(typeEntry.includes("export * from './hooks'"), "dist type entry must export hooks");

const packFiles = dryRunPackFiles();
for (const file of requiredFiles) {
  assert(packFiles.has(file), `npm pack is missing ${file}`);
}
assert(packFiles.has("README.md"), "npm pack is missing README.md");
assert(packFiles.has("LICENSE"), "npm pack is missing LICENSE");
assert(![...packFiles].some((file) => file.startsWith("src/")), "npm pack must not include src/");
assert(![...packFiles].some((file) => file.startsWith("types/")), "npm pack must not include stale root types/");

const esm = await import(pathToFileURL(path.join(root, "dist/esm/index.js")).href);
const cjs = require(path.join(root, "dist/cjs/index.js"));

for (const exportName of ["Button", "SiteShell", "VideoPlayer", "phosphorVar", "useHashRoute"]) {
  assert(exportName in esm, `ESM bundle missing export: ${exportName}`);
  assert(exportName in cjs, `CJS bundle missing export: ${exportName}`);
}

console.log("Package smoke test passed.");
