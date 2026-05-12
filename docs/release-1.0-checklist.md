# Release 1.0 Checklist

Use this before tagging `v1.0.0`.

## Public API

- Public application imports must use the root package:
  `@sektant1/phosphor-ui`.
- Supported CSS entrypoints are `phosphor.css`, `fonts.css`, `tokens.css`,
  `typography.css`, `global.css`, and `components.css`.
- Deep component imports are implementation details and should not be documented
  as supported.
- Breaking changes include removing or renaming root exports, changing exported
  prop names/types, removing semantic `--pho-*` tokens, or changing required CSS
  entrypoints.

## Required Validation

Run:

```bash
npm run validate:package
npm run build-storybook -- --quiet
```

`validate:package` covers TypeScript, public API shape, story source docs, Jest,
library build, and the package smoke test.

Regenerate the checked-in declaration snapshot after public API changes:

```bash
npm run build:types:snapshot
```

## Package Smoke Test

`npm run smoke:package` assumes `npm run build` has already run. It checks:

- `main`, `module`, `types`, `style`, and package exports point to published
  artifacts.
- `npm pack --dry-run` includes `dist`, README, and LICENSE.
- `npm pack --dry-run` excludes `src/` and the stale root `types/` tree.
- ESM and CJS bundles load in Node.
- Representative root exports are present.
- `components.css` contains Video.js base styles for `VideoPlayer`.

## Visual Pass

Before tagging, inspect these Storybook stories on desktop and mobile widths:

- `Organisms/VideoPlayer`
- `Organisms/Header`
- `Templates/SiteShell`
- `Templates/Post`
- `Organisms/CourseCard`
- `Organisms/Search`
- `Organisms/NerdTree`
- `Molecules/Modal`
- `Molecules/DropdownMenu`
- `Molecules/Tabs`

Check keyboard focus, text overflow, control layout, and whether each component
still matches the phosphor visual language.

## Known Non-Blockers

- The Sass legacy JS API deprecation warnings come from the current build tool
  chain. They are noisy but do not block the package build.
- The root `types/` directory is not published. It is a checked-in declaration
  snapshot for review and should be regenerated with `npm run build:types:snapshot`.
