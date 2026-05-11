# Atomic Design System Audit

## Summary

The current component library already has useful atomic folders, but the public export surface still mixes design-system primitives, content-specific organisms, page templates, visual CRT shells, and admin/editor workflows in one barrel. Several components duplicate lower-level behavior instead of composing it: layout wrappers overlap, post-related components repeat list/navigation semantics, editor components repeat form primitives, and visual-shell components each own local phosphor CRT details. The SCSS modules preserve a strong identity through colors, animation names, CSS variables, typography, glow/shadow behavior, and spacing rhythm; the migration should preserve those styles and move behavior by composition, not redesign.

Primary architecture issues:

- `src/components/index.ts` exports public UI components, page-level components, and admin workflows from one namespace.
- `content/` components (`Prose`, `MdxComponents`, `PostBody`, `CodeBlock`) function as typography foundations, molecules, and organisms but sit outside the target taxonomy.
- The generic page template has been removed; page-level composition now lives in concrete pages such as `Post`, while generic layout primitives remain in `templates/Layout`.
- `PostListing` exports a nested `PostRow`; `RelatedPosts`, `SeriesNav`, `StepperFoot`, and `SearchResult` also render adjacent/list-style post links.
- Admin/editor components are useful, but they are application/workflow specific. Shared editor subparts should be treated separately from the public design-system surface.
- Visual identity logic is scattered across `CrtShell`, `HeroFrame`, `FooterStencil`, `PdaWindow`, `AsciiBanner`, `Glyphs`, `CodeBlock`, and `Prose`; shared animation/tape/HUD/glyph behavior should become foundations only after exact visual preservation is guaranteed.

## Proposed Atomic Taxonomy

```txt
src/
  foundations/
    tokens/
    typography/
    glyphs/
    animation/
    effects/
  components/
    atoms/
    molecules/
    organisms/
    templates/
    pages/
```

## Component Classification Table

| Component | Current Path | Proposed Category | Action | Canonical Replacement | Reason |
|---|---|---|---|---|---|
| AdminShell | src/components/admin/AdminShell | Templates | MOVE | Templates/AdminShell | Layout shell around admin navigation/content; composed from `Grid` and `Flex`, not a public atom/molecule. |
| ContentEditor | src/components/admin/ContentEditor | Organisms | SPLIT | Organisms/ContentEditor + admin molecules | Generic schema-driven editor mixes form orchestration, status handling, auto-slug logic, and row/tag field rendering. |
| EditorShell | src/components/admin/ContentEditor | Templates | SPLIT | Templates/EditorShell | Layout/card shell for editor workflows; reusable if separated from `ContentEditor.module.scss` carefully. |
| PairListField | src/components/admin/ContentEditor | Molecules | SPLIT | Molecules/PairListField | Reusable repeated pair field; currently hidden inside admin workflow styling. |
| RepeaterField | src/components/admin/ContentEditor | Molecules | SPLIT | Molecules/RepeaterField | Reusable repeated list field; should not require full `ContentEditor`. |
| StatusSelect | src/components/admin/ContentEditor | Molecules | MERGE | Atoms/Select or Molecules/StatusSelect | Native select overlaps with `Select`; either wrap `Select` or keep admin-specific status molecule. |
| TagInput | src/components/admin/ContentEditor | Molecules | SPLIT | Molecules/TagInput | Composes input behavior and `Tag`; useful beyond admin if generalized. |
| CourseEditor | src/components/admin/CourseEditor | Pages | KEEP | Pages/CourseEditor | High-level admin workflow preset around `ContentEditor`; app/content semantic. |
| LessonEditor | src/components/admin/LessonEditor | Pages | KEEP | Pages/LessonEditor | High-level admin workflow preset around `ContentEditor`; app/content semantic. |
| NoteEditor | src/components/admin/NoteEditor | Pages | KEEP | Pages/NoteEditor | High-level admin workflow preset with story and public export; app/content semantic. |
| ProjectEditor | src/components/admin/ProjectEditor | Pages | KEEP | Pages/ProjectEditor | High-level admin workflow preset with story and public export; app/content semantic. |
| Avatar | src/components/atoms/Avatar | Atoms | KEEP | Atoms/Avatar | Small identity primitive; `AuthorCard` duplicates fallback behavior and should consume it. |
| Button | src/components/atoms/Button | Atoms | KEEP | Atoms/Button | Correctly scoped primitive action control with variants and sizes. |
| Checkbox | src/components/atoms/Checkbox | Atoms | KEEP | Atoms/Checkbox | Small boolean input primitive; used by `Exercise`. |
| Heading, H1-H6 | src/components/atoms/Headings | Atoms | KEEP | Atoms/Heading | Heading primitive with glyph support; typography tokens should remain foundation-level, component remains atom. |
| Hr | src/components/atoms/Hr | Atoms | KEEP | Atoms/Hr | Single separator primitive. |
| Input | src/components/atoms/Input | Atoms | KEEP | Atoms/Input | Correctly scoped text input primitive. |
| Textarea | src/components/atoms/Input | Atoms | KEEP | Atoms/Textarea | Primitive control currently colocated with `Input`; okay to keep colocated or split later. |
| Link | src/components/atoms/Link | Atoms | KEEP | Atoms/Link | Primitive anchor styling; global `.pho-link` SCSS should be preserved. |
| ProgressBar | src/components/atoms/ProgressBar | Atoms | KEEP | Atoms/ProgressBar | Primitive progress indicator; several components hand-roll progress visuals and should compose it. |
| Select | src/components/atoms/Select | Atoms | KEEP | Atoms/Select | Primitive select control. |
| StatPill | src/components/atoms/StatPill | Molecules | MOVE | Molecules/StatPill | It composes label/value status semantics, not just a raw primitive. |
| Tag | src/components/atoms/Tag | Atoms | KEEP | Atoms/Tag | Primitive chip/label. |
| TerminalPrompt | src/components/atoms/TerminalPrompt | Atoms | KEEP | Atoms/TerminalPrompt | Small terminal text row; `Footer` repeats this visual behavior. |
| Text | src/components/atoms/Text | Atoms | KEEP | Atoms/Text | Primitive text variant wrapper. |
| Tooltip | src/components/atoms/Tooltip | Molecules | MOVE | Molecules/Tooltip | Trigger cloning plus portal positioning is a behavior composition, not a simple atom. |
| CodeBlock | src/components/content/CodeBlock | Molecules | MOVE | Molecules/CodeBlock | Code panel composes header, Shiki highlighting, copy action, and fallback rendering. |
| phosphorTheme | src/components/content/CodeBlock | Foundations | EXTRACT FOUNDATION | Foundations/SyntaxTheme | Reusable syntax theme/token mapping; preserve exact colors and token styles. |
| extractMdxCode | src/components/content/CodeBlock | Foundations | EXTRACT FOUNDATION | Foundations/MDX utilities | Parsing utility is not a visual component. |
| mdxComponents | src/components/content/MdxComponents | Foundations | EXTRACT FOUNDATION | Foundations/MDX components map | Shared MDX element mapping; should remain stable and compose canonical components. |
| PostBody | src/components/content/MdxComponents | Organisms | MOVE | Organisms/PostBody | Large content section combining MDX provider, frontmatter, `Prose`, callouts, code, and exercises. |
| Prose | src/components/content/Prose | Foundations | MOVE | Foundations/Typography/Prose | Typography wrapper with global post body styles; preserve all selectors and rhythm. |
| AuthorCard | src/components/molecules/AuthorCard | Organisms | MOVE | Organisms/AuthorCard | Full author summary section with avatar, role, bio, links; should compose `Avatar` and `Link`. |
| Breadcrumbs | src/components/molecules/Breadcrumbs | Molecules | KEEP | Molecules/Breadcrumbs | Focused navigation molecule. |
| Callout | src/components/molecules/Callout | Molecules | KEEP | Molecules/Callout | Focused in-content notice composition. |
| CalloutHeading | src/components/molecules/Callout | Atoms | SPLIT | Atoms/CalloutHeading or Heading variant | Heading helper is independent from callout frame; split only if reused. |
| CourseCard | src/components/molecules/CourseCard | Organisms | MOVE | Organisms/CourseCard | Course summary card with art, progress, CTA, and lock state; more content-specific than a molecule. |
| DropdownMenu | src/components/molecules/DropdownMenu | Molecules | KEEP | Molecules/DropdownMenu | Focused trigger/menu behavior. |
| EmptyState | src/components/molecules/EmptyState | Molecules | KEEP | Molecules/EmptyState | Focused feedback composition with optional action. |
| FormField | src/components/molecules/FormField | Molecules | KEEP | Molecules/FormField | Label/control/error/hint composition. |
| ContentStatusBadge | src/components/molecules/FormField | Molecules | SPLIT | Molecules/ContentStatusBadge | Content workflow badge is unrelated to generic form field layout. |
| LessonRow | src/components/molecules/LessonRow | Molecules | KEEP | Molecules/LessonRow | Focused list item for lesson navigation. |
| LessonList | src/components/molecules/LessonRow | Molecules | KEEP | Molecules/LessonList | Simple list wrapper; acceptable colocated with `LessonRow`. |
| Modal | src/components/molecules/Modal | Molecules | KEEP | Molecules/Modal | Overlay composition with dialog behavior. |
| Drawer | src/components/molecules/Modal | Molecules | SPLIT | Molecules/Drawer | Drawer has separate props/behavior and is consumed by `NerdTree`. |
| Pagination | src/components/molecules/Pagination | Molecules | KEEP | Molecules/Pagination | Focused previous/next pagination molecule. |
| PostFrontmatter | src/components/molecules/PostFrontmatter | Molecules | KEEP | Molecules/PostFrontmatter | Focused frontmatter display; composed by `PostBody`. |
| PostMeta | src/components/molecules/PostMeta | Molecules | KEEP | Molecules/PostMeta | Focused post metadata line. |
| PrereqList | src/components/molecules/PrereqList | Molecules | KEEP | Molecules/PrereqList | Focused prerequisite list composition. |
| SearchResult | src/components/molecules/SearchResult | Molecules | KEEP | Molecules/SearchResult | Focused result item. |
| SearchResultList | src/components/molecules/SearchResult | Molecules | KEEP | Molecules/SearchResultList | Focused list wrapper with empty state. |
| ShareBar | src/components/molecules/ShareBar | Molecules | KEEP | Molecules/ShareBar | Focused share/copy action group. |
| Stepper | src/components/molecules/Stepper | Molecules | KEEP | Molecules/Stepper | Focused breadcrumb/step nav molecule. |
| StepperFoot | src/components/molecules/Stepper | Molecules | SPLIT | Molecules/AdjacentNav | Previous/next footer overlaps with `SeriesNav`; split or merge after usage review. |
| TableOfContents | src/components/molecules/TableOfContents | Organisms | MOVE | Organisms/TableOfContents | Scroll spy, nested hierarchy, smooth scrolling, and document-section behavior make it larger than a molecule. |
| Tabs | src/components/molecules/Tabs | Molecules | KEEP | Molecules/Tabs | Focused tablist/panel behavior. |
| Timeline | src/components/molecules/Timeline | Molecules | KEEP | Molecules/Timeline | Focused chronological list. |
| Toast | src/components/molecules/Toast | Molecules | KEEP | Molecules/Toast | Focused transient feedback component. |
| useToast | src/components/molecules/Toast | Foundations | EXTRACT FOUNDATION | Foundations/Feedback hooks | Hook is reusable behavior and should be exported separately if public. |
| AsciiBanner | src/components/organisms/AsciiBanner | Molecules | MOVE | Molecules/AsciiBanner | Focused text-art banner used by `Header`; not a full section by itself. |
| BootNav | src/components/organisms/BootNav | Molecules | MOVE | Molecules/BootNav | Small navigation molecule; `Header` duplicates its nav logic. |
| CrtShell | src/components/organisms/CrtShell | Templates | MOVE | Templates/CrtShell | Structural visual wrapper/effects shell; preserve all overlay animations. |
| Exercise | src/components/organisms/Exercise | Organisms | KEEP | Organisms/Exercise | Larger content section using checkbox tasks and progress state. |
| Footer | src/components/organisms/Footer | Organisms | KEEP | Organisms/Footer | Site footer landmark organism. |
| FooterStencil | src/components/organisms/FooterStencil | Organisms | KEEP | Organisms/FooterStencil | Rich branded footer organism; overlaps with `Footer` but materially different. |
| Glyphs | src/components/organisms/Glyphs | Foundations | SPLIT | Foundations/Glyphs + Atoms/Glyph | Catalog is documentation/foundation; inline `Glyph` is an atom. |
| Glyph | src/components/organisms/Glyphs | Atoms | SPLIT | Atoms/Glyph | Inline glyph primitive should be exported from atoms. |
| Header | src/components/organisms/Header | Organisms | KEEP | Organisms/Header | Site header organism composed from banner, nav, locale switch, and rule. |
| HeroFrame | src/components/organisms/HeroFrame | Organisms | KEEP | Organisms/HeroFrame | Large media/hero frame with HUD helpers and scanline behavior. |
| HeroFrame HUD helpers | src/components/organisms/HeroFrame | Molecules | SPLIT | Molecules/Hud* | Static helper components are reusable display molecules if used outside `HeroFrame`. |
| LoginForm | src/components/organisms/LoginForm | Organisms | KEEP | Organisms/LoginForm | Complete form section composed from `Input` and `Button`. |
| ModuleAccordion | src/components/organisms/ModuleAccordion | Organisms | MERGE | Organisms/ModuleAccordion using LessonRow + ProgressBar | Keeps organism role but should stop duplicating lesson/progress rendering. |
| NerdTree | src/components/organisms/NerdTree | Organisms | KEEP | Organisms/NerdTree | Responsive content tree with drawer behavior and tree state. |
| PdaWindow | src/components/organisms/PdaWindow | Molecules | MOVE | Molecules/PdaWindow | Reusable framed panel; not a full organism. |
| PostHeader | src/components/organisms/PostHeader | Organisms | KEEP | Organisms/PostHeader | Post-specific content section composed from heading, tags, metadata, and extra actions. |
| PostListing | src/components/organisms/PostListing | Organisms | SPLIT | Organisms/PostList + Molecules/PostListItem | Current file owns wrapper, header row, row item, thumbnail/fallback rendering. |
| PostRow | src/components/organisms/PostListing | Molecules | SPLIT | Molecules/PostListItem | Exported row item should be independently placed. |
| ReadingRail | src/components/organisms/ReadingRail | Atoms | MOVE | Atoms/ReadingRail | Single visual progress rail. |
| RelatedPosts | src/components/organisms/RelatedPosts | Organisms | KEEP | Organisms/RelatedPosts | Post recommendation section. |
| Search | src/components/organisms/Search | Organisms | KEEP | Organisms/Search | Input plus filtering/highlighting and result list. |
| SeriesNav | src/components/organisms/SeriesNav | Molecules | MOVE/MERGE | Molecules/AdjacentNav or Molecules/SeriesNav | Focused adjacent navigation; overlaps with `StepperFoot`. |
| VideoPlayer | src/components/organisms/VideoPlayer | Organisms | KEEP | Organisms/VideoPlayer | Large video.js integration and media figure. |
| Post | src/components/pages/Post | Pages | KEEP | Pages/PostPage | Full page-level composition of `PostHeader` and `PostBody`. |
| Flex | src/components/templates/Layout | Templates | KEEP | Templates/Layout/Flex | Layout primitive; template-level because it controls composition structure. |
| Grid | src/components/templates/Layout | Templates | KEEP | Templates/Layout/Grid | Layout primitive; template-level because it controls composition structure. |

## Duplicate / Overlap Report

### Page Layout Overlap

Components:

- `Post`

Finding:

The generic `Page` template was removed. `Post` is now the page-level component that composes `PostHeader` and `PostBody` directly.

Recommendation:

- Keep `Post` as `Pages/PostPage`.

Migration risk: medium. Page layout changes can affect content pages and sidebar/sticky behavior. Preserve legacy demo visual parity in Storybook.

### Post Content Rendering Overlap

Components:

- `Prose`
- `mdxComponents`
- `PostBody`
- `CodeBlock`
- `PostFrontmatter`
- `Callout`
- `Exercise`

Finding:

`Prose` owns global post typography and rhythm. `mdxComponents` maps MDX tags to design-system components. `PostBody` composes the provider, frontmatter, and prose wrapper. `CodeBlock`, `Callout`, and `Exercise` are embedded content components.

Recommendation:

- Treat `Prose` and `mdxComponents` as foundations/content infrastructure.
- Keep `PostBody` as the organism for rendered post body.
- Keep `CodeBlock`, `PostFrontmatter`, `Callout`, and `Exercise` as composable lower-level pieces.
- Extract only utilities/theme maps; do not alter selectors, typography, colors, or code block syntax theme.

Migration risk: high. Global prose selectors and MDX behavior directly affect rendered content.

### Post List And Adjacent Navigation Overlap

Components:

- `PostListing`
- `PostRow`
- `RelatedPosts`
- `SeriesNav`
- `StepperFoot`
- `Pagination`
- `SearchResult`

Finding:

Several components render links to posts or adjacent content. `PostRow` is an exported molecule but nested inside an organism. `SeriesNav` and `StepperFoot` both model previous/next navigation. `RelatedPosts` and `SearchResult` both render compact post cards/list items with title, date, tags, and href.

Recommendation:

- Split `PostRow` into a molecule such as `PostListItem`.
- Keep `PostListing` as the organism around a list of `PostListItem`.
- Define `SeriesNav` as series-specific adjacent navigation or merge it into a generic `AdjacentNav` with a series variant.
- Keep `Pagination` separate for paginated archives.
- Keep `SearchResult` separate for search-specific snippets/highlighting.

Migration risk: medium. Public exports already include `PostRow`, so splitting must preserve the named export.

### Admin Editor Overlap

Components:

- `ContentEditor`
- `NoteEditor`
- `ProjectEditor`
- `CourseEditor`
- `LessonEditor`
- `FormField`
- `Input`
- `Textarea`
- `Select`
- `Checkbox`
- `Tag`
- `StatusSelect`
- `TagInput`
- `PairListField`
- `RepeaterField`

Finding:

Admin editors are public exports but are workflow/page-level components. They reuse some atoms but also keep reusable editor field controls inside `admin/ContentEditor`. Older editor SCSS modules exist conceptually as repeated card/header/status/tag/footer patterns, now consolidated in `ContentEditor.module.scss`.

Recommendation:

- Keep admin presets under `Pages` or a separate `admin` package namespace.
- Promote `TagInput`, `PairListField`, `RepeaterField`, and `EditorShell` only if they are intended for public reuse.
- Make `StatusSelect` wrap canonical `Select` later.
- Do not merge admin workflows into public molecules without proving cross-product reuse.

Migration risk: medium. These are likely app-specific and exported.

### Visual CRT / Display Overlap

Components:

- `CrtShell`
- `HeroFrame`
- `FooterStencil`
- `PdaWindow`
- `AsciiBanner`
- `Glyphs` / `Glyph`
- `TerminalPrompt`
- `CodeBlock`
- `Footer`

Finding:

These components preserve the phosphor CRT identity through shared CSS variables, glow shadows, tape animations, scanlines, LED treatments, glyphs, terminal typography, and monospace rhythm. The overlap is desirable identity consistency, but implementation is scattered.

Recommendation:

- Extract shared foundations only as exact-preservation utilities: glyph catalog, animation names, effect tokens, HUD/tape primitives.
- Keep visual behavior and SCSS modules unchanged during the first migration.
- Prefer composing `Glyph`, `TerminalPrompt`, `AsciiBanner`, and `ProgressBar` where duplication is obvious.

Migration risk: high. This is the product identity; no color, animation, spacing, typography, shadow, or CSS-variable changes should be bundled with architecture moves.

### Feedback Surface Overlap

Components:

- `Callout`
- `Toast`
- `EmptyState`
- `Tooltip`
- `Modal`

Finding:

These all present system feedback or contextual information, but their interaction models differ: static in-content notice, transient status, empty state, hover/focus explanation, and blocking overlay.

Recommendation:

- Keep separate canonical components.
- Align variant names and glyph token sources later only if visual parity remains exact.
- Extract shared feedback variant tokens only after a snapshot/story review.

Migration risk: low to medium. Public API overlap is small, but styling consistency is sensitive.

## Split Candidates

### ContentEditor

Current responsibilities:

- Schema-driven field rendering.
- Editor card shell and footer actions.
- Status lifecycle.
- Auto-slug behavior.
- Tag input state.
- Pair/list row state.
- Save/discard orchestration.

Proposed extracted pieces:

- `EditorShell` -> `Templates/EditorShell`
- `TagInput` -> `Molecules/TagInput`
- `PairListField` -> `Molecules/PairListField`
- `RepeaterField` -> `Molecules/RepeaterField`
- `StatusSelect` -> `Molecules/StatusSelect` or wrapper around `Atoms/Select`
- slug utility -> `foundations/utils/slug`

Target categories: Templates, Molecules, Foundations, Pages for presets.

### PostListing

Current responsibilities:

- List wrapper.
- Header row.
- Post row rendering.
- Thumbnail image/SVG rendering.
- Fallback glyph rendering.
- Metadata/date/length layout.

Proposed extracted pieces:

- `PostList` -> `Organisms/PostList`
- `PostListHeader` -> `Molecules/PostListHeader`
- `PostListItem` -> `Molecules/PostListItem`
- `PostThumbnail` -> `Molecules/PostThumbnail`

Target categories: Organisms and Molecules.

### Glyphs

Current responsibilities:

- Glyph design catalog.
- Optional interactive glyph picker.
- Inline glyph primitive.

Proposed extracted pieces:

- `Glyph` -> `Atoms/Glyph`
- `DEFAULT_GLYPHS` -> `Foundations/Glyphs`
- `Glyphs` catalog/grid -> `Foundations/Glyphs` docs or `Molecules/GlyphPicker` if interactive use is real.

Target categories: Foundations, Atoms, maybe Molecules.

### HeroFrame

Current responsibilities:

- Art frame.
- Top/bottom HUD layout.
- HUD LEDs.
- HUD text/label/spacer.
- HUD bars and tape animation.
- Scanline visual effect.

Proposed extracted pieces:

- `Hud` -> `Molecules/Hud`
- `HudLed` -> `Atoms/HudLed`
- `HudText` / `HudLabel` -> `Atoms`
- `HudTape` -> `Molecules/HudTape`
- scanline/tape animations -> `Foundations/Animation`

Target categories: Foundations, Atoms, Molecules, Organisms.

### Modal

Current responsibilities:

- Modal dialog.
- Drawer panel.
- Body scroll locking.
- Escape handling.
- Portal rendering.

Proposed extracted pieces:

- `Modal` -> `Molecules/Modal`
- `Drawer` -> `Molecules/Drawer`
- shared overlay/portal behavior -> internal utility/hook if duplicated later.

Target categories: Molecules and optional Foundations behavior utility.

### Stepper

Current responsibilities:

- Step breadcrumb display.
- Previous/next footer navigation.

Proposed extracted pieces:

- `Stepper` -> `Molecules/Stepper`
- `StepperFoot` -> `Molecules/AdjacentNav` or merge with `SeriesNav`.

Target categories: Molecules.

### FormField

Current responsibilities:

- Generic form field wrapper.
- Content status badge.

Proposed extracted pieces:

- `FormField` -> `Molecules/FormField`
- `ContentStatusBadge` -> `Molecules/ContentStatusBadge`

Target categories: Molecules.

## Merge Candidates

| Source component | Target component | Why | Compatibility strategy |
|---|---|---|---|
| AuthorCard avatar rendering | Avatar | Duplicates image/initials fallback logic. | Keep `AuthorCard` API; internally compose `Avatar` later. |
| CourseCard progress cells | ProgressBar | Hand-rolled segmented progress overlaps with `ProgressBar`. | Preserve visual class output or add a segmented variant to `ProgressBar` before replacing. |
| ModuleAccordion lesson rows | LessonRow | Repeats row state, lock handling, numbers, title, length. | Compose `LessonRow` inside accordion while preserving class names or visual snapshots. |
| ModuleAccordion progress cells | ProgressBar | Duplicates progress-cell rendering. | Add compatible small/cell variant to `ProgressBar` first. |
| Exercise track | ProgressBar | Custom linear progress duplicates progress primitive. | Use `ProgressBar` only if exact visual style can be matched. |
| Header nav markup | BootNav | Header contains inline boot-nav list behavior. | Let `Header` compose `BootNav`; preserve `.pho-header` and `.boot-nav` classes during transition. |
| Footer prompt | TerminalPrompt | Footer repeats prompt/cursor display. | Compose `TerminalPrompt` if CSS can preserve footer-specific layout. |
| StatusSelect | Select | Native select wrapper duplicates select control. | Keep `StatusSelect` API; make it wrap `Select` later. |
| SeriesNav | StepperFoot or AdjacentNav | Both render previous/next navigation. | Create `AdjacentNav`; wrap `SeriesNav` and `StepperFoot` with variants. |

## Legacy Candidates

| Legacy component | Replacement | Deprecation note to eventually add | Thin wrapper? |
|---|---|---|---|
| StatPill current atom path | Molecules/StatPill | `Import StatPill from the root export.` | Yes. |
| Tooltip current atom path | Molecules/Tooltip | `Import Tooltip from the root export.` | Yes. |
| PdaWindow current organism path | Molecules/PdaWindow | `Import PdaWindow from the root export.` | Yes. |
| ReadingRail current organism path | Atoms/ReadingRail | `Import ReadingRail from the root export.` | Yes. |
| AsciiBanner current organism path | Molecules/AsciiBanner | `Import AsciiBanner from the root export.` | Yes. |
| BootNav current organism path | Molecules/BootNav | `Import BootNav from the root export if it returns.` | Yes. |
| SeriesNav current organism path | Molecules/SeriesNav or AdjacentNav | `SeriesNav moved to molecules; use AdjacentNav for generic prev/next navigation.` | Maybe, depending on merge choice. |
| Glyphs current organism path | Foundations/Glyphs + Atoms/Glyph | `Glyph moved to atoms; glyph catalog moved to foundations.` | Maybe; catalog and primitive should split. |
| admin editor exports from root | Separate admin namespace or pages | `Admin/editor components are app workflows and may move to admin exports.` | Yes, through root barrel re-exports. |

## Delete-Later Candidates

| Component | Why it is redundant | What must be migrated first | Risk level |
|---|---|---|---|
| Standalone duplicate editor SCSS modules | `CourseEditor.module.scss`, `NoteEditor.module.scss`, `ProjectEditor.module.scss` appear superseded by `ContentEditor.module.scss`-based implementations. | Confirm no imports, then remove in cleanup. | Low |
| FooterStencil | Rich branded footer may be redundant if product standardizes on `Footer`. | Audit product usage and decide whether stencil footer is part of public brand system. | Medium |
| CrtShell | Decorative full-shell effects may be unnecessary if templates own CRT effects. | Confirm app usage and preserve effect tokens elsewhere. | Medium |
| StepperFoot | Redundant if `AdjacentNav` becomes canonical. | Migrate post story usage to `AdjacentNav`/`SeriesNav`. | Low |
| StatusSelect | Redundant if a typed `Select` wrapper is created. | Replace admin usage with `Select` plus status options. | Low |

## Proposed Migration Order

### Phase 1

Audit only, no source changes.

### Phase 2

Create folders and barrel exports for `foundations`, `atoms`, `molecules`, `organisms`, `templates`, `pages`, and `legacy`. Keep the existing root exports in `src/components/index.ts` intact.

### Phase 3

Move obvious atoms/molecules with no behavior changes. Preserve files, SCSS modules, class names, CSS variables, animation names, and root public exports.

### Phase 4

Keep generic layout primitives in `templates/Layout`; build page-level screens from concrete page components such as `Post`.

### Phase 5

Remove unused wrapper components and keep only root exports that are actively used.

### Phase 6

Split large organisms. Start with low-risk extractions (`PostRow`, `Drawer`, `ContentStatusBadge`), then move into higher-risk content and CRT visual extractions only with Storybook visual checks.

### Phase 7

Update Storybook taxonomy after source taxonomy exists. Stories should point at canonical categories.

### Phase 8

Remove deprecated components only in a major version. Publish migration notes and preserve the phosphor CRT identity through snapshot/visual regression checks before removal.
