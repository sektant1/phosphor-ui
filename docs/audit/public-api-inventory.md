# Public API Inventory

Generated during the `PLAN.md` implementation pass. Updated during the `1.0`
release-readiness pass.

## Package Exports

The package now exposes:

- `.` for the root barrel.
- CSS subpaths: `./phosphor.css`, `./fonts.css`, `./tokens.css`, `./typography.css`, `./global.css`, and `./components.css`.
- `./package.json`.

Category JS subpaths have been removed.

## Root Exports

`src/index.ts` re-exports `components`, `foundations`, and `hooks`. `src/components/index.ts` keeps the public named exports only.

- Core components: atoms, molecules, organisms, content components, admin editors, page/preset aliases, and layout primitives.

## Deep Import Behavior

Component-file and category subpath imports are unsupported implementation details. Use the root package import.

## Optional/Heavy Dependency Behavior

Confirmed source imports before this pass:

- `@mdx-js/react` was imported by `src/components/content/MdxComponents/MdxComponents.tsx`.
- `figlet` was imported by `src/ascii.ts`, which is used by `Header`.
- `shiki` is dynamically imported by `CodeBlock`; type-only imports are erased.
- `video.js` is dynamically imported by `VideoPlayer`.
- `video.js/dist/video-js.css` is imported by `VideoPlayer` and extracted into
  `components.css` at build time, so consumers using `phosphor.css` receive the
  base player controls automatically.

Changes made:

- `PostBody` no longer imports `@mdx-js/react` at module load.
- `bannerSync` no longer statically imports `figlet`; it attempts a runtime CommonJS load only when a banner is generated.
- `VideoPlayer` dynamically imports `video.js` inside its effect and statically
  imports `video.js/dist/video-js.css` for style extraction.
- `CodeBlock` already uses dynamic `import("shiki")` for highlighting.

## CSS Output Model

Before this pass, Rollup injected component CSS at runtime with `style-inject`.

Current target:

- Rollup extracts component styles to `dist/styles/components.css`.
- `src/styles/phosphor.css` imports `fonts.css`, `tokens.css`, `typography.css`, `global.css`, and `components.css` in that order.
- `copy-styles` publishes canonical CSS under `dist/styles/`.

## Build Configuration

Rollup now uses one JS entry point:

- `src/index.ts`

The build emits code-split ESM and CJS directories, with shared chunks under `dist/{esm,cjs}/chunks`.

## Release Smoke Coverage

`npm run smoke:package` validates the built package contract after `npm run build`:

1. `package.json` points `main`, `module`, `types`, and `style` at `dist`.
2. Root and CSS subpath exports exist.
3. `npm pack --dry-run --json` includes the expected `dist` files, README, and
   license.
4. The tarball file list excludes `src/` and the stale root `types/` tree.
5. `components.css` includes both Video.js base styles and the VideoPlayer module
   styles.
6. The generated ESM and CJS bundles load and expose representative exports.

`npm run audit:public-api` validates the source/package contract before build:

1. The package exports only the supported root, CSS, and `package.json` subpaths.
2. `main`, `module`, `types`, and `style` point at `dist`.
3. The checked-in `types/components` snapshot follows the generated source
   folder shape and contains no stale flattened component directories.
4. `src/index.ts` and `types/index.d.ts` expose the same root barrels.

## Remaining Work

1. Run a visual Storybook pass on the public organisms before tagging `1.0.0`.
2. Keep the root `types/` directory regenerated with
   `npm run build:types:snapshot` after any public API change.
