# Public API Inventory

Generated during the `PLAN.md` implementation pass.

## Package Exports

The package now exposes:

- `.` for the compatibility root barrel.
- `./atoms`, `./molecules`, `./organisms`, `./templates`, `./content`, `./admin`, `./video`, `./foundations`, and `./hooks` for group-level subpath imports.
- CSS subpaths: `./phosphor.css`, `./fonts.css`, `./tokens.css`, `./typography.css`, `./global.css`, and `./components.css`.
- `./package.json`.

Each JS subpath maps to matching ESM, CJS, and declaration outputs under `dist/esm/<subpath>/index.*` and `dist/cjs/<subpath>/index.js`.

## Root Exports

`src/index.ts` re-exports `components`, `foundations`, and `hooks`. `src/components/index.ts` keeps the existing public named exports and namespace exports:

- Namespaces: `admin`, `atoms`, `content`, `legacy`, `molecules`, `organisms`, `pages`, `presets`, `templates`.
- Core components: atoms, molecules, organisms, content components, admin editors, page/preset aliases, and layout primitives.

Compatibility note: root exports are intentionally retained for existing consumers. New docs should prefer subpath imports for category-specific usage.

## Deep Import Behavior

Supported public deep imports are group-level only:

```ts
import { Button } from "@sektant1/phosphor-ui/atoms";
import { PostBody } from "@sektant1/phosphor-ui/content";
import { VideoPlayer } from "@sektant1/phosphor-ui/video";
```

Component-file deep imports remain unsupported implementation details.

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

Remaining caveat: root still exposes compatibility names for these features, but their heavy packages are not statically loaded by the root module.

## CSS Output Model

Before this pass, Rollup injected component CSS at runtime with `style-inject`.

Current target:

- Rollup extracts component styles to `dist/styles/components.css`.
- `src/styles/phosphor.css` imports `fonts.css`, `tokens.css`, `typography.css`, `global.css`, and `components.css` in that order.
- `copy-styles` publishes canonical CSS under `dist/styles/` and keeps legacy root-level CSS files for compatibility.

## Build Configuration

Rollup now uses multiple entry points:

- `src/index.ts`
- `src/{admin,atoms,content,foundations,hooks,molecules,organisms,templates,video}/index.ts`

The build emits code-split ESM and CJS directories, with shared chunks under `dist/{esm,cjs}/chunks`.

## Remaining Work

1. Verify `npm run build` and inspect the generated root bundle for static optional imports.
2. Run `npm pack --dry-run` after build validation.
3. Update README examples to document root imports, subpath imports, and CSS imports.
4. Decide whether `video.js/dist/video-js.css` should be vendored into `components.css` or documented as a consumer import for video-specific usage.
