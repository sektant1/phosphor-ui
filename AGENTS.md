# AGENTS.md

## Purpose

This repository is `phosphor-ui`, a React design-system and component library for phosphor green / amber CRT terminal interfaces. Agents working here must preserve the public library contract, visual identity, Storybook coverage, type safety, and package build behavior.

Use this file as the first source of operational rules before editing code.

## Product identity

`phosphor-ui` is not a generic SaaS component kit. It is an opinionated UI library for personal wikis, blogs, digital gardens, project logs, course pages, admin dashboards, and terminal-like content systems.

The expected visual language is:

- 80s hacker terminal
- phosphor green / amber CRT
- S.T.A.L.K.E.R. / Tarkov PDA mood
- military terminal / field console
- monospaced, sharp, rectangular, information-dense UI
- subtle scanline, glow, CRT, cursor, and terminal effects
- readable first, aesthetic second

Do not soften the system into rounded, generic, high-padding SaaS UI. Keep the square, tactical, terminal-like design unless the user explicitly asks otherwise.

## Repository role

This repo owns the reusable package. It must not depend on a specific consumer app such as `sektant1.github.io`.

When adding or changing features:

- Prefer reusable primitives, atoms, molecules, organisms, templates, and page-level examples.
- Keep app-specific content, routing, CMS logic, and domain data out of the library.
- Export stable components from the package root when they are public.
- Avoid deep import requirements for consumers.
- Keep backward compatibility when reasonable.
- If replacing or merging components, provide a migration path or legacy wrapper unless removal is explicitly requested.

## Public API rules

Consumers should be able to import from the root package:

```tsx
import { Button, H1, SiteShell } from "phosphor-ui";
```

Do not require consumers to import from `src`, `dist`, or internal component directories.

Public stylesheet entry points are package exports. Keep them stable:

```tsx
import "phosphor-ui/phosphor.css";
```

Important CSS subpaths include:

- `phosphor-ui/phosphor.css`
- `phosphor-ui/fonts.css`
- `phosphor-ui/tokens.css`
- `phosphor-ui/typography.css`
- `phosphor-ui/global.css`
- `phosphor-ui/components.css`

If adding public components, update exports, types, docs, stories, and usage examples together.

## Design token policy

Use and extend tokens before hardcoding values.

Preferred token families:

- `--pho-color-*`
- `--pho-font-*`
- `--pho-space-*`
- `--pho-border-*`
- `--pho-glow-*`
- `--pho-layout-*`
- `--pho-type-*`
- `--pho-motion-*`
- `--pho-z-*`

Legacy tokens such as `--phosphor`, `--phosphor-dim`, `--bg`, and `--ink` may exist internally, but public-facing component CSS should prefer semantic `--pho-*` tokens when possible.

Hardcoded colors are allowed only when defining tokens or implementing a one-off visual effect that cannot be expressed by current tokens. In that case, consider adding a token instead.

## Component architecture

Follow atomic-design intent without forcing unnecessary ceremony.

Preferred grouping:

- Atoms: text, heading, icon, badge, tag, button, input, primitive visual parts.
- Molecules: composed controls, rows, cards, nav items, feature list items.
- Organisms: post listings, nerdtree navigation, header, footer, admin panels, content sidebars.
- Templates/layouts: site shell, mainframe layout, post layout, admin shell.
- Examples/pages: Storybook-only compositions showing realistic consumer usage.

Avoid duplicated layout components that solve the same problem. If two components overlap, either consolidate them or document their distinct purpose.

## Styling rules

- Prefer existing component styling patterns.
- Keep long body text readable; do not apply heavy glow to paragraphs.
- Use glow for headings, selected states, HUD marks, buttons, badges, and hero elements.
- Keep radii square unless an existing component family intentionally differs.
- Prefer subtle animation. Avoid constant high-intensity flicker.
- Respect reduced-motion where the existing pattern supports it.
- Avoid global overrides that unexpectedly affect consumer apps.
- Component styles must not assume a specific app container width unless the component is explicitly a layout component.

## Storybook and docs rules

Every public component should have Storybook coverage that shows real client usage.

Stories should:

- Render the component as a consumer would use it.
- Show realistic props and children.
- Avoid JSON dumps as the primary “show code” output.
- Avoid examples that depend on private app-only files.
- Include variants when they are part of the public API.
- Prefer compact, copyable React examples.

If a component is deprecated, mark it clearly in docs and point to the replacement.

## Accessibility rules

Do not sacrifice accessibility for the terminal aesthetic.

Required baseline:

- Buttons use real `<button>` unless navigation requires `<a>`.
- Links use real anchors when they navigate.
- Form fields have labels or accessible names.
- Interactive elements have visible focus states.
- Do not remove outlines without replacing them.
- Respect keyboard navigation.
- Preserve text contrast.
- Avoid unreadable glow on dense text.

## TypeScript rules

- Keep public props explicit and exported where useful.
- Prefer React types that match the rendered element.
- Avoid broad `any` unless wrapping unknown external data.
- Preserve declaration generation.
- Do not introduce app-specific route types or Next.js-only assumptions into core components unless the component is explicitly integration-specific.

## Build and validation

Use the scripts from `package.json`.

Preferred checks before finishing substantial changes:

```bash
npm run typecheck
npm test -- --runInBand
npm run build-storybook -- --quiet
npm run build
```

For package/public API changes, prefer:

```bash
npm run validate:package
```

For story source changes, run:

```bash
npm run audit:story-sources
```

Do not claim checks passed unless you actually ran them.

## Release and package safety

This library publishes to npm. Treat public API changes carefully.

Before changing exports, package fields, build scripts, peer dependencies, or style exports:

- Check consumer impact.
- Keep React peer dependency compatibility unless explicitly changing it.
- Confirm `dist` build output is still generated.
- Confirm CSS files are copied into `dist/styles`.
- Avoid breaking `phosphor-ui/phosphor.css`.

## Relationship to consumer apps

The main known consumer is `sektant1/sektant1.github.io`, the personal blog / hideout app.

When implementing features requested for that app, decide whether the change belongs here or in the consumer:

Put it in `phosphor-ui` if it is reusable, token-level, layout-level, or part of the design system.

Put it in the consumer app if it is route-specific, content-specific, CMS-specific, SEO-specific, deployment-specific, or tied to local files.

Do not patch the consumer app by adding one-off hacks to this library.

## Agent workflow

Before editing:

1. Inspect the relevant component, style, story, and export files.
2. Identify whether the change is public API, internal implementation, or docs-only.
3. Preserve existing naming and folder conventions unless the task is explicitly a refactor.
4. Make the smallest coherent change that solves the request.

After editing:

1. Update stories/docs when public behavior changes.
2. Update exports when adding public components.
3. Run the relevant checks when possible.
4. Summarize what changed and what was not verified.
