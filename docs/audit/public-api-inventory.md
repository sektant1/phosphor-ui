# Public API Inventory

Generated during the `PLAN.md` implementation pass. Updated after removing category subpath exports.

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
- `video.js` and `video.js/dist/video-js.css` were imported by `VideoPlayer`.

Changes made:

- `PostBody` no longer imports `@mdx-js/react` at module load.
- `bannerSync` no longer statically imports `figlet`; it attempts a runtime CommonJS load only when a banner is generated.
- `VideoPlayer` dynamically imports `video.js` inside its effect and no longer imports `video.js/dist/video-js.css` from JS.
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

## Remaining Work

1. Run `npm pack --dry-run` after build validation.
2. Decide whether `video.js/dist/video-js.css` should be vendored into `components.css` or documented as a consumer import for video-specific usage.
