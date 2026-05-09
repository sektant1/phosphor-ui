# Atomic Design Refactor Plan for Phosphor UI

## Summary

Refactor `src/components` from a flat component list into an atomic design system while preserving the current phosphor visual language: tokens, colors, typography, glow effects, CRT animations, SCSS modules, and public root exports.

Use this target structure:

```text
src/components/
  atoms/
  molecules/
  organisms/
  templates/
  pages/
  admin/
  content/
  index.ts
```

Keep `src/styles/tokens.css`, `src/styles/global.css`, hooks, utilities, and animation classes as shared foundations. Do not redesign visuals unless needed to remove duplicated layout logic.

## Key Changes

- Preserve `@sektant1/phosphor-ui` root exports during the first migration pass.
- Move implementation files into atomic folders and update imports.
- Leave temporary compatibility re-export folders for old component paths where useful, then remove them in a later breaking release.
- Standardize layout composition around:
  - `Page` / `PageLayout` as the reusable template shell.
  - `Post` as a composed content page made from `PostHeader`, `PostBody`, `PostMeta`, `ShareBar`, `RelatedPosts`, `SeriesNav`, and sidebar components.
  - `PostLayout` becomes a deprecated alias/wrapper over the new `Page` or `Post` composition.
- Split large mixed-responsibility components, especially `ContentEditor`, into reusable form atoms/molecules before rebuilding feature editors on top.

## Atomic Inventory

Atoms:

- `Button`
- `Link`
- `Text`
- `Heading`, `H1`-`H6`
- `Hr`
- `Tag`
- `Input`
- `Textarea`
- `Checkbox`
- `Switch`
- `Select`
- `Avatar`
- `Glyph`
- `ProgressBar`
- `TerminalPrompt`
- `Tooltip`
- `StatPill`

Molecules:

- `Callout`
- `CalloutHeading`
- `FormField`
- `ContentStatusBadge`
- `DropdownMenu`
- `Tabs`
- `Breadcrumbs`
- `Pagination`
- `SearchResult`
- `PostMeta`
- `PostFrontmatter`
- `AuthorCard`
- `CourseCard`
- `LessonRow`
- `PrereqList`
- `TableOfContents`
- `ShareBar`
- `Stepper`
- `StepperFoot`
- `Timeline`
- `EmptyState`
- `Toast`
- `Modal`
- `Drawer`

Organisms:

- `Header`
- `Footer`
- `FooterStencil`
- `BootNav`
- `AsciiBanner`
- `Glyphs`
- `PdaWindow`
- `CrtShell`
- `NerdTree`
- `Search`
- `PostListing`
- `PostRow`
- `PostHeader`
- `PostBody`
- `RelatedPosts`
- `SeriesNav`
- `ModuleAccordion`
- `LessonList`
- `Exercise`
- `CodeBlock`
- `VideoPlayer`
- `ReadingRail`
- `HeroFrame`
- `LoginForm`

Templates:

- `Flex`
- `Grid`
- `Page`
- `PageLayout`
- `PostLayout` as deprecated compatibility wrapper
- `AdminShell`

Pages / Feature Compositions:

- `Post`
- `CourseOverview`-style compositions if promoted from demo usage
- `ContentEditor`
- `NoteEditor`
- `ProjectEditor`
- `CourseEditor`
- `LessonEditor`

Content / MDX:

- `mdxComponents`
- `PostBody`
- `Prose`
- `extractMdxCode`
- `phosphorTheme`

## Implementation Plan

1. Create atomic folder barrels:
   - `src/components/atoms/index.ts`
   - `src/components/molecules/index.ts`
   - `src/components/organisms/index.ts`
   - `src/components/templates/index.ts`
   - `src/components/pages/index.ts`
   - `src/components/admin/index.ts`
   - `src/components/content/index.ts`

2. Move component implementations into the new folders using `git mv`.
   - Keep each component's `.tsx`, `.module.scss` or `.scss`, stories, tests, and `index.ts` together.
   - Update relative imports to use the new atomic barrels where that reduces churn.
   - Keep SCSS class names and CSS custom properties unchanged unless a split requires local renaming.

3. Refactor layout duplication.
   - Introduce `Page` as the canonical template component.
   - Keep `PageLayout` as the exported implementation or alias for `Page`, depending on lowest churn.
   - Keep `PostLayout` as a thin deprecated wrapper.
   - Add a composed `Post` page component that accepts header/body/sidebar/footer-related props and composes existing smaller parts.

4. Split `ContentEditor`.
   - Extract private field rendering into reusable pieces:
     - `EditorShell`
     - `TagInput`
     - `PairListField`
     - `RepeaterField`
     - `StatusSelect`
   - Keep `ContentEditor` as the schema-driven organism/page composition.
   - Rebuild `NoteEditor`, `ProjectEditor`, `CourseEditor`, and `LessonEditor` as thin configs over `ContentEditor`.

5. Normalize exports.
   - Root `src/components/index.ts` should continue exporting all current public names.
   - Add grouped exports from atomic barrels.
   - Avoid changing `package.json` exports in the first pass unless adding documented subpath exports is explicitly desired.
   - Mark duplicate/legacy aliases with JSDoc `@deprecated`.

6. Update stories and tests.
   - Move stories with components.
   - Rename Storybook titles to atomic groups, for example `Atoms/Button`, `Molecules/PostMeta`, `Templates/Page`, `Pages/Post`.
   - Update tests to import from the public root export where possible.

## Test Plan

Run after implementation:

```bash
npm run typecheck
npm test
npm run build
npm run build-storybook
```

Add or update tests for:

- `Page` renders header, hero, sidebar left/right, children, and footer.
- `PostLayout` still renders through the new page template.
- `Post` composes `PostHeader`, `PostBody`, sidebar, and footer correctly.
- `ContentEditor` still supports text, textarea, tags, checkbox, pairs, list, status, auto slug, save, change, and discard behavior.
- Existing tests for `Header`, `Link`, `Pagination`, `Prose`, `SearchResult`, `Text`, and `ContentEditor` still pass.

## Assumptions

- Preserve all current colors, animations, typography tokens, glow effects, and SCSS module styling.
- Preserve root public exports for this refactor pass.
- Old duplicated components should become aliases or wrappers first, not hard removals, unless they are purely internal.
- Generated `types/` and `dist/` should not be edited manually; rebuild them through the package scripts.


consider that I will publish this UI library to use on personal wiki/blogs/websites/second-brain/; how can you improve
  this UI library components? in all aspects (code structure/easy of use/duplicated logic) for the consumers of the UI?
  now do with the pages/templates/content dirs (feel free to add more or remove duplicated logic / unused(folders/files
  aswell) and or add them to other components etc)

codex resume 019e0d83-90d2-7400-b353-200443c44d75
