# React Atomic Design System Audit & Refactor Plan

Repository/package audited: `@sektant1/phosphor-ui@0.3.29` from `/mnt/data/sektant1-phosphor-ui-0.3.29.tgz`.

Audit inputs actually inspected:

- `package/package.json`
- `package/README.md`
- `package/dist/esm/index.d.ts`
- `package/dist/esm/components/**/*.d.ts`
- `package/dist/esm/index.js`
- `package/dist/esm/index.js.map`
- `package/dist/fonts.css`
- `package/dist/tokens.css`
- `package/dist/typography.css`
- `package/dist/global.css`
- `package/dist/phosphor.css`
- CSS module chunks injected into `dist/esm/index.js` via `style-inject`

Limitations:

- The published package does not include original `src/**/*.tsx`, `.storybook/*`, story files, tests, `rollup.config.mjs`, `tsconfig*.json`, or `scripts/audit-story-sources.mjs`.
- `dist/esm/index.js.map` exposes original source paths, but almost all `sourcesContent` entries are `null`. Therefore this plan references real source paths from sourcemap/declarations and validates behavior from declarations, package metadata, README, compiled CSS, and bundle structure.
- `package.json` points to `https://github.com/sektant1/phosphor.git`, but that repository was not accessible through the available GitHub connector during this audit. Treat the repo metadata as suspect until verified.

## 1. Executive Summary

The library already has the right visual DNA: phosphor green, CRT overlays, terminal typography, dense technical UI, ASCII support, post/course/admin primitives, and a reasonable first-pass Atomic Design naming layer. The problem is that the architecture is only partially atomic. Several components are placed in atomic folders while carrying molecule/template responsibilities; the public API is a single root barrel that likely pulls the entire library; component CSS is injected by JavaScript instead of shipped as inspectable/static CSS; optional/heavy dependencies are imported from the root bundle; and layout/page/preset concepts are blurred.

The biggest architectural problems are:

1. Public API and bundling are too coarse. `dist/esm/index.js` imports React, ReactDOM, `@mdx-js/react`, `figlet`, `video.js`, and injects every component CSS chunk from the root bundle. A consumer importing only `Button` from the package root still touches the whole compiled surface unless a bundler fully tree-shakes the root bundle.
2. `@mdx-js/react` is marked optional in `peerDependenciesMeta`, but the root bundle imports `MDXProvider` unconditionally. That can break consumers that do not install the optional peer.
3. `video.js` and `video.js/dist/video-js.css` are coupled to the root export surface through `VideoPlayer`, even though most blog/wiki/admin consumers do not need video playback.
4. `dist/phosphor.css` only imports `fonts.css`, `tokens.css`, `typography.css`, and `global.css`; component styles are not present there. Component styles are injected at runtime by JS. This makes SSR, visual inspection, code splitting, CSP, and deterministic styling worse.
5. Atomic Design boundaries are inconsistent. Examples: `Input`, `Select`, `Checkbox`, and `Switch` are stored as atoms but include labels/help/error wrappers; `Post` is under `pages` but behaves like a template; `AdminShell` is under `admin` but behaves like an application template; `CourseCard`, `PostListing`, `Search`, `RelatedPosts`, and `ArticleList` overlap as content list/card organisms.
6. Styling is tokenized in many places, but compiled component CSS still contains many hardcoded values. The audit found 43 unique hex values, 152 unique `rgb/rgba()` values, 76 unique `px` values, 98 unique `rem` values, and 13 distinct media-query breakpoints across package CSS and injected component CSS. Some values are justified; many should be tokens.
7. Storybook cannot be fully audited from the published package because story files are missing. Package scripts show Storybook 10.3.6 and an `audit:story-sources` script, but the deliverable must audit the actual source repo stories before changing docs.
8. Accessibility is partially considered: there are ARIA attributes, `role="dialog"`, `role="tablist"`, `role="progressbar"`, `role="switch"`, `role="menu"`, `role="tooltip"`, skip link support, and reduced motion rules. The compiled bundle contains no evidence of focus trapping for modal/drawer (`trap`, `activeElement`, `querySelectorAll`, and `inert` are absent), so overlays and menus need a focused a11y pass.

Target outcome: keep the current identity, but turn the library into a modular design system with stable root exports, subpath exports, static CSS output, clearer atoms/molecules/organisms/templates, complete Storybook docs, and safer accessibility defaults.

## 2. Target Architecture

Proposed source structure:

```txt
src/
  index.ts
  components/
    atoms/
      Avatar/
      Badge/
      Button/
      CheckboxControl/
      ControlLabel/
      FieldMessage/
      Glyph/
      Heading/
      Hr/
      InputControl/
      Kbd/
      Link/
      ProgressBar/
      ReadingRail/
      SelectControl/
      Separator/
      Spinner/
      StatPill/
      Surface/
      SwitchControl/
      Tag/
      Text/
      TerminalPrompt/
      TextareaControl/
    molecules/
      AuthorBlock/
      Breadcrumbs/
      Callout/
      CardHeader/
      CheckboxField/
      CommandRow/
      DropdownMenu/
      EmptyState/
      Field/
      FormActions/
      FormField/
      InputField/
      LessonRow/
      List/
      LocaleSwitch/
      Modal/
      Pagination/
      PostFrontmatter/
      PostMeta/
      SearchBox/
      SearchResult/
      SelectField/
      ShareBar/
      StatusBadge/
      Stepper/
      SwitchField/
      TableOfContents/
      Tabs/
      TagGroup/
      Timeline/
      Toast/
      Tooltip/
    organisms/
      AdminPanel/
      ArticleList/
      AsciiBanner/
      ContentEditor/
      CourseCard/
      CourseModuleAccordion/
      CrtFrame/
      Exercise/
      Footer/
      Header/
      HeaderNav/
      HeroFrame/
      LoginForm/
      NerdTree/
      PdaWindow/
      PostCard/
      PostHeader/
      PostListing/
      RelatedPosts/
      SearchPanel/
      SeriesNav/
      TerminalWindow/
      VideoPlayer/
    templates/
      AdminDashboardTemplate/
      AdminEditTemplate/
      BlogIndexTemplate/
      CourseLandingTemplate/
      LayoutPrimitives/
      PostTemplate/
      SiteShell/
      WikiPageTemplate/
    pages/
      examples/
        BlogIndexExample.tsx
        PostExample.tsx
        WikiPageExample.tsx
        CourseLandingExample.tsx
        AdminDashboardExample.tsx
  content/
    CodeBlock/
    MdxComponents/
    PostBody/
    Prose/
  foundations/
    animation/
    effects/
    glyphs/
    mdx/
    syntax/
    tokens/
    typography/
    utils/
  styles/
    fonts.css
    tokens.css
    typography.css
    global.css
    components.css
    phosphor.css
    themes/
      terminal.css
      high-contrast.css
      reduced-effects.css
    utilities/
      motion.css
      effects.css
      layout.css
  stories/
    atoms/
    molecules/
    organisms/
    templates/
    pages/
    docs/
  internal/
    a11y/
    composeRefs.ts
    ids.ts
    polymorphic.ts
    useControllableState.ts
    useEscapeKey.ts
    useFocusTrap.ts
    useScrollLock.ts
  hooks/
    useHashRoute.ts
    useReadingProgress.ts
  utils/
    browser.ts
    classNames.ts
```

Folder rules:

- `components/atoms`: visual or semantic primitives only. They may expose native HTML props and refs. They must not own page layout, fetched data, content-specific business rules, or complex child composition. `InputControl` is an atom; an input with label/error/help is a molecule.
- `components/molecules`: small composed components made from atoms. They can own local state if the state is directly part of the UI primitive: tabs selected value, menu open state, tooltip visibility, field validation display, tag group removal.
- `components/organisms`: larger reusable sections composed from atoms/molecules: cards, post lists, headers, sidebars, search panels, editors, login forms.
- `components/templates`: structural layouts that decide regions, columns, max-widths, sticky sidebars, admin shell layout, blog/wiki/course page scaffolds. Templates do not know app routing or fetch data.
- `components/pages/examples`: examples only. No public production component should live here. The current `src/components/pages/Post/Post.tsx` should move to templates.
- `content`: MDX/prose/code-specific content rendering. These are not generic UI atoms because they carry document semantics.
- `foundations`: token metadata, animation names, effect class names, typography variant maps, syntax themes, slug utilities.
- `styles`: all global/static CSS. `phosphor.css` should import tokens/global/typography/component CSS. Avoid JS runtime style injection for the published package.
- `stories`: Storybook source. Stories must be grouped by Atomic Design category.
- `internal`: non-public implementation utilities.
- `hooks`: public hooks only if stable and documented.
- `utils`: public utilities only if stable. Internal utilities should move to `internal`.

Package output target:

```txt
dist/
  esm/
    index.js
    atoms/index.js
    molecules/index.js
    organisms/index.js
    templates/index.js
    content/index.js
    foundations/index.js
    hooks/index.js
  cjs/
    ...same shape if CJS remains supported
  styles/
    fonts.css
    tokens.css
    typography.css
    global.css
    components.css
    phosphor.css
```

Target `package.json` exports:

```json
{
  "exports": {
    ".": { "types": "./dist/esm/index.d.ts", "import": "./dist/esm/index.js", "require": "./dist/cjs/index.js" },
    "./atoms": { "types": "./dist/esm/atoms/index.d.ts", "import": "./dist/esm/atoms/index.js", "require": "./dist/cjs/atoms/index.js" },
    "./molecules": { "types": "./dist/esm/molecules/index.d.ts", "import": "./dist/esm/molecules/index.js", "require": "./dist/cjs/molecules/index.js" },
    "./organisms": { "types": "./dist/esm/organisms/index.d.ts", "import": "./dist/esm/organisms/index.js", "require": "./dist/cjs/organisms/index.js" },
    "./templates": { "types": "./dist/esm/templates/index.d.ts", "import": "./dist/esm/templates/index.js", "require": "./dist/cjs/templates/index.js" },
    "./content": { "types": "./dist/esm/content/index.d.ts", "import": "./dist/esm/content/index.js", "require": "./dist/cjs/content/index.js" },
    "./admin": { "types": "./dist/esm/admin/index.d.ts", "import": "./dist/esm/admin/index.js", "require": "./dist/cjs/admin/index.js" },
    "./video": { "types": "./dist/esm/video/index.d.ts", "import": "./dist/esm/video/index.js", "require": "./dist/cjs/video/index.js" },
    "./phosphor.css": "./dist/styles/phosphor.css",
    "./tokens.css": "./dist/styles/tokens.css",
    "./typography.css": "./dist/styles/typography.css",
    "./global.css": "./dist/styles/global.css",
    "./fonts.css": "./dist/styles/fonts.css",
    "./components.css": "./dist/styles/components.css"
  }
}
```

Build rule: root import must not force `@mdx-js/react`, `figlet`, `shiki`, or `video.js` into every consumer path. Heavy features get subpath exports or dynamic imports.

## 3. Atomic Design Inventory

| Current component path | Current responsibility | Proposed category | Proposed new path | Action | Reason | Migration notes |
|---|---|---|---|---|---|---|
| `src/components/atoms/Avatar/Avatar.tsx` | Avatar image/fallback primitive | Atom | `src/components/atoms/Avatar/Avatar.tsx` | Keep | Correct atomic scope. | Add `loading`, `decoding`, and fallback initials story. |
| `src/components/atoms/Badge/Badge.tsx` | Status/label chip | Atom | `src/components/atoms/Badge/Badge.tsx` | Keep | Correct primitive; overlaps with `ContentStatusBadge`. | Add semantic status tokens and document Badge vs Tag. |
| `src/components/atoms/Button/Button.tsx` | Button/anchor styled action | Atom | `src/components/atoms/Button/Button.tsx` | Keep + harden | Correct atom; union props are good. | Add consistent `aria-disabled` for anchor-disabled and loading semantics. |
| `src/components/atoms/Checkbox/Checkbox.tsx` | Checkbox with label/description | Molecule | `src/components/molecules/CheckboxField/CheckboxField.tsx` plus `src/components/atoms/CheckboxControl/CheckboxControl.tsx` | Split | Labeled field is not an atom. | Keep `Checkbox` as deprecated alias for one minor version. |
| `src/components/atoms/Input/Input.tsx` | Input/Textarea with label/help/error/prompt | Molecule + atoms | `InputControl`, `TextareaControl`, `InputField`, `TextareaField` | Split | Atom is too opinionated and duplicates `FormField`. | Preserve `Input`/`Textarea` aliases, introduce new lower-level controls. |
| `src/components/atoms/Select/Select.tsx` | Select with label/help/error/prompt | Molecule + atom | `SelectControl`, `SelectField` | Split | Same issue as Input. | `Select` remains alias to `SelectField` during migration. |
| `src/components/atoms/Switch/Switch.tsx` | Switch with label/description | Molecule + atom | `SwitchControl`, `SwitchField` | Split | Labeled field wrapper is molecule. | Keep old export as alias. |
| `src/components/atoms/Headings/Headings.tsx` | Semantic heading primitive with glyph | Atom | `src/components/atoms/Heading/Heading.tsx` | Rename | Singular path is cleaner; glyph support okay. | Export `Heading`, `H1`-`H6`; deprecate `Headings` folder path internally. |
| `src/components/atoms/Hr/Hr.tsx` | Horizontal rule | Atom | `src/components/atoms/Separator/Separator.tsx` | Rename | `Separator` is more semantic and supports orientation. | Export `Hr` as alias. |
| `src/components/atoms/Kbd/Kbd.tsx` | Keyboard key text | Atom | `src/components/atoms/Kbd/Kbd.tsx` | Keep | Correct atom. | Add multi-key examples. |
| `src/components/atoms/Link/Link.tsx` | Styled anchor | Atom | `src/components/atoms/Link/Link.tsx` | Keep | Correct atom. | Convert default export to named export internally. |
| `src/components/atoms/ProgressBar/ProgressBar.tsx` | Progress indicator | Atom | `src/components/atoms/ProgressBar/ProgressBar.tsx` | Keep | Correct primitive, used by course/lesson. | Verify `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, label. |
| `src/components/atoms/ReadingRail/ReadingRail.tsx` | Reading progress rail | Atom/Molecule | `src/components/molecules/ReadingRail/ReadingRail.tsx` | Move | It visualizes document progress and is content-specific. | Keep root export unchanged. |
| `src/components/atoms/StatPill/StatPill.tsx` | Compact label/value stat | Atom | `src/components/atoms/StatPill/StatPill.tsx` | Keep | Small primitive. | Rename color `magenta` to `accent`; keep alias. |
| `src/components/atoms/Tag/Tag.tsx` | Tag/chip with optional href/remove | Atom | `src/components/atoms/Tag/Tag.tsx` | Keep | Correct atom. | Add `TagGroup` molecule for wrapping/removal. |
| `src/components/atoms/TerminalPrompt/TerminalPrompt.tsx` | Prompt + command text | Atom | `src/components/atoms/TerminalPrompt/TerminalPrompt.tsx` | Keep | Brand primitive. | Add `aria-label` option for cursor/prompt. |
| `src/components/atoms/Text/Text.tsx` | Typography primitive | Atom | `src/components/atoms/Text/Text.tsx` | Keep + harden | Correct, but `as` typing is weak. | Use internal polymorphic helper. |
| `src/components/atoms/Tooltip/Tooltip.tsx` | Portal tooltip | Molecule | `src/components/molecules/Tooltip/Tooltip.tsx` | Move | Stateful overlay is not an atom. | Keep root export unchanged; add keyboard/touch rules. |
| `src/components/atoms/Glyph/index.d.ts` | Re-export from organism `Glyphs` | Atom | `src/components/atoms/Glyph/Glyph.tsx` | Split | Atom should not import from organism. | Move `Glyph` implementation out of `Glyphs`. |
| `src/components/molecules/AuthorCard/AuthorCard.tsx` | Author profile block | Organism | `src/components/organisms/AuthorBlock/AuthorBlock.tsx` | Rename/move | It is a full content block, not a small molecule. | Export `AuthorCard` alias. |
| `src/components/molecules/Breadcrumbs/Breadcrumbs.tsx` | Breadcrumb nav | Molecule | `src/components/molecules/Breadcrumbs/Breadcrumbs.tsx` | Keep | Correct molecule. | Add current-page semantics. |
| `src/components/molecules/Callout/Callout.tsx` | Admonition/callout block | Molecule | `src/components/molecules/Callout/Callout.tsx` | Keep | Good content molecule. | Add role mapping for `warn`/`danger`. |
| `src/components/molecules/CourseCard/CourseCard.tsx` | Full course card with cover/progress/CTA/lock | Organism | `src/components/organisms/CourseCard/CourseCard.tsx` | Move | Too complex for molecule. | Keep import alias for one release. |
| `src/components/molecules/DropdownMenu/DropdownMenu.tsx` | Triggered menu overlay | Molecule/Organism | `src/components/molecules/DropdownMenu/DropdownMenu.tsx` | Keep + harden | Molecule acceptable if fully accessible. | Add roving tabindex/arrow navigation. |
| `src/components/molecules/EmptyState/EmptyState.tsx` | Empty/error/no-result block | Molecule | `src/components/molecules/EmptyState/EmptyState.tsx` | Keep | Correct. | Add status/error variants. |
| `src/components/molecules/FormField/FormField.tsx` | Field label/hint/error/status badge | Molecule | `src/components/molecules/FormField/FormField.tsx` | Keep + split status | Good molecule; `ContentStatusBadge` should move. | Move status badge to `StatusBadge`. |
| `src/components/molecules/FormField/Form.tsx` | Config-driven form renderer | Organism | `src/components/organisms/Form/Form.tsx` or admin-only | Move | Config-driven form is larger than molecule. | Prefer composition API over field config for public usage. |
| `src/components/molecules/LessonRow/LessonRow.tsx` | Course lesson row/list | Molecule | `src/components/molecules/LessonRow/LessonRow.tsx` | Keep | Correct molecule. | Ensure row supports `aria-current`. |
| `src/components/molecules/List/List.tsx` | Generic list renderer | Molecule | `src/components/molecules/List/List.tsx` | Keep | Correct. | Use as base for ArticleList/RelatedPosts where possible. |
| `src/components/molecules/LocaleSwitch/LocaleSwitch.tsx` | Locale navigation switch | Molecule | `src/components/molecules/LocaleSwitch/LocaleSwitch.tsx` | Keep | Correct nav molecule. | Add `hreflang` support. |
| `src/components/molecules/Modal/Modal.tsx` | Modal/drawer overlay | Molecule/Organism | `src/components/molecules/Modal/Modal.tsx` | Keep + harden | Fine as molecule if generic, but needs a11y. | Add focus trap, return focus, scroll lock. |
| `src/components/molecules/Pagination/Pagination.tsx` | Pagination nav | Molecule | `src/components/molecules/Pagination/Pagination.tsx` | Keep | Correct. | Convert default export to named internally. |
| `src/components/molecules/PostFrontmatter/PostFrontmatter.tsx` | Raw frontmatter display | Molecule/content | `src/components/content/PostFrontmatter/PostFrontmatter.tsx` | Move | Content-specific. | Keep root export. |
| `src/components/molecules/PostMeta/PostMeta.tsx` | Post metadata/tags | Molecule | `src/components/molecules/PostMeta/PostMeta.tsx` | Keep | Correct. | Extract `TagGroup`. |
| `src/components/molecules/PrereqList/PrereqList.tsx` | Course prereq list | Molecule | `src/components/molecules/PrereqList/PrereqList.tsx` | Keep | Correct. | Share status tokens with LessonRow. |
| `src/components/molecules/SearchResult/SearchResult.tsx` | Search result item/list | Molecule | `src/components/molecules/SearchResult/SearchResult.tsx` | Keep + split | Result item molecule; list may overlap with `List`. | Use generic `List` internally. |
| `src/components/molecules/ShareBar/ShareBar.tsx` | Share links block | Molecule | `src/components/molecules/ShareBar/ShareBar.tsx` | Keep | Correct. | Add copy-link action as optional. |
| `src/components/molecules/Stepper/Stepper.tsx` | Step navigation | Molecule | `src/components/molecules/Stepper/Stepper.tsx` | Keep | Correct. | Add `aria-current=step`. |
| `src/components/molecules/TableOfContents/TableOfContents.tsx` | TOC tree with scroll spy | Molecule/Organism | `src/components/organisms/TableOfContents/TableOfContents.tsx` | Move optional | Scroll spy makes it more organism-like. | Accept as molecule if spy disabled by default. |
| `src/components/molecules/Tabs/Tabs.tsx` | Tabs primitive | Molecule | `src/components/molecules/Tabs/Tabs.tsx` | Keep | Correct. | Verify Home/End/Arrow keys. |
| `src/components/molecules/Timeline/Timeline.tsx` | Timeline list | Molecule | `src/components/molecules/Timeline/Timeline.tsx` | Keep | Correct. | Use semantic list/time. |
| `src/components/molecules/Toast/Toast.tsx` | Toast and hook | Molecule | `src/components/molecules/Toast/Toast.tsx` | Keep + harden | Correct. | Add provider/viewport later; `aria-live` docs required. |
| `src/components/content/ArticleList/ArticleList.tsx` | Article list | Organism/content | `src/components/organisms/ArticleList/ArticleList.tsx` | Move/merge | Overlaps with generic List and PostListing. | Use `List` internally; clarify differences. |
| `src/components/content/CodeBlock/CodeBlock.tsx` | Shiki code block and copy | Content organism | `src/components/content/CodeBlock/CodeBlock.tsx` | Keep + isolate | Content-specific and depends on Shiki. | Do not import Shiki in root path unless used. |
| `src/components/content/MdxComponents/MdxComponents.tsx` | MDX component map/PostBody | Content | `src/components/content/MdxComponents/MdxComponents.tsx` | Keep + isolate | Content-specific. | Move to `./content/mdx` subpath to preserve optional peer. |
| `src/components/content/Prose/Prose.tsx` | Prose wrapper | Content/template primitive | `src/components/content/Prose/Prose.tsx` | Keep | Correct. | Add long-form typography tests. |
| `src/components/organisms/AsciiBanner/AsciiBanner.tsx` | ASCII/neon banner | Organism | `src/components/organisms/AsciiBanner/AsciiBanner.tsx` | Keep | Brand-defining organism. | Add overflow-safe container defaults. |
| `src/components/organisms/CrtShell/CrtShell.tsx` | CRT frame/effects wrapper | Template/effect organism | `src/components/organisms/CrtFrame/CrtFrame.tsx` | Rename | Shell naming overlaps `SiteShell`; effect wrapper. | Keep `CrtShell` alias. |
| `src/components/organisms/Exercise/Exercise.tsx` | Lesson exercise checklist | Organism | `src/components/organisms/Exercise/Exercise.tsx` | Keep | Correct. | Ensure controlled checkbox a11y. |
| `src/components/organisms/Footer/Footer.tsx` | Site footer | Organism | `src/components/organisms/Footer/Footer.tsx` | Keep | Correct. | Use Link atom. |
| `src/components/organisms/Glyphs/Glyphs.tsx` | Glyph gallery and glyph atom | Organism + atom | `GlyphGallery` + `Glyph` atom | Split/rename | Gallery is organism; glyph is atom. | Keep `Glyphs` alias. |
| `src/components/organisms/Header/Header.tsx` | Site header/masthead | Organism | `src/components/organisms/Header/Header.tsx` | Keep | Correct. | Avoid unconditional `figlet` root import. |
| `src/components/organisms/HeaderNav/HeaderNav.tsx` | Header nav | Molecule | `src/components/molecules/HeaderNav/HeaderNav.tsx` | Move | Header-specific but smaller than organism. | Keep root export. |
| `src/components/organisms/HeroFrame/HeroFrame.tsx` | HUD/hero frame | Organism | `src/components/organisms/HeroFrame/HeroFrame.tsx` | Keep | Brand organism. | Split HUD subcomponents into named files if growing. |
| `src/components/organisms/LoginForm/LoginForm.tsx` | Login form | Organism | `src/components/organisms/LoginForm/LoginForm.tsx` | Keep | Correct. | Use FormField/Input/Button primitives. |
| `src/components/organisms/ModuleAccordion/ModuleAccordion.tsx` | Course module accordion | Organism | `src/components/organisms/ModuleAccordion/ModuleAccordion.tsx` | Keep | Correct. | Extract accessible accordion primitive if reused. |
| `src/components/organisms/NerdTree/NerdTree.tsx` | File-tree/sidebar nav | Organism | `src/components/organisms/NerdTree/NerdTree.tsx` | Keep | Correct. | Confirm `tree` keyboard interactions. |
| `src/components/organisms/PdaWindow/PdaWindow.tsx` | Terminal window/surface | Organism | `src/components/organisms/TerminalWindow/TerminalWindow.tsx` | Rename optional | More general name. | Keep `PdaWindow` brand alias. |
| `src/components/organisms/PostHeader/PostHeader.tsx` | Full post hero/header | Organism | `src/components/organisms/PostHeader/PostHeader.tsx` | Keep | Correct. | Use Heading/PostMeta/TagGroup. |
| `src/components/organisms/PostListing/PostListing.tsx` | Blog listing table with rows/thumbs | Organism | `src/components/organisms/PostListing/PostListing.tsx` | Keep + unify | Correct but overlaps with ArticleList. | Extract `PostRow` molecule if reused. |
| `src/components/organisms/RelatedPosts/RelatedPosts.tsx` | Related posts list | Organism | `src/components/organisms/RelatedPosts/RelatedPosts.tsx` | Keep + merge internals | Correct. | Use `ArticleList`/`List` internally. |
| `src/components/organisms/Search/Search.tsx` | Search input + result list | Organism | `src/components/organisms/SearchPanel/SearchPanel.tsx` | Rename | Full search section. | Keep `Search` alias. |
| `src/components/organisms/SeriesNav/SeriesNav.tsx` | Prev/next series nav | Organism | `src/components/organisms/SeriesNav/SeriesNav.tsx` | Keep | Correct. | Consider reuse with `StepperFoot`. |
| `src/components/organisms/VideoPlayer/VideoPlayer.tsx` | video.js wrapper | Organism/subpath | `src/components/organisms/VideoPlayer/VideoPlayer.tsx` and `src/video/index.ts` | Keep + isolate | Heavy optional feature. | Move `video.js` out of root import path. |
| `src/components/pages/Post/Post.tsx` | Post layout with header/body/sidebar/footer | Template | `src/components/templates/PostTemplate/PostTemplate.tsx` | Move/rename | This is not a page; no routing/data. | Export `Post` as stable alias. |
| `src/components/presets/SiteShell/SiteShell.tsx` | App/site shell preset | Template | `src/components/templates/SiteShell/SiteShell.tsx` | Move | Preset is a template. | Keep `presets` namespace as compatibility alias. |
| `src/components/templates/Layout/Layout.tsx` | Flex/Grid/Stack/Cluster/Container layout primitives | Template/layout primitives | `src/components/templates/LayoutPrimitives/LayoutPrimitives.tsx` | Keep/rename | Correct utility template layer. | Fix declaration size from generic return type. |
| `src/components/admin/AdminShell/AdminShell.tsx` | Private admin shell/template | Template/admin | `src/components/templates/AdminDashboardTemplate/AdminShell.tsx` or `src/components/admin/AdminShell` | Move or keep admin namespace | It owns application layout. | Keep `admin` subpath. |
| `src/components/admin/ContentEditor/*` | Config-driven CMS editor primitives | Organisms/admin | `src/components/admin/ContentEditor/*` plus shared molecules | Refactor | Admin-specific but should reuse public form primitives. | Extract `TagInput`, `RepeaterField`, `PairListField` as molecules if public. |
| `src/components/admin/NoteEditor/NoteEditor.tsx` | Note editor preset | Organism/admin | `src/components/admin/NoteEditor/NoteEditor.tsx` | Keep | Good admin-specific organism. | Use generic `ContentEditor`. |
| `src/components/admin/ProjectEditor/ProjectEditor.tsx` | Project editor preset | Organism/admin | Same | Keep | Good admin-specific organism. | Add media upload later. |
| `src/components/admin/CourseEditor/CourseEditor.tsx` | Course editor preset | Organism/admin | Same | Keep | Good admin-specific organism. | Needs pricing/product section support. |
| `src/components/admin/LessonEditor/LessonEditor.tsx` | Lesson editor preset | Organism/admin | Same | Keep | Good admin-specific organism. | Add resource/file upload support. |
| `src/components/legacy/index.ts` | `PostLayout` alias | Legacy | `src/components/legacy/index.ts` | Keep temporarily | Good deprecation channel. | Add console-free deprecation docs, not runtime warnings. |

## 4. Component Merge/Split/Delete Plan

Merge/refactor overlaps:

- Merge internal list behavior across `ArticleList`, `RelatedPosts`, `SearchResultList`, `PostListing`, and `List`. Keep visual components, but share a `ListSurface`, `ListRow`, `ListMeta`, and empty-state handling.
- Merge `PostFrontmatter` with `PostBody`/content namespace. It is document-content UI, not generic molecule UI.
- Merge status concepts from `ContentStatusBadge`, `StatusSelect`, editor status fields, `Badge`, and `StatPill` into one status token map: `draft`, `published`, `archived`, `locked`, `done`, `current`, `missing`, `warn`, `danger`, `success`.
- Merge layout width rules from `SiteShell`, `Post`, `Container`, `AdminShell`, and `Prose` into layout tokens: `--pho-layout-site-max`, `--pho-layout-prose-max`, `--pho-layout-sidebar-width`, `--pho-layout-toc-width`, `--pho-layout-admin-sidebar-width`, `--pho-layout-gutter`.
- Merge form field wrappers: `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `FormField`, `Form`, and admin editor fields should share `Field`, `FieldLabel`, `FieldHint`, `FieldError`, `ControlFrame`.

Split:

- Split `Input` into `InputControl`, `TextareaControl`, `InputField`, `TextareaField`.
- Split `Select` into `SelectControl` and `SelectField`.
- Split `Checkbox` into `CheckboxControl` and `CheckboxField`.
- Split `Switch` into `SwitchControl` and `SwitchField`.
- Split `Glyphs` into `Glyph` atom and `GlyphGallery` organism.
- Split `CourseCard` internals into `CardSurface`, `CardHeader`, `CourseCover`, `CourseProgress`, and `CourseCTA` if stories show repeated use.
- Split `Modal` and `Drawer` shared behavior into `Overlay`, `DialogSurface`, `useFocusTrap`, `useScrollLock`, `useEscapeKey`.
- Split `ContentEditor` into `EditorShell`, `EditorFieldRenderer`, `EditorPreview`, `TagInput`, `PairListField`, `RepeaterField`, `StatusSelect`. Keep only `ContentEditor` composition in admin.

Rename:

- `Headings` -> `Heading`.
- `Hr` -> `Separator` with `Hr` alias.
- `CrtShell` -> `CrtFrame` or keep `CrtShell` but move under templates/effects.
- `PdaWindow` -> `TerminalWindow` with `PdaWindow` alias.
- `Search` -> `SearchPanel` with `Search` alias.
- `HeaderNav` -> molecule path.
- `CourseCard` -> organism path.
- `Post` -> `PostTemplate` internally, exported as `Post`.
- `SiteShell` -> template path, `presets` as compatibility namespace.

Deprecate:

- `components/pages` as a public category. Replace with `components/templates` and `components/pages/examples`.
- `components/presets` as a primary public category. Keep namespace for compatibility.
- `legacy/PostLayout` only after `PostTemplate` migration docs exist.
- Direct default exports internally. Keep external compatibility where necessary, but prefer named exports in source.
- Raw legacy token names in component source (`--phosphor`, `--bg`, `--magenta`) except in token definition file.

Delete only after source audit:

- Unused duplicate SCSS/CSS module files.
- Duplicate stories whose source snippets do not match preview.
- Any old `PageLayout`/`PostLayout` implementations if they still exist in source and are covered by `PostTemplate`.
- Dead `legacy` aliases after a documented release window.

## 5. Design Token Plan

Current strengths:

- `dist/tokens.css` already exposes stable semantic `--pho-*` aliases.
- Fonts are separated into `fonts.css`.
- Typography utilities exist in `typography.css`.
- Global reduced-motion rule exists.
- Token metadata is exported from `src/foundations/tokens/index.ts` through `PHOSPHOR_TOKEN_GROUPS`, `PHOSPHOR_TOKENS`, and `phosphorVar`.

Current problems:

- Legacy raw tokens (`--phosphor`, `--bg`, `--magenta`) still influence naming. `--magenta` is semantically wrong because the actual accent is green/cool phosphor.
- Danger/error colors are hardcoded repeatedly: `#ff3a3a`, `#ff6a6a`, `#ff8a8a`, and red `rgba()` values appear in components such as `LoginForm` and `CourseCard` locked state.
- Component CSS contains many hardcoded alpha greens, pixel sizes, rem spacings, breakpoints, and layout widths.
- Breakpoints are inconsistent: `360`, `380`, `420`, `480`, `520`, `540`, `560`, `600`, `640`, `720`, `880` appear in package/component CSS.
- Motion values are hardcoded per component (`120ms`, `140ms`, `160ms`, `280ms`, `320ms`, etc.).
- Component-level values like thumbnail sizes, TOC width, admin sidebar width, course cover width, sticky offsets, and glow padding are not formalized.

Create/clean these token groups:

```css
:root {
  /* reference colors */
  --pho-ref-green-100: #d8ffe7;
  --pho-ref-green-200: #b6ffce;
  --pho-ref-green-300: #62ff9a;
  --pho-ref-green-400: #2cff7a;
  --pho-ref-green-500: #1fb854;
  --pho-ref-green-700: #0a4d22;
  --pho-ref-green-900: #010604;

  /* semantic colors */
  --pho-color-surface: var(--pho-color-background-raised);
  --pho-color-surface-deep: var(--pho-color-background-deep);
  --pho-color-border: var(--pho-color-primary-faint);
  --pho-color-border-strong: var(--pho-color-primary-muted);
  --pho-color-danger: #ff6a6a;
  --pho-color-danger-strong: #ff8a8a;
  --pho-color-danger-muted: rgba(255, 58, 58, 0.35);
  --pho-color-warning: #dfffaa;
  --pho-color-warning-muted: rgba(223, 255, 170, 0.32);

  /* alpha overlays */
  --pho-alpha-primary-01: rgba(44, 255, 122, 0.01);
  --pho-alpha-primary-02: rgba(44, 255, 122, 0.02);
  --pho-alpha-primary-04: rgba(44, 255, 122, 0.04);
  --pho-alpha-primary-06: rgba(44, 255, 122, 0.06);
  --pho-alpha-primary-08: rgba(44, 255, 122, 0.08);
  --pho-alpha-primary-12: rgba(44, 255, 122, 0.12);
  --pho-alpha-primary-18: rgba(44, 255, 122, 0.18);
  --pho-alpha-primary-22: rgba(44, 255, 122, 0.22);

  /* layout */
  --pho-layout-site-max: 88rem;
  --pho-layout-content-max: 72rem;
  --pho-layout-prose-max: 68ch;
  --pho-layout-sidebar-width: 18rem;
  --pho-layout-toc-width: 17.5rem;
  --pho-layout-admin-sidebar-width: clamp(18rem, 24vw, 22rem);
  --pho-layout-gutter: clamp(1rem, 2vw, 1.75rem);
  --pho-layout-sticky-top: 1rem;

  /* breakpoints */
  --pho-bp-xs: 360px;
  --pho-bp-sm: 520px;
  --pho-bp-md: 720px;
  --pho-bp-lg: 880px;
  --pho-bp-xl: 1120px;

  /* motion */
  --pho-motion-fast: 120ms;
  --pho-motion-base: 180ms;
  --pho-motion-slow: 320ms;
  --pho-ease-out: ease-out;
  --pho-ease-terminal: steps(8);

  /* component tokens */
  --pho-card-border: 1px solid var(--pho-color-border);
  --pho-card-bg: var(--pho-color-background-raised);
  --pho-card-padding: var(--pho-space-5);
  --pho-thumb-post-w: 160px;
  --pho-thumb-post-h: 100px;
  --pho-thumb-post-w-sm: 88px;
  --pho-thumb-post-h-sm: 56px;
  --pho-ascii-glow-pad-x: 1.5em;
  --pho-ascii-glow-pad-y: 1.1em;
}
```

Token implementation tasks:

1. Keep old raw tokens in `tokens.css`, but mark them as legacy in comments.
2. Replace internal component CSS references with `--pho-*` only.
3. Add danger/warning/status tokens before changing admin/login/course components.
4. Add layout and component tokens before moving templates.
5. Add motion tokens before Storybook visual regression.
6. Move repeated alpha colors into alpha tokens. Avoid one token for every arbitrary alpha; define a small useful scale.
7. Add `reduced-effects.css` or data-attribute mode: `[data-pho-effects="reduced"]` to disable scanlines/noise/glow independent from OS reduced motion.
8. Add `high-contrast.css` theme for long reading/admin forms.

## 6. Typography Plan

Current state:

- `tokens.css` defines `--pho-font-display`, `--pho-font-heading`, `--pho-font-body`, `--pho-font-code`, `--pho-font-terminal`.
- `typography.css` defines `.t-h1` through `.t-h6`, `.t-body`, `.t-lead`, `.t-small`, `.t-caption`, `.t-mono`, `.t-code`, `.t-terminal`, `.t-stamp`, `.t-prompt`, `.t-glow`, `.t-muted`, `.t-dim`, `.t-faded`, `.t-truncate`, `.t-balance`.
- Body and prose currently use monospace-heavy stacks. This fits the brand but can become fatiguing for long posts/wiki pages.

Target type roles:

| Role | Token/component | Font | Size/line-height | Usage |
|---|---|---|---|---|
| Terminal display | `TerminalText`, `.t-terminal` | `--pho-font-terminal` | large, tight | ASCII, prompts, HUD labels, short UI only |
| Heading | `Heading`, `H1`-`H6` | `--pho-font-heading` | existing h scale | Page/post/course headings |
| Body/prose | `Prose`, `Text variant="body"` | `--pho-font-body` | 16-18px / 1.7 | Blog/wiki/course reading |
| UI control | `Button`, `InputControl`, `SelectControl` | `--pho-font-code` | 0.875-0.95rem / 1.2 | Admin forms and controls |
| Metadata | `PostMeta`, `Text variant="caption"` | `--pho-font-code` or terminal | 0.68-0.78rem | Dates, tags, read time, status |
| Code | `CodeBlock`, `CodeText` | `--pho-font-code` | 0.86em / 1.55 | Inline/block code |
| Muted | `MutedText` | inherited | same as context | Help text, hints, secondary UI |
| Keyboard | `Kbd` | `--pho-font-code` | caption | Shortcut docs |

Required primitives:

- `Text`
- `Heading`
- `CodeText`
- `TerminalText`
- `Prose`
- `Kbd`
- `MutedText`
- `Caption`
- `LabelText`
- `StampText`

Typography rules:

1. Do not use `VT323` for paragraphs, form help text, error text, or long wiki content.
2. Use glow on headings, labels, short prompts, and selected states only. Avoid glow on long paragraphs.
3. `Prose` must own long-content rhythm: `p`, `ul`, `ol`, `blockquote`, `table`, `pre`, `code`, `figure`, `img`, headings, and callouts.
4. Metadata should be small but not unreadable. Avoid `0.68rem` for critical controls.
5. Admin CMS form labels should use `--pho-type-label-size` and hints/errors should be readable without glow.
6. Keep all-uppercase terminal labels for stamps and short UI; use normal casing for prose.
7. Add responsive type examples in Storybook: mobile post, desktop wiki, admin editor, course page.

## 7. Storybook Documentation Plan

Current known facts:

- `package.json` has `storybook dev -p 6006`, `storybook build`, Storybook `10.3.6`, and `scripts/audit-story-sources.mjs`.
- Story files are not in the published tarball, so the first source-repo task must audit actual `src/**/*.stories.tsx`, `stories/**/*.mdx`, `.storybook/main.*`, `.storybook/preview.*`, and `scripts/audit-story-sources.mjs`.

Target hierarchy:

```txt
Foundations/
  Tokens
  Typography
  Motion
  Effects
  Accessibility
Atoms/
  Button
  InputControl
  TextareaControl
  SelectControl
  CheckboxControl
  SwitchControl
  Text
  Heading
  Link
  Badge
  Tag
  Kbd
  ProgressBar
  Separator
  Glyph
Molecules/
  FormField
  InputField
  SelectField
  CheckboxField
  SwitchField
  Callout
  Breadcrumbs
  Tabs
  DropdownMenu
  Modal
  Tooltip
  Toast
  TableOfContents
  SearchResult
  PostMeta
  TagGroup
Organisms/
  Header
  Footer
  NerdTree
  PdaWindow / TerminalWindow
  AsciiBanner
  PostHeader
  PostListing
  CourseCard
  ModuleAccordion
  SearchPanel
  LoginForm
  ContentEditor
  VideoPlayer
Templates/
  SiteShell
  PostTemplate
  BlogIndexTemplate
  WikiPageTemplate
  CourseLandingTemplate
  AdminDashboardTemplate
  AdminEditTemplate
Pages/
  PersonalBlogExample
  WikiArticleExample
  CourseLandingExample
  AdminDashboardExample
  AdminPostEditorExample
```

Required stories per component:

- `Default`
- `Variants`
- `Sizes` if applicable
- `States`: hover/focus/active/disabled/loading/error/success/empty/current/locked as applicable
- `WithRealContent`: blog/wiki/course/admin example, not lorem-only
- `Responsive`: narrow/mobile layout where relevant
- `AccessibilityNotes`: docs block, not necessarily a separate visual story
- `ReducedMotion` for CRT/animation-heavy components

Show-code rules:

1. Every important story must define a real client usage snippet.
2. Show-code must match the rendered preview exactly. No JSON config dumps unless the actual public API is config-driven.
3. Prefer simple root imports in app-level examples:

```tsx
import { Button, Callout } from "@sektant1/phosphor-ui";
```

4. Prefer subpath imports in architecture docs:

```tsx
import { Button } from "@sektant1/phosphor-ui/atoms";
```

5. Do not show internal CSS module classes, internal utilities, hashed class names, or generated data structures.
6. For composed templates, show realistic usage: blog post with TOC, wiki article, course card list, admin editor form.
7. Enforce with `scripts/audit-story-sources.mjs`: story source string must include the public component name rendered in the story and must not include `args:`, raw `JSON.stringify`, hashed classes, or internal file paths.

Docs template per component:

```mdx
# ComponentName

Use when...
Do not use when...

## Anatomy
- Root
- Header/label
- Body/control
- Actions/meta

## Props
Autodocs table.

## Accessibility
- Keyboard behavior
- ARIA behavior
- Focus behavior
- Reduced motion behavior

## Composition rules
- Which atoms/molecules it uses
- What it should not own

## Examples
- Real blog/wiki/course/admin examples
```

Visual/test suggestions:

- Add Storybook test runner or Playwright smoke tests for keyboard flows: `Tabs`, `DropdownMenu`, `Modal`, `Drawer`, `NerdTree`, `Search`, `ContentEditor`.
- Add axe checks for core stories.
- Add screenshot regression for `Button`, `InputField`, `Callout`, `PostTemplate`, `SiteShell`, `CourseCard`, `AdminShell`.
- Add CI step: `npm run typecheck && npm run audit:story-sources && npm test -- --runInBand && npm run build-storybook -- --quiet && npm run build`.

## 8. Accessibility Fix Plan

Global:

- Keep the skip link in `SiteShell`; verify `main` receives `id` and focus target.
- Keep `prefers-reduced-motion: reduce`; expand it to all component-specific animations and hover transforms.
- Add optional `[data-pho-effects="off"]` or `[data-pho-effects="reduced"]` mode to disable CRT/noise/scanlines/glow without changing OS settings.
- Add `--pho-focus-ring`, `--pho-focus-offset`, and apply consistently to controls, links, menu items, tabs, tree items, cards-as-links, and close buttons.
- Add danger/warning tokens and avoid hardcoded red values.

Forms:

- `InputField`, `TextareaField`, `SelectField`, `CheckboxField`, `SwitchField` must generate stable IDs with `useId` and wire `label`, `aria-describedby`, `aria-invalid`, help text, and error text.
- `onChange` APIs should preserve native event compatibility. `onValueChange` is fine, but do not replace native semantics.
- Required fields need visible required markers and native `required` where applicable.
- Admin editor errors need `role="alert"` only for dynamic errors; static help text should not be alert.

Modal/Drawer:

- Add focus trap.
- Save previously focused element and return focus on close.
- Lock background scroll while open.
- Close on Escape when enabled.
- Use `aria-modal="true"`, `role="dialog"`, `aria-labelledby`, `aria-describedby`.
- Ensure overlay click does not close when interacting inside panel.
- Add keyboard and screen-reader Storybook tests.

DropdownMenu:

- Trigger should expose `aria-haspopup="menu"`, `aria-expanded`, `aria-controls`.
- Menu items need arrow-key navigation, Home/End, Escape close, Enter/Space activation.
- Disabled items should not be focusable/activatable.
- Destructive items should use semantic danger tokens.

Tabs:

- Verify `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, `id` linkage.
- Add ArrowLeft/ArrowRight for horizontal and ArrowUp/ArrowDown for vertical.
- Add Home/End.
- Disabled tabs skipped by keyboard.

NerdTree:

- If using `role="tree"`, implement tree keyboard expectations: Up/Down, Right opens or moves to child, Left closes or moves to parent, Home/End.
- If not implementing full tree behavior, use semantic nav/list instead of tree roles.

Tooltip:

- Tooltip content should not contain interactive controls.
- Use `aria-describedby` only while shown or consistently with hidden tooltip content.
- Ensure touch users can access equivalent labels.

Toast:

- `info/success`: `role="status"` or `aria-live="polite"`.
- `warn/error`: `role="alert"` or assertive only when immediate attention is required.
- Dismiss button needs label.

CodeBlock:

- Copy button needs accessible label and status feedback.
- `pre` needs horizontal scroll and no forced tiny font.
- Syntax colors must meet contrast against `--code-bg`.

CRT/effects:

- Scanlines/noise/vignette must never block pointer events.
- Avoid overlay opacity that reduces long-form text contrast.
- Glow must be minimized on paragraphs and form text.

## 9. Blog/Wiki/Course Platform Component Roadmap

Already present and usable:

- `SiteShell`
- `Post`
- `PostBody`
- `Prose`
- `PostHeader`
- `PostMeta`
- `PostListing`
- `TableOfContents`
- `Tag`
- `Callout`
- `CodeBlock`
- `ArticleList`
- `RelatedPosts`
- `SeriesNav`
- `Search`
- `NerdTree`
- `CourseCard`
- `LessonRow`
- `ModuleAccordion`
- `PrereqList`
- `Exercise`
- `VideoPlayer`
- `LoginForm`
- `AdminShell`
- `ContentEditor`
- `NoteEditor`
- `ProjectEditor`
- `CourseEditor`
- `LessonEditor`

Missing or insufficient components/templates:

Personal blog:

- `BlogIndexTemplate`: hero, filters, post listing, project cards, pagination.
- `PostTemplate`: current `Post` moved/renamed with robust TOC region.
- `PostCard`: card alternative to row/table listing.
- `TagGroup`: wrapping tags without stretching.
- `AuthorBlock`: replace/move `AuthorCard` organism.
- `ChangelogBlock` / `DevlogBlock`.
- `RSSLink` / `SubscribeBlock` optional.

Personal wiki:

- `WikiPageTemplate`: left `NerdTree`, main `Prose`, right `TableOfContents`.
- `WikiIndexTemplate`: grouped article list.
- `BacklinksPanel`.
- `PageStatusBanner`: draft/outdated/verified.
- `ReferenceCard`.
- `Admonition` can be alias to `Callout`.

Single course platform:

- `CourseLandingTemplate`.
- `CourseHero`.
- `CurriculumList` using `ModuleAccordion`.
- `PricingBox` for one product.
- `CheckoutCTA`.
- `LessonPageTemplate`.
- `LessonNav` using `SeriesNav`/`StepperFoot`.
- `CourseProgressSummary`.
- `ResourceList`.
- `LockedContentNotice`.

Private admin CMS:

- `AdminDashboardTemplate`.
- `AdminEditTemplate`.
- `LoginPageTemplate`.
- `MediaUploadField`.
- `ImagePicker` / `AssetPicker`.
- `SlugField`.
- `MarkdownEditorField`.
- `PublishToolbar`.
- `DangerZone`.
- `ConfirmDialog` built on Modal.
- `DataTable` / `ContentTable`.
- `BulkActionBar`.
- `SaveStatusToast`.
- `UnsavedChangesPrompt`.
- `PreviewPane`.
- `EmptyState` variants for drafts/content/media.

Layout-specific fixes to implement:

- `PostTemplate`: sidebar should render beside content above `880px`, not below. Current CSS has `grid-template-columns: minmax(0, 1fr) minmax(220px, 280px)` and collapses below `880px`; verify consumers pass `sidebar` to `Post`, not below `PostBody`.
- `PostListing`: current row columns are `2ch thumb 1fr 7ch 11ch`; maintain equal row height through fixed thumbnail tokens and avoid hidden date column mismatch on medium screens.
- `AsciiBanner`: current CSS uses overflow visible and glow padding. Keep, but ensure parent templates do not clip with `overflow: hidden` unless explicitly intended.
- `AdminShell`: current CSS uses `flex-direction: row-reverse` and a right-side side panel. Make side choice explicit with `sidebarSide="left" | "right"`; default left for admin, right only when intentionally desired.
- `CourseCard`: currently uses CSS container queries and `height: 100%`. Keep, but define grid parent examples so card rows align.

## 10. Migration Strategy

### Phase 1: Audit and inventory

Goal: confirm source repo facts before moving files.

Files likely affected:

- `package.json`
- `src/components/**`
- `src/**/*.stories.*`
- `.storybook/**`
- `scripts/audit-story-sources.mjs`
- `rollup.config.mjs`
- `tsconfig*.json`

Exact tasks:

1. Run `find src -maxdepth 5 -type f | sort` and save to `docs/audit/file-inventory.md`.
2. Run a component inventory script that lists every component, props type, export path, story path, style path, and test path.
3. Verify whether source has extra components not present in the package, especially `PageLayout`, `PostLayout`, duplicate shells, old SCSS files, or unexported components.
4. Verify Storybook files exist and map to current package exports.
5. Verify whether `@mdx-js/react`, `figlet`, `shiki`, and `video.js` are imported directly by root barrel or only by feature components.
6. Verify `rollup.config.mjs` CSS handling.

Acceptance criteria:

- A complete component inventory exists.
- Every current public export is mapped to source path and proposed atomic category.
- Known limitations from the package audit are confirmed or corrected.

Risks:

- The published package may not match current repo source.
- Storybook may be ahead/behind package code.

### Phase 2: Public API and bundle safety

Goal: stop root imports from forcing optional/heavy dependencies and runtime component style injection.

Files likely affected:

- `src/index.ts`
- `src/components/index.ts`
- group index files
- `rollup.config.mjs`
- `package.json`
- `src/content/**`
- `src/components/organisms/VideoPlayer/**`
- `src/components/organisms/Header/**`
- `src/styles/**`

Exact tasks:

1. Add subpath entry points for atoms, molecules, organisms, templates, content, admin, video, foundations, hooks.
2. Move `VideoPlayer` to a `./video` or optional organism entry so root imports do not import `video.js`.
3. Move MDX-specific exports to `./content` or `./content/mdx`; root can re-export types only if it does not import `@mdx-js/react` at runtime.
4. Ensure `figlet` is not imported by root unless `Header`/ASCII generation actually needs it. Prefer precomputed ASCII art or dynamic import.
5. Change Rollup/PostCSS config to extract component CSS to `dist/styles/components.css` instead of injecting styles at runtime.
6. Update `dist/phosphor.css` to import `components.css` after global CSS.
7. Keep root exports compatible, but verify bundle output no longer imports all optional dependencies at module load.

Acceptance criteria:

- Importing `{ Button }` from root does not require `@mdx-js/react`, `figlet`, `shiki`, or `video.js` at runtime.
- `dist/phosphor.css` contains or imports all required component styles.
- Component CSS is not injected by `style-inject` in production bundle.
- `npm pack` includes all CSS files.
- Existing root imports still work.

Risks:

- Bundle config change can break CSS modules if class mapping is not preserved.
- Subpath exports require careful CJS/ESM/types alignment.

### Phase 3: Token cleanup

Goal: replace repeated hardcoded visual values with stable design tokens.

Files likely affected:

- `src/styles/tokens.css`
- `src/styles/typography.css`
- `src/styles/global.css`
- component CSS modules/SCSS files
- `src/foundations/tokens/index.ts`

Exact tasks:

1. Add danger/warning/status/layout/breakpoint/motion/component tokens.
2. Replace component hardcoded danger reds with `--pho-color-danger*`.
3. Replace repeated alpha greens with `--pho-alpha-primary-*` tokens.
4. Replace component breakpoints with the standard breakpoint set.
5. Replace repeated thumbnail/sidebar/prose widths with layout/component tokens.
6. Replace repeated transition durations with motion tokens.
7. Update `PHOSPHOR_TOKEN_GROUPS` and token docs.

Acceptance criteria:

- No component source uses legacy raw tokens except token definitions and intentional compatibility aliases.
- Repeated red/danger values are tokenized.
- Breakpoints are reduced to the approved set, except justified component/container queries.
- Visual identity remains unchanged in Storybook snapshots.

Risks:

- Token cleanup can subtly shift layout. Use visual snapshots before/after.

### Phase 4: Atomic folder migration

Goal: align source folders to Atomic Design without breaking public imports.

Files likely affected:

- `src/components/atoms/**`
- `src/components/molecules/**`
- `src/components/organisms/**`
- `src/components/templates/**`
- `src/components/content/**`
- all index/barrel files

Exact tasks:

1. Create new target folders.
2. Move components internally according to Section 3.
3. Keep root exports stable.
4. Add compatibility re-exports in old internal paths only if source imports require migration time.
5. Update Storybook story titles to new hierarchy.
6. Update README Import Model.

Acceptance criteria:

- Components grouped by real responsibility.
- Root import examples still compile.
- Internal imports do not climb across layers incorrectly: atoms must not import molecules/organisms/templates.
- `components/pages` contains examples only or is removed from public exports.

Risks:

- Circular imports during re-export migration.
- Broken CSS module relative imports.

### Phase 5: Component merge/split pass

Goal: reduce duplicated responsibility and create composable primitives.

Files likely affected:

- `Input`, `Select`, `Checkbox`, `Switch`, `FormField`, `Form`
- `ArticleList`, `List`, `PostListing`, `RelatedPosts`, `SearchResult`
- `Glyphs`, `Glyph`
- `Modal`, `Drawer`, overlay utilities
- `ContentEditor` internals

Exact tasks:

1. Create `Field`, `FieldLabel`, `FieldHint`, `FieldError`, `ControlFrame`.
2. Create low-level controls and field wrappers.
3. Replace admin editor duplicated field layouts with field primitives.
4. Extract `TagGroup` and use it in `PostMeta`, editor previews, and tag inputs where applicable.
5. Extract shared list/card row primitives where duplication is obvious.
6. Split `Glyph` from `GlyphGallery`.
7. Split overlay behavior utilities from `Modal`/`Drawer`.

Acceptance criteria:

- `InputControl` can be used without label/error wrapper.
- `InputField` provides the old easy API.
- Old `Input`, `Textarea`, `Select`, `Checkbox`, and `Switch` exports remain working through aliases.
- List components share behavior without losing their visual differences.

Risks:

- Too aggressive abstraction can make visual components harder to understand. Prefer composition and small helpers over one mega-list abstraction.

### Phase 6: Storybook rebuild/docs repair

Goal: make docs trustworthy and useful for consumers.

Files likely affected:

- `.storybook/**`
- `src/**/*.stories.tsx`
- `stories/**/*.mdx`
- `scripts/audit-story-sources.mjs`
- `README.md`

Exact tasks:

1. Move stories into Atomic hierarchy.
2. Add missing stories for all public components.
3. Replace wrong show-code snippets with real client React usage.
4. Add docs pages for tokens, typography, effects, accessibility, and composition rules.
5. Make `audit:story-sources` fail on JSON dumps, internal imports, stale code strings, and missing important stories.
6. Add composed page examples: blog, wiki, course, admin.

Acceptance criteria:

- Every important component has at least default/variants/states/accessibility notes.
- Show-code matches rendered preview.
- Stories use public imports.
- Storybook builds cleanly.

Risks:

- Storybook 10 config can be sensitive to Webpack/CSS module changes. Do the CSS extraction phase first.

### Phase 7: Accessibility pass

Goal: make the components safe for keyboard/screen-reader users without flattening the theme.

Files likely affected:

- Form controls
- `Modal`, `Drawer`, `DropdownMenu`, `Tabs`, `NerdTree`, `Tooltip`, `Toast`, `CodeBlock`, `SiteShell`
- `src/internal/a11y/**`
- stories/tests

Exact tasks:

1. Implement shared a11y utilities.
2. Add focus trap/return focus/scroll lock to overlays.
3. Add keyboard navigation to DropdownMenu and NerdTree.
4. Verify Tabs keyboard behavior.
5. Verify labels/descriptions/errors in all form fields.
6. Add reduced-effects mode.
7. Add axe/story tests.

Acceptance criteria:

- Keyboard-only users can operate menus, modals, drawers, tabs, tree/sidebar, forms, and search.
- Focus indicator is visible and on-brand.
- Reduced motion disables all nonessential animation.
- Long prose has readable contrast without glow.

Risks:

- Implementing full ARIA tree behavior is nontrivial. If not complete, use simpler nav/list semantics instead of tree roles.

### Phase 8: Consumer migration examples and cleanup

Goal: make the refactor usable by your blog/wiki/course/admin project.

Files likely affected:

- `README.md`
- `MIGRATION.md`
- `docs/**`
- `examples/**`
- package exports
- legacy aliases

Exact tasks:

1. Add `MIGRATION.md` from `0.3.x` to the refactored version.
2. Add import examples for root and subpath exports.
3. Add examples for personal blog, wiki page, course landing, admin dashboard, and editor.
4. Add deprecation table for old internal paths/names.
5. Remove dead internal duplicate files after tests pass.
6. Run package validation and `npm pack` inspection.

Acceptance criteria:

- A consumer can build a blog post with `SiteShell`, `Post`, `TableOfContents`, `Prose`, `CodeBlock`, and `Callout` using documented snippets.
- A consumer can build admin login/dashboard/editor flows using documented snippets.
- All compatibility aliases are documented.
- Package size and dependency graph improve or at least do not regress.

Risks:

- Removing legacy too early can break existing personal site consumers. Use one release of deprecation before deletion.

## 11. Acceptance Criteria

The refactor is done only when:

- No duplicated layout/component responsibility remains without a documented reason.
- All important components have correct Storybook docs.
- Show-code examples match rendered previews.
- Components are grouped by Atomic Design category.
- Tokens replace hardcoded repeated values.
- Public exports are clean.
- Root import does not force optional/heavy feature dependencies.
- `dist/phosphor.css` includes all required static CSS or imports it.
- Blog/wiki/course/admin use cases are supported by documented examples.
- Accessibility basics pass for forms, overlays, navigation, tabs, menus, tree/sidebar, and notifications.
- Existing phosphor green terminal identity, CRT feel, animations, ASCII support, and dense technical mood are preserved.
- Reduced motion/reduced effects can disable harmful animations and scanline/noise effects.
- Existing root imports continue to work or have documented aliases.
- Package metadata points to the correct repository/homepage/issues URLs.

## 12. Codex Implementation Prompts

Run these one by one. Do not ask Codex to rewrite the whole library at once.

### Prompt 1: inventory

```md
You are working in the @sektant1/phosphor-ui repository.

Create a repository audit inventory before changing code.

Tasks:
1. Inspect package.json, rollup config, tsconfig files, Storybook config, scripts, src/components, src/styles, src/foundations, src/hooks, src/utils, tests, and stories.
2. Create docs/audit/component-inventory.md with a table:
   - current source path
   - exported name(s)
   - props type(s)
   - current category/folder
   - style file path
   - story file path if any
   - test file path if any
   - dependencies imported by the component
   - proposed atomic category
   - migration action: keep/rename/move/split/merge/deprecate/delete
3. Create docs/audit/public-api-inventory.md with:
   - package exports
   - root exports
   - namespace exports
   - deep import behavior
   - optional/heavy dependencies pulled by root import
   - CSS output model
4. Verify whether the source repo has components not present in the published package, especially PageLayout/PostLayout/Shell duplicates.
5. Do not move files yet.

Acceptance criteria:
- npm run typecheck passes before and after.
- Inventory references real source paths.
- Every public export is accounted for.
```

### Prompt 2: public API and build output safety

```md
Using docs/audit/public-api-inventory.md, refactor package entry points safely.

Goals:
- Keep root exports working.
- Add subpath exports for atoms, molecules, organisms, templates, content, admin, foundations, hooks, and video if needed.
- Prevent root import from requiring @mdx-js/react, figlet, shiki, or video.js at module load unless absolutely necessary.
- Extract component CSS into static CSS files instead of runtime style-inject.

Tasks:
1. Update rollup config to preserve modular entry points or generate group-level entry bundles.
2. Extract component CSS into dist/styles/components.css.
3. Update src/styles/phosphor.css so it imports fonts, tokens, typography, global, and components CSS in order.
4. Update package.json exports with group subpaths and CSS subpaths.
5. Move VideoPlayer to an isolated entry if video.js is otherwise pulled into root.
6. Move MDX-specific runtime imports behind content/mdx entry or dynamic import so @mdx-js/react remains truly optional.
7. Update README import examples.

Acceptance criteria:
- import { Button } from "@sektant1/phosphor-ui" does not require @mdx-js/react or video.js at runtime.
- import "@sektant1/phosphor-ui/phosphor.css" includes component styles.
- npm run validate:package passes.
- npm pack includes all required dist CSS files.
```

### Prompt 3: token cleanup

```md
Refactor design tokens without changing the visual identity.

Tasks:
1. Add semantic tokens for danger, warning, status, alpha overlays, layout widths, breakpoints, motion durations/easing, card/thumb/sidebar/TOC sizes.
2. Update src/foundations/tokens metadata so new tokens are exported.
3. Replace repeated hardcoded reds, alpha greens, breakpoints, component thumbnail sizes, sidebar widths, and transition durations in component styles.
4. Keep legacy raw tokens only in token definition files for compatibility.
5. Add docs/stories for tokens if missing.

Constraints:
- Do not make the library look like generic SaaS UI.
- Preserve phosphor green terminal/CRT identity.
- Do not change component APIs in this phase.

Acceptance criteria:
- npm run typecheck passes.
- Storybook visual differences are intentional and documented.
- No component stylesheet uses hardcoded danger colors when a token exists.
```

### Prompt 4: atomic folder migration

```md
Migrate the internal component source tree to real Atomic Design categories while preserving public exports.

Use docs/audit/component-inventory.md and the PLAN.md as the source of truth.

Tasks:
1. Move misplaced components:
   - Post page/template to templates/PostTemplate internally.
   - SiteShell preset to templates/SiteShell internally.
   - CourseCard to organisms.
   - HeaderNav to molecules if appropriate.
   - Tooltip to molecules.
   - PostFrontmatter to content if appropriate.
2. Keep root exports stable.
3. Add compatibility re-exports for old internal paths only where necessary.
4. Update all internal imports.
5. Update Storybook titles to new Atomic hierarchy.
6. Remove components/pages as a production component category; reserve pages for examples only.

Acceptance criteria:
- npm run typecheck passes.
- npm run build passes.
- Root imports from README still compile.
- Atoms do not import molecules/organisms/templates.
```

### Prompt 5: component split/merge pass

```md
Create composable primitives and remove duplicated component responsibility.

Tasks:
1. Split Input/Textarea/Select/Checkbox/Switch into low-level controls and field wrappers.
2. Keep existing Input/Textarea/Select/Checkbox/Switch exports as compatibility aliases to the field wrappers.
3. Create shared Field, FieldLabel, FieldHint, FieldError, ControlFrame primitives/molecules.
4. Update LoginForm and admin ContentEditor to use the shared form primitives.
5. Split Glyph atom from GlyphGallery/Glyphs organism.
6. Extract shared list primitives where ArticleList, RelatedPosts, SearchResultList, PostListing, and List duplicate behavior.
7. Do not over-abstract visual cards. Preserve their theme.

Acceptance criteria:
- Old public component examples still work.
- New low-level controls can be used without labels/help/error.
- Storybook has stories for both control primitives and field wrappers.
```

### Prompt 6: Storybook docs repair

```md
Repair Storybook documentation and show-code output across the library.

Tasks:
1. Audit all stories and docs pages.
2. Group stories by Foundations, Atoms, Molecules, Organisms, Templates, Pages.
3. Ensure every important public component has Default, Variants, States, RealContent, Responsive, and Accessibility notes where applicable.
4. Replace all show-code snippets with real client React usage code matching the rendered preview exactly.
5. Do not show JSON/config dumps unless the public component is actually config-driven.
6. Update scripts/audit-story-sources.mjs to fail on stale/missing/wrong source snippets.
7. Add composed examples for personal blog, wiki page, course landing page, admin dashboard, and admin editor.

Acceptance criteria:
- npm run audit:story-sources passes.
- npm run build-storybook -- --quiet passes.
- Show-code examples use public imports and match previews.
```

### Prompt 7: accessibility pass

```md
Perform an accessibility pass without removing the phosphor terminal identity.

Tasks:
1. Add shared internal a11y utilities: composeRefs, useControllableState, useEscapeKey, useFocusTrap, useScrollLock, useId helpers where needed.
2. Modal/Drawer: add focus trap, return focus, scroll lock, aria-labelledby/describedby, Escape behavior, overlay click safety.
3. DropdownMenu: add aria-haspopup, aria-expanded, aria-controls, roving keyboard navigation, Home/End, Escape, disabled behavior.
4. Tabs: verify keyboard behavior and id/aria wiring.
5. NerdTree: either implement full tree keyboard behavior or replace tree roles with nav/list semantics.
6. Forms: verify label/help/error aria wiring and native form semantics.
7. Toast: verify aria-live/role behavior.
8. CRT/effects: add data-pho-effects reduced/off mode and make reduced-motion cover all component animations.
9. Add Storybook accessibility notes and tests for affected components.

Acceptance criteria:
- Keyboard-only navigation works for overlays, menus, tabs, tree/sidebar, forms, and search.
- Focus styles are visible and on-brand.
- Reduced motion/effects modes work.
- npm run validate passes.
```

### Prompt 8: final cleanup and migration docs

```md
Finalize the refactor and prepare the package for consumer migration.

Tasks:
1. Add MIGRATION.md covering old internal paths/names and new paths/names.
2. Update README with root imports, subpath imports, CSS imports, blog/wiki/course/admin examples.
3. Add deprecation notes for aliases retained for compatibility.
4. Remove dead files confirmed unused by inventory and tests.
5. Verify package repository/homepage/issues metadata points to the correct GitHub repo.
6. Run npm run validate and npm pack.
7. Inspect packed files and confirm dist contains JS, types, CSS, README, LICENSE, and no unnecessary source artifacts.

Acceptance criteria:
- npm run validate passes.
- npm pack output is correct.
- README quick start works in a clean test app.
- Existing visual identity is preserved.
```
