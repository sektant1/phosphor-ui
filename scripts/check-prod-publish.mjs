import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const zeroSha = /^0+$/;

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: options.stdio ?? "inherit",
    encoding: "utf8",
    env: {
      ...process.env,
      ...options.env,
    },
  });

  if (result.status !== 0) {
    const label = [command, ...args].join(" ");
    throw new Error(`${label} failed`);
  }

  return result;
}

function readStdin() {
  try {
    return fs.readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

function pushTargetsProd(stdin) {
  if (process.argv.includes("--force-prod")) {
    return true;
  }

  return stdin
    .trim()
    .split("\n")
    .filter(Boolean)
    .some((line) => {
      const [localRef, localSha, remoteRef] = line.trim().split(/\s+/);
      if (!localRef || !localSha || zeroSha.test(localSha)) {
        return false;
      }

      return localRef === "refs/heads/prod" || remoteRef === "refs/heads/prod";
    });
}

function nextPatchVersion(version) {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)(?:-.+)?$/);
  if (!match) {
    throw new Error(`Cannot calculate next prod version from ${version}`);
  }

  const major = Number(match[1]);
  const minor = Number(match[2]);
  const patch = Number(match[3]);
  const isPrerelease = version.includes("-");

  return `${major}.${minor}.${isPrerelease ? patch : patch + 1}`;
}

function assertVersionAvailable(packageName, version, registry) {
  const result = spawnSync(
    "npm",
    ["view", `${packageName}@${version}`, "version", "--registry", registry],
    {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  if (result.status === 0) {
    throw new Error(`${packageName}@${version} already exists on npm`);
  }

  const output = `${result.stdout}\n${result.stderr}`;
  if (!output.includes("E404")) {
    throw new Error(`Could not verify npm availability for ${packageName}@${version}`);
  }
}

const stdin = readStdin();
if (!pushTargetsProd(stdin)) {
  console.log("No prod branch push detected; skipping npm publish preflight.");
  process.exit(0);
}

const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const registry = packageJson.publishConfig?.registry ?? "https://registry.npmjs.org/";
const prodVersion = nextPatchVersion(packageJson.version);

console.log(`Running prod npm publish preflight for ${packageJson.name}@${prodVersion}.`);

assertVersionAvailable(packageJson.name, prodVersion, registry);
run("npm", ["run", "validate:package"]);
run("npm", ["publish", "--dry-run", "--access", "public", "--tag", "latest", "--ignore-scripts"]);

console.log("Prod npm publish preflight passed.");
