# DX Audit

## Executive Summary

Short answer: the library is usable and visually distinctive, but it is not yet easy enough for a developer to build the intended websites/apps professionally without reading source or writing too much custom CSS.

The strongest parts are the clear package-level import model, the memorable CRT/phosphor visual identity, the broad component set, and the fact that Storybook examples generally use root imports from `phosphor-ui`. The weak parts are API sprawl, incomplete layout primitives, mixed legacy/current token documentation, under-documented global CSS effects, and uneven accessibility contracts in custom interactive components.

Existing checks are in good shape: `npm run audit:public-api`, `npm run audit:story-sources`, `npm run typecheck`, and `npm test -- --runInBand` all pass. This is a DX maturity problem more than a basic package correctness problem.

## Main DX Problems

1. The root public API is too crowded. `src/components/index.ts` exports low-level controls, layout helpers, content components, MDX helpers, admin editors, app shells, presets, Video.js integration, and aliases from one namespace. Root imports are clean, but the consumer has to infer what is stable core API versus an opinionated preset.

2. The package previously depended on itself. `package.json` listed `"phosphor-ui": "^0.3.39"` under `dependencies` while the package name is also `phosphor-ui`. This was a real DX smell because it could confuse lockfiles, bundlers, and consumers trying to understand runtime dependencies.

3. Layout coverage is promising but incomplete. `Container`, `Stack`, `Cluster`, `Flex`, `Grid`, `Row`, and `Column` exist in `src/components/templates/Layout/Layout.tsx`, but a developer still lacks obvious primitives for common page composition: app shells, sections, panels, split panes, sidebars, content frames, and responsive wiki/blog/admin page layouts.

4. Page shells are useful but not clearly layered. `SiteShell`, `MainframeLayout`, and `AdminShell` help with real app shapes, but their intended relationship is unclear: core primitive, preset, template, or example. `MainframeLayout` supports left/right panels but is generic enough that consumers still need examples to use it confidently.

5. Token docs send mixed signals. `README.md` says `--pho-*` semantic tokens are the stable API, but `src/stories/Tokens.stories.tsx` and `src/stories/Introduction.stories.tsx` still prominently teach legacy variables such as `--phosphor`, `--magenta`, `--bg`, and `--ink`.

6. Global CSS is powerful but under-explained. `phosphor-ui/phosphor.css` imports fonts, tokens, typography, global defaults, and component CSS. It also affects body styling, cursors, scrollbars, selection, global element typography, and CRT/effect utility classes. Consumers need a clearer import matrix and opt-in/opt-out guidance.

7. Storybook is broad but not always consumer-grade. Many stories have explicit source snippets and root imports, which is good. However, composed examples still use inline layout CSS for common grids/flex rows, which undermines the promise that the library can build pages without custom layout CSS.

8. Accessibility behavior is uneven. Many components use semantic HTML, focus styles, labels, and ARIA attributes. The risky areas are custom interactions: `NerdTree`, `DropdownMenu`, `Select`, `Tabs`, `Modal`/`Drawer`, and `Toast` need documented keyboard/focus/screen-reader behavior and likely stricter tests.

9. Admin/CMS APIs are product-shaped. `AdminShell`, `ContentEditor`, `NoteEditor`, `ProjectEditor`, `CourseEditor`, and `LessonEditor` are valuable for the intended admin CMS dashboard use case, but they should be documented as presets/recipes, not the same API layer as `Button`, `Stack`, or `Prose`.

## Missing Primitives

Layout primitives:

- `Inline`: horizontal inline layout with wrapping, alignment, and tokenized gap.
- `Section`: semantic page section with spacing, optional header/action slots, and constrained width.
- `Panel`: reusable framed surface with tone, density, header/footer slots, and consistent border/glow behavior.
- `ContentFrame`: readable content wrapper for prose, MDX, listings, and project pages.
- `SidebarLayout`: documented left-nav/main/right-rail composition for wiki/docs/blog layouts.
- `AppShell`: top-level app chrome with header/sidebar/main/footer slots.
- `PageShell`: simpler page wrapper for title, description, actions, and content.
- `SplitPane`: resizable or fixed two-pane composition for editors/admin screens.
- Responsive two-column and three-column layout presets for blog, wiki/docs, portfolio, course, and dashboard pages.

Typography/content primitives:

- A clearer public split between `Text`, heading components, `Prose`, post/page headers, and MDX defaults.
- Content density presets for readable blog/wiki pages versus dense terminal/admin pages.
- Copy-paste examples for post lists, project grids, dashboard cards, editor forms, and course modules using only exported primitives.

State primitives:

- `Skeleton` or `LoadingBlock`.
- Reusable `ErrorState`.
- Stronger `EmptyState` patterns for lists, search, tables, dashboards, and editors.
- Consistent selected/current/active/pressed state conventions across nav, rows, tabs, buttons, and cards.

Animation/effect primitives:

- Public effect utilities for scanlines, CRT frame, noise, vignette, flicker, terminal cursor, HUD pulse, and glitch/hsync.
- A documented way to enable/disable decorative effects per surface and globally.
- Theme/effect presets for readable blog, terminal, CRT, Pip-Boy, and admin interfaces.

Utility primitives:

- Public token helpers beyond `phosphorVar`, or docs that explain when to use CSS vars directly.
- Optional export of `cx` if class merging is intended to be part of consumer composition.
- Public constants for effect class names if classes like `.pho-crt`, `.pho-scanlines`, and `.pho-fade-up` are stable.

## Component API Issues

`Button`:

- Good: predictable `variant`, `size`, `loading`, `pressed`, `fullWidth`, anchor/button behavior, safe external `rel`.
- Issue: `pressed` exists but `aria-pressed` is not automatically set. Consumers must know to add ARIA when using toggle buttons.
- Issue: `loading` disables real buttons but anchor buttons rely on `aria-busy` and do not expose a consistent loading label pattern.

`Input`, `Textarea`, `Select`, `Checkbox`, `Field`, `Form`:

- Good: labels, help text, error text, `onValueChange`, `aria-describedby`, and control/field splits are useful.
- Issue: there are several overlapping field abstractions: `InputField`, `TextareaField`, `SelectField`, `FormField`, and `Field`. Consumers may not know which one is preferred.
- Issue: `FieldState` is internal to input-like components and not exported as a common state vocabulary.
- Issue: `Form` config is convenient for quick admin forms but too limited for complex forms unless consumers drop to custom rendering.

`DropdownMenu`:

- Good: supports disabled/destructive items, anchors, buttons, selected values, listbox/menu roles, and arrow navigation inside the menu.
- Issue: custom ARIA menu/listbox behavior needs a stricter audit. It lacks a documented focus contract, typeahead, and full expected menu keyboard behavior.
- Issue: menu rendering is local, not portaled, so clipping/stacking in panels may surprise consumers.

`Select`:

- Good: wraps a native select plus custom dropdown UI, preserving form behavior.
- Issue: the native select is `tabIndex={-1}` and interaction is through a custom dropdown, so accessibility expectations need explicit validation and docs.
- Issue: `prompt` can be boolean or node, which is flexible but less predictable than a clearer label/placeholder model.

`Tabs`:

- Good: controlled/uncontrolled API, disabled tabs, lazy panels, horizontal/vertical orientation.
- Issue: keyboard support handles arrow movement but not Home/End. Activation behavior is automatic and should be documented.
- Issue: no `as` or render hooks for tab buttons/panels.

`NerdTree`:

- Good: strong domain fit for wiki/docs/navigation and mobile drawer behavior.
- Issue: it uses `role="tree"` and `role="treeitem"` but does not implement full tree keyboard navigation. This is a high-priority accessibility DX problem because the semantics imply more behavior than exists.
- Issue: `title` defaults to `"~/sektant's hideout"`, which is too project-specific for a library default.
- Issue: active/current state is named `active`; docs should clarify whether it maps to current page, selected item, or both.

`Modal` and `Drawer`:

- Good: portals to `document.body`, locks body scroll, Escape and overlay dismissal are configurable, uses `role="dialog"` and `aria-modal`.
- Issue: no visible focus trap or initial focus management. This is a major accessibility gap for real apps.
- Issue: `onClose` has no close reason, so consumers cannot distinguish Escape, overlay click, and close button.

`Toast`:

- Good: simple `useToast` hook and variants.
- Issue: `role="status"` is used for all variants, including errors. Error toasts may need `role="alert"` or configurable politeness.
- Issue: no position/stack/toaster provider API, so consumers must build their own notification region for real apps.

`SiteShell`:

- Good: practical personal-site default with skip link, header, main content, footer, and optional CRT shell.
- Issue: `title` is required and drives header/footer defaults. Consumers with custom app chrome need clearer escape hatches and examples.
- Issue: `crt` defaults to true, which is visually on-brand but may be too heavy as a default for readable blogs/wikis unless docs make the choice explicit.

`MainframeLayout`:

- Good: covers left panel, main content, right context panel, sticky panels, and post/wiki/course/admin/project variants.
- Issue: variant names are useful but undocumented as layout contracts.
- Issue: `leftPanel` and `rightPanel` are flexible slots, but consumers still need named recipes for wiki/docs, blog with TOC, course, project, and admin layouts.

`AdminShell` and editor components:

- Good: strong starting point for admin CMS dashboards and content editing.
- Issue: copy such as `right rail`, `cms control`, and defaults like `// admin` are highly opinionated.
- Issue: `ContentEditor` field specs are useful for demos/simple CMS work but not a general form system. Treat these as presets.

`CodeBlock`:

- Good: supports Shiki highlighting, SSR/SSG pre-rendered HTML, copy button, language/filename labels, and fallback rendering.
- Issue: client-side Shiki import is heavy. Docs should recommend pre-rendered `html` for SSG/MDX-heavy apps.

`VideoPlayer`:

- Good: useful media component with Video.js.
- Issue: Video.js is a significant dependency and should be clearly documented as part of the root package cost. Consider whether this belongs in core exports or an optional/preset area.

## Documentation Issues

- `README.md` is stronger than typical early library docs, but it needs a clearer "required CSS imports" matrix:
  - full default app setup,
  - token-only setup,
  - component-only setup,
  - when fonts/global styles/cursors/scrollbars/effects are included.
- Peer dependencies are listed, but runtime dependencies and optional-heavy features are not explained. `shiki`, `figlet`, and `video.js` matter for bundle/runtime expectations.
- The stable import model is clear, but API layering is not. Docs should distinguish:
  - core primitives,
  - content components,
  - themed surfaces,
  - layout shells,
  - admin presets,
  - utilities/hooks.
- Storybook `Introduction` and `Tokens` docs should use `--pho-*` first and mark raw vars as legacy compatibility.
- Composed examples should stop using inline CSS for common page layout. For example, `src/stories/ComposedExamples.stories.tsx` defines local `pageFrame` and `grid` styles where `Container`, `Stack`, `Grid`, or future `PageShell`/`Panel` should be used.
- Need real consuming-app recipes:
  - blog index and post page,
  - wiki/docs page with `NerdTree` and `TableOfContents`,
  - portfolio/project grid,
  - course landing and lesson page,
  - admin dashboard and editor page,
  - CRT/Pip-Boy interface with effects toggled.
- Need do/don't guidance:
  - when to use `SiteShell` versus `MainframeLayout`,
  - when admin editors are appropriate,
  - how to theme without breaking contrast/readability,
  - how to disable decorative effects for accessible/readable sites.
- Props documentation exists through TypeScript/Storybook, but many components need behavioral docs for keyboard interaction, controlled/uncontrolled mode, accessibility expectations, and common composition patterns.

## Bloat / Refactor Candidates

- Keep the package self-dependency removed from `package.json` and `package-lock.json`.
- Split public API docs into layers rather than presenting the root export as a flat list.
- Treat `AdminShell`, `ContentEditor`, `NoteEditor`, `ProjectEditor`, `CourseEditor`, and `LessonEditor` as presets/recipes. Keep them exported if useful, but do not present them as core primitives.
- Consider moving `VideoPlayer` to an optional/media preset area or documenting its dependency cost clearly.
- Consolidate field abstractions. There are multiple ways to create labeled controls: `InputField`, `TextareaField`, `SelectField`, `Field`, `FormField`, and `Form`. Pick a recommended path and label the others as lower-level escape hatches.
- Revisit compatibility stories such as `src/components/molecules/HeaderNav/BootNav.compat.stories.tsx`. If compatibility exists only for old demos, mark it as legacy or remove it from prominent docs.
- Reconsider project-specific defaults:
  - `NerdTree` default title `"~/sektant's hideout"`,
  - admin labels like `right rail` and `cms control`,
  - footer/header demo prompts that mention the project rather than consumer-neutral defaults.
- Separate CSS concerns more clearly:
  - semantic tokens,
  - global resets/defaults,
  - component CSS,
  - decorative effects,
  - fonts.

## Recommended Design System API

CSS imports:

```ts
import "phosphor-ui/phosphor.css";
```

Use this for the full default theme. Document that it includes fonts, tokens, typography, globals, component styles, cursors, scrollbars, and effect utilities.

```ts
import "phosphor-ui/tokens.css";
import "phosphor-ui/fonts.css";
import "phosphor-ui/typography.css";
import "phosphor-ui/global.css";
import "phosphor-ui/components.css";
```

Use these for advanced control. Document exactly which imports are required for components to render correctly.

Core layout:

```ts
import {
  AppShell,
  Cluster,
  Container,
  ContentFrame,
  Grid,
  Inline,
  PageShell,
  Panel,
  Section,
  SidebarLayout,
  SplitPane,
  Stack,
} from "phosphor-ui";
```

Current exports already cover `Container`, `Stack`, `Cluster`, `Flex`, `Grid`, `Row`, and `Column`; add the missing primitives above and make examples use them.

Core controls:

```ts
import {
  Button,
  Checkbox,
  Drawer,
  DropdownMenu,
  Input,
  Modal,
  Select,
  Tabs,
  Textarea,
  Toast,
  Tooltip,
} from "phosphor-ui";
```

Content and navigation:

```ts
import {
  ArticleList,
  Breadcrumbs,
  CodeBlock,
  NerdTree,
  Pagination,
  Post,
  PostHeader,
  PostListing,
  Prose,
  TableOfContents,
} from "phosphor-ui";
```

Themed surfaces:

```ts
import {
  AsciiBanner,
  CrtShell,
  HeroFrame,
  PdaWindow,
} from "phosphor-ui";
```

Presets:

```ts
import {
  AdminShell,
  ContentEditor,
  CourseEditor,
  CourseLayout,
  LessonEditor,
  MainframeLayout,
  NoteEditor,
  PostLayout,
  ProjectEditor,
  SiteShell,
  WikiLayout,
} from "phosphor-ui";
```

Tokens and utilities:

```ts
import {
  PHOSPHOR_CSS_ENTRYPOINTS,
  PHOSPHOR_TOKEN_GROUPS,
  PHOSPHOR_TOKENS,
  phosphorVar,
  useHashRoute,
  useReadingProgress,
} from "phosphor-ui";
```

Public token policy:

- `--pho-*` tokens are the stable consumer API.
- Raw variables such as `--phosphor`, `--magenta`, `--bg`, and `--ink` are compatibility aliases only.
- Add or document semantic state tokens for hover, focus, active, selected, disabled, loading, error, warning, success, empty, and skeleton states.
- Add or document semantic effect tokens/classes for CRT, scanlines, noise, vignette, flicker, cursor blink, and HUD pulse.

## Priority Plan

P0: must fix now

- Keep the package self-dependency removed from `package.json` and `package-lock.json`.
- Clarify CSS imports in README and Storybook: full import, granular imports, required component CSS, and global side effects.
- Update `Introduction` and `Tokens` docs to lead with `--pho-*` semantic tokens.
- Document API layers: core primitives, content, themed surfaces, shells, admin presets, hooks/utilities.
- Add accessibility documentation/issues for `NerdTree`, `DropdownMenu`, `Select`, `Tabs`, `Modal`/`Drawer`, and `Toast`.
- Add real page recipes for blog, wiki/docs, portfolio, course, and admin that use root imports only.

P1: important

- Add missing layout primitives: `Inline`, `Section`, `Panel`, `ContentFrame`, `SidebarLayout`, `PageShell`, `AppShell`, and `SplitPane`.
- Rewrite composed examples to avoid inline layout CSS where library primitives should solve the layout.
- Normalize prop vocabulary across components: `variant`, `size`, `tone`, `density`, `state`, `onValueChange`, `disabled`, `loading`, `className`.
- Normalize state support across buttons, links, rows, cards, nav, forms, tabs, empty states, and search results.
- Add focus-management tests and/or implementation improvements for modal/drawer and custom menu/select behavior.
- Add a clear recommendation for MDX/code-heavy apps to use pre-rendered `CodeBlock` HTML where possible.

P2: nice to have

- Add theme presets for readable blog/wiki, terminal, CRT, Pip-Boy, and admin.
- Add reusable animation/effect components or utilities with reduced-motion behavior documented.
- Add `Skeleton`/loading primitives.
- Add a toaster/provider API for stacked notifications.
- Decide whether `VideoPlayer` remains core or moves to a documented optional/media preset.
- Deprecate or hide duplicate/compatibility stories and project-specific defaults from primary docs.

## Acceptance Criteria

- A developer can build a blog layout without custom layout CSS.
- A developer can build a wiki/docs layout with left nav and right TOC.
- A developer can build a portfolio/project listing page.
- A developer can build a course platform landing page and lesson page.
- A developer can build an admin dashboard page.
- A developer can build forms/admin pages with consistent fields, errors, disabled states, and actions.
- A developer can align content using provided layout primitives.
- A developer can use consistent buttons, cards, forms, states, colors, and animations.
- A developer can theme the site without editing library source.
- A developer can enable/disable CRT, scanline, noise, vignette, flicker, and cursor effects without guessing.
- Storybook examples show real client usage through root imports and copy-paste-ready code.
- The public API is clear, minimal, and stable enough to understand without browsing `src/components/index.ts`.
- No major duplicate or bloated components remain unexplained.
- Accessibility expectations are documented for all custom interactive components.
