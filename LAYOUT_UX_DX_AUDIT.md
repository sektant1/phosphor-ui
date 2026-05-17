# Layout UX/DX Audit

## Executive Summary

The current layout system is promising but not yet good enough as the obvious professional path for building the intended products. A developer can build attractive CRT/blog/wiki/admin screens with this library, but they still need to understand overlapping shells, hardcoded responsive behavior, product-specific templates, and scattered Storybook patterns.

The strongest part is `src/components/templates/Layout/Layout.tsx`: it now provides real primitives such as `Container`, `Stack`, `Inline`, `Cluster`, `Grid`, `AutoGrid`, `ResponsiveColumns`, `DashboardGrid`, `PageShell`, `SidebarLayout`, `Panel`, `Section`, `ContentShell`, `ContentWidth`, `ContentFrame`, `AppShell`, `SplitLayout`, and `SplitPane`. The weak part is that those primitives still compete with older or more opinionated APIs: `MainframeLayout`, `PostLayout`, `WikiLayout`, `CourseLayout`, `AdminLayout`, `SiteShell`, `Post`, and `AdminShell`.

Implementation status: this pass added the missing primitive wrappers/aliases, added `left`/`main`/`right` plus `collapseAt` to `SidebarLayout`, marked legacy mainframe wrappers as deprecated in code comments, refreshed declarations, and updated README/Storybook examples toward the primitive API. Remaining work is deeper product-shell refactoring and visual/mobile regression coverage.

## Final User Experience Problems

- `MainframeLayout` creates strong desktop blog/wiki/course layouts, but its mobile behavior is too coupled to `NerdTree`. In `src/components/templates/MainframeLayout/MainframeLayout.module.scss`, the left panel is moved to `grid-area: main` and set to `width: 0` at `max-width: 880px`. That hides generic left-nav content unless the panel itself provides a drawer/mobile UI.
- `TableOfContents` is useful on desktop, but `src/components/molecules/TableOfContents/TableOfContents.module.scss` has no mobile-specific collapsed, sticky-in-page, or summary pattern. In right rails it becomes a below-content panel, which is usable but not ideal for docs-like pages.
- `SidebarLayout` now has a `collapseAt` prop, but panel ordering is still fixed to left/main/right in source order. A docs layout, blog layout, and admin layout may still need explicit mobile order controls.
- `AdminShell` in `src/components/admin/AdminShell/AdminShell.module.scss` uses a separate right-rail flex layout, nested scroll (`max-height: 100vh; overflow-y: auto`), and a custom mobile collapse at `880px`. It does not inherit the newer shared shell behavior.
- Header behavior is visually strong but opinionated. `src/components/organisms/Header/Header.scss` hides locale/status controls on mobile and switches between desktop/mobile nav render paths. This can be fine for personal sites, but docs/admin products need explicit mobile nav decisions.
- Touch target guarantees are not consistent. `src/components/atoms/Button/Button.module.scss` has `min-height: var(--pho-size-touch-target)` commented out, while the design tokens define `--pho-size-touch-target`.
- Some Storybook page examples use inline margins and layout widths, which can produce polished examples but does not prove that the library itself creates aligned final products without custom CSS.

## Developer Experience Problems

- The public API is flat and crowded. `src/components/index.ts` exports primitives, templates, content components, admin editors, media components, hooks-adjacent utilities, and presets from one namespace.
- There is no clear API hierarchy in docs: core layout primitives, product presets, admin/CMS presets, CRT effects, and content components are presented too similarly.
- Developers have several ways to solve the same layout problem:
  - `SidebarLayout` vs `MainframeLayout`.
  - `Panel` vs `ContextPanel`.
  - `PageShell`/`ContentFrame` vs `Post`/`PostLayout`.
  - `AppShell` vs `SiteShell` vs `AdminShell`.
- `SidebarLayout` now supports the readable `left`, `main`, and `right` slot names while preserving legacy `sidebar`, `aside`, and `children`.
- `Grid` supports `minItemWidth`, and `AutoGrid` now exposes that behavior as a named API.
- Layout stories still teach escape-hatch CSS. `src/components/templates/Layout/Layout.stories.tsx` uses inline `style={{ width: "min(...)" }}` for common constraints that should be handled by `Container`, `PageShell`, or a content-width primitive.
- Composed examples are too shallow for the intended products. `src/stories/ComposedExamples.stories.tsx` demonstrates `SiteShell` plus content, but not full docs/wiki left-nav/main/right-TOC composition.

## Missing Layout Primitives

Existing primitives cover much of the required foundation. This pass added or clarified:

- `AutoGrid`: alias/wrapper for `Grid minItemWidth`, making responsive card/list grids discoverable.
- `ResponsiveColumns`: explicit primitive for fixed column count on desktop with tokenized collapse behavior.
- `DashboardGrid`: admin/stat/card grid with dense spacing, equal-height cards, and mobile ordering.
- `ContentShell`: focused page content wrapper combining width, vertical rhythm, and optional header.
- `ContentWidth`: small utility/wrapper for prose/content/full constraints without a full `Container`.
- `SplitLayout`: clearer public name or alias for `SplitPane`.

Still missing or intentionally deferred:

- `MainFrame`: if the CRT/mainframe concept remains public, rebuild it on top of primitives or keep it as a themed recipe.

Do not add abstractions for their own sake. `Container`, `Stack`, `Inline`, `Cluster`, `Grid`, `SidebarLayout`, `PageShell`, `AppShell`, `Panel`, and `Section` should remain the core vocabulary.

## Responsive Problems

- Breakpoint policy is fragmented:
  - `Layout.module.scss`: `720px` and `880px`.
  - `MainframeLayout.module.scss`: `1120px`, `960px`, `880px`, `620px`.
  - `AdminShell.module.scss`: `880px`.
  - `SiteShell.module.scss`: `520px`.
  - Component CSS modules use additional local breakpoints such as `560px`, `520px`, `480px`, `420px`, `380px`, and `360px`.
- Repeated media queries should become documented tokens or component props where they affect layout composition.
- `SidebarLayout` has configurable collapse behavior; panel order controls are still missing.
- `MainframeLayout` needs a reliable mobile path for any left panel, not only `NerdTreeSidebar`.
- Right TOC behavior needs an intentional mobile pattern.
- Admin layouts need a shared mobile strategy for nav, action panels, stats, and editors.
- Current examples should be tested at:
  - small mobile: `320px-375px`.
  - normal mobile: `390px-430px`.
  - tablet: `768px-1024px`.
  - laptop: `1280px-1440px`.
  - wide desktop: `1600px+`.

## Modularity Problems

### Public API Modularity

- `src/components/index.ts` is convenient but not modular. It now exposes the improved layout primitives, but it still mixes core primitives, product templates, admin editors, content/MDX helpers, and media-heavy components.
- There are no JS subpath exports in `package.json` for `layout`, `content`, `admin`, `presets`, or `effects`.
- `src/components/templates/index.ts` exports `Layout`, `MainframeLayout`, `PostTemplate`, and `SiteShell` together, which blurs the difference between generic primitives and product/page templates.

### Build Modularity

- `rollup.config.mjs` has a single JS entry point: `src/index.ts`.
- The package exports root JS plus CSS files only. Consumers cannot import a focused JS module like `phosphor-ui/layout`.
- `preserveClientDirective()` prepends `"use client"` to the entry chunk, making the package feel all-client even though some primitives and content components could be SSR-safe.

### CSS Modularity

- `src/styles/phosphor.css` imports `fonts.css`, `tokens.css`, `typography.css`, `global.css`, and `components.css`.
- Advanced consumers can import separate CSS files, but component CSS is extracted into one `components.css`; there is no per-component or per-domain CSS entry.
- Global styling, body defaults, scrollbars, typography, component CSS, and decorative CRT/effect utilities need clearer opt-in boundaries.

### Dependency Modularity

- `shiki`, `figlet`, and `video.js` are specialized dependencies. They are externalized in Rollup, but they still affect consumer expectations.
- `CodeBlock`, `AsciiBanner`, and `VideoPlayer` should be documented as heavier/specialized modules or moved behind future subpath exports.

### Folder Modularity

- Folder layering is mostly understandable (`atoms`, `molecules`, `organisms`, `templates`, `admin`, `content`), but several concepts are duplicated or aliased across layers:
  - `CourseCard` exists under both `molecules` and `organisms`.
  - `PostFrontmatter` exists under both `content` and `molecules`.
  - `HeaderNav` exists under both `molecules` and `organisms`.
  - `components/presets/SiteShell` re-exports `templates/SiteShell`.
  - `components/pages/Post` re-exports `templates/PostTemplate`.
- These aliases may be useful for compatibility, but docs should name one canonical location/API.

## Bloat / Duplication

- `MainframeLayout` and `SidebarLayout` solve overlapping left/main/right composition problems.
- `ContextPanel` and `Panel` solve overlapping framed side-panel problems.
- `Post`, `PostLayout`, `PostTemplate`, `ContentFrame`, and `PostBody` overlap in content-shell responsibility.
- `AdminShell` duplicates app-shell/sidebar/dashboard behavior instead of composing `AppShell`, `SidebarLayout`, `Panel`, `Stack`, and `Grid`.
- Storybook examples in `src/components/pages/SitePages.stories.tsx` and `src/stories/ComposedExamples.stories.tsx` show page layouts with inline grid widths, custom margins, and page frames rather than the public layout system.

## Removed / Deprecated Layouts

No files should be removed immediately without a deprecation pass because several old layouts are publicly exported.

| Component/file | Decision | Reason | Replacement | Migration note |
|---|---|---|---|---|
| `MainframeLayout` | Deprecate, then refactor/convert to recipe | Duplicates `SidebarLayout` and hardcodes product variants | `PageShell` + `SidebarLayout` + `ContentFrame` + `Panel` | Keep for one release cycle with docs warning |
| `PostLayout` | Deprecate | Thin variant wrapper over `MainframeLayout` | `Post` rebuilt on primitives or recipe composition | Migrate `leftPanel`/`rightPanel` to `SidebarLayout` slots |
| `WikiLayout` | Convert to example | Useful product recipe but not a primitive | `PageShell` + `SidebarLayout` + `NerdTree` + `TableOfContents` | Publish as docs/wiki recipe |
| `CourseLayout` | Convert to example | Product-specific | `PageShell` + `SidebarLayout` + `DashboardGrid`/`Panel` | Publish as course recipe |
| `AdminLayout` | Deprecate | Conflicts with `AdminShell` and shared primitives | `AppShell`/`AdminShell` rebuilt on primitives | Avoid two admin layout paths |
| `ContextPanel` | Refactor or deprecate | Overlaps with `Panel` | `Panel density="compact"` | Add context/right-rail panel example |
| `NerdTreeSidebar` | Convert to example | Too specific for core layout API | `NerdTree` inside `Panel`/left slot | Keep as recipe if widely used |
| `SplitPane` | Keep, possibly alias | Useful primitive but naming is less product-friendly | `SplitLayout` alias | Avoid breaking existing imports |

## Layout API Cleanup

### Exports To Keep

- `Container`
- `Stack`
- `Inline`
- `Cluster`
- `Grid`
- `PageShell`
- `SidebarLayout`
- `Panel`
- `Section`
- `ContentFrame`
- `AppShell`
- `SplitPane`
- `SiteShell` as a preset, not a primitive

### Exports To Deprecate

- `MainframeLayout`
- `PostLayout`
- `WikiLayout`
- `CourseLayout`
- `AdminLayout`
- `ContextPanel` if `Panel` receives the needed right-rail styling

### New Recommended Layout Exports

- `AutoGrid`
- `ResponsiveColumns`
- `DashboardGrid`
- `ContentShell`
- `ContentWidth`
- `SplitLayout` as alias or successor to `SplitPane`

These exports are now implemented from `src/components/templates/Layout` and re-exported from the root package.

### Future Modular Export Paths

Add subpath exports in a non-breaking release if possible:

```json
{
  "exports": {
    ".": "...",
    "./layout": "...",
    "./content": "...",
    "./admin": "...",
    "./presets": "...",
    "./effects": "..."
  }
}
```

Keep root exports for convenience, but document subpaths as the modular import path for larger apps.

## Recommended Public Layout API

Docs/wiki shell:

```tsx
<PageShell title="Packet capture checklist">
  <SidebarLayout
    left={<NavigationTree />}
    main={<PostContent />}
    right={<TableOfContents />}
    collapseAt="lg"
    sticky
  />
</PageShell>
```

Blog/portfolio grid:

```tsx
<Container size="content">
  <Stack gap="lg">
    <Section title="Latest Posts">
      <AutoGrid minItemWidth="18rem">
        ...
      </AutoGrid>
    </Section>
  </Stack>
</Container>
```

Admin dashboard:

```tsx
<AppShell sidebar={<AdminNav />} header={<AdminHeader />}>
  <PageShell title="Dashboard">
    <DashboardGrid minItemWidth="14rem">
      <Panel title="Drafts">12</Panel>
      <Panel title="Review">3</Panel>
    </DashboardGrid>
  </PageShell>
</AppShell>
```

Recommended common props:

- `as`
- `className`
- `style`
- `gap`
- `align`
- `justify`
- `columns`
- `minItemWidth`
- `maxWidth`
- `collapseAt`
- `sticky`
- `bleed`
- `density`

## Priority Plan

### P0 - Must Fix

- Add visual/mobile checks for no horizontal overflow at `320px`.
- Fix or document `MainframeLayout` mobile left-panel behavior.
- Provide a real mobile TOC pattern.
- Make one left/main/right layout API the recommended docs/wiki path. Implemented at the primitive API/docs level; legacy templates still need migration.
- Enforce or restore touch target sizing for primary controls.

### P1 - Should Fix

- Add `AutoGrid` or document `Grid minItemWidth` as the auto-grid API. Implemented.
- Add `collapseAt` and panel order controls to `SidebarLayout`. `collapseAt` implemented; panel order remains.
- Add `DashboardGrid`, `ContentShell`, and `ContentWidth`. Implemented.
- Refactor Storybook examples to use primitives instead of inline layout CSS. Partially implemented for layout primitive stories.
- Mark old layout wrappers as deprecated in docs and Storybook. Code comments implemented; docs/Storybook messaging still needs a broader pass.
- Document CSS import levels: full theme, tokens, typography, globals, components, effects. Implemented in README.

### P2 - Nice To Have

- Add JS subpath exports for layout/content/admin/presets/effects.
- Add container-query examples for card grids and dense dashboard panels.
- Split heavy/specialized components into documented modular areas.
- Add visual regression coverage at `320`, `390`, `768`, `1280`, and `1600px`.

## Acceptance Criteria

- No horizontal overflow at `320px`.
- Blog pages are readable on mobile.
- Wiki/docs layout works with left nav and right TOC.
- Admin dashboard works on mobile and desktop.
- Cards and rows align consistently.
- Layout spacing uses tokens instead of random values.
- Developers can build common pages without writing custom layout CSS.
- Flex/grid behavior is documented.
- Layout components have clear props and escape hatches.
- Obsolete layout/template/page shell components are removed, deprecated, or converted into examples.
- No obsolete layout/template/page shell remains exposed without reason.
- Duplicated layout abstractions are merged, removed, or deprecated.
- The recommended layout system is the obvious path for new consumers.
- Storybook/docs no longer promote old layout patterns.
- Public API boundaries and modular import paths are documented.
- CSS import levels are documented.
- All imports, exports, builds, and examples still work after cleanup.
