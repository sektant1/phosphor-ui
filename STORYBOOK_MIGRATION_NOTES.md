# Storybook Atomic Taxonomy Audit

This audit is based on the current component source under `src/components`. The Storybook titles now use broad atomic design groups where the component has a clear role. Only non-component stories remain under `Legacy`.

## Remaining Legacy Stories

- `Legacy/Demo`: `src/demo/Demo.stories.tsx` is a demo router/composition containing `Site`, `Home`, `Post`, and `CourseOverview` examples, not a reusable design-system component. Keep it under `Legacy` or move it to `Pages/Demo` if Storybook should document product demos.
- `Legacy/Introduction`: `src/stories/Introduction.stories.tsx` is documentation, not a component. Keep it under `Legacy` or convert it to MDX docs under a docs-specific Storybook section.

## Atomic Placements

### Foundations

- `Foundations/Tokens`: design token documentation.
- `Foundations/Typography`: heading/text scale documentation.
- `Foundations/Typography/Prose`: `Prose` is a content typography wrapper; keep as a foundation-level typography primitive.
- `Foundations/Glyphs`: `Glyphs` is a glyph catalog and `Glyph` is the inline primitive.

### Atoms

- `Atoms/Avatar`: primitive visual identity element.
- `Atoms/Button`: primitive action control.
- `Atoms/Checkbox`: primitive boolean input.
- `Atoms/Hr`: primitive separator.
- `Atoms/Input`: primitive text input plus textarea.
- `Atoms/Link`: primitive anchor styling.
- `Atoms/ProgressBar`: primitive progress indicator.
- `Atoms/ReadingRail`: primitive reading progress indicator; it is a single visual state element.
- `Atoms/Select`: primitive select control.
- `Atoms/StatPill`: primitive key/value status display.
- `Atoms/Switch`: primitive boolean input.
- `Atoms/Tag`: primitive label/chip.
- `Atoms/TerminalPrompt`: primitive terminal text row.
- `Atoms/Text`: primitive text variants.

### Molecules

- `Molecules/AsciiBanner`: composed text-art banner; used by `Header`.
- `Molecules/AuthorCard`: composed avatar, text, and links.
- `Molecules/BootNav`: small navigation list.
- `Molecules/Breadcrumbs`: navigation molecule.
- `Molecules/Callout`: content notice molecule.
- `Molecules/CodeBlock`: composed code panel with highlighting and copy action.
- `Molecules/CourseCard`: card molecule for course summaries.
- `Molecules/DropdownMenu`: trigger plus menu items.
- `Molecules/EmptyState`: feedback block with optional action.
- `Molecules/FormField`: label, control slot, hint/error; also contains `ContentStatusBadge`.
- `Molecules/LessonRow`: row/list item molecule for lesson navigation.
- `Molecules/Modal`: modal and drawer overlays.
- `Molecules/Pagination`: previous/next navigation molecule.
- `Molecules/PdaWindow`: framed content panel molecule.
- `Molecules/PostFrontmatter`: frontmatter display block.
- `Molecules/PostMeta`: post metadata line.
- `Molecules/PrereqList`: prerequisite list molecule.
- `Molecules/SearchResult`: result item plus result list.
- `Molecules/SeriesNav`: previous/next series navigation.
- `Molecules/ShareBar`: copy/share action group.
- `Molecules/Stepper`: step breadcrumbs plus previous/next footer.
- `Molecules/TableOfContents`: document navigation molecule.
- `Molecules/Tabs`: tablist and panel molecule.
- `Molecules/Timeline`: chronological list molecule.
- `Molecules/Toast`: status message molecule plus `useToast`.
- `Molecules/Tooltip`: trigger wrapper plus positioned overlay.

### Organisms

- `Organisms/Exercise`: exercise block with header, progress, body, and checkbox task list.
- `Organisms/Footer`: site footer landmark.
- `Organisms/Header`: site header composed from `AsciiBanner`, nav, locale links, and rule.
- `Organisms/HeroFrame`: hero/media frame with HUD subcomponents.
- `Organisms/LoginForm`: complete authentication form.
- `Organisms/ModuleAccordion`: module section with expandable lesson list and progress.
- `Organisms/NerdTree`: responsive content tree with mobile drawer.
- `Organisms/NoteEditor`: content editor preset for notes.
- `Organisms/PostBody`: MDX provider plus `Prose`, `CodeBlock`, `Callout`, `Exercise`, and frontmatter.
- `Organisms/PostHeader`: post header composed with title, metadata, excerpt, hero, and children.
- `Organisms/PostListing`: post list organism plus `PostRow`.
- `Organisms/ProjectEditor`: content editor preset for projects.
- `Organisms/RelatedPosts`: related content section.
- `Organisms/Search`: search input, filtering/highlighting logic, and `SearchResultList`.
- `Organisms/VideoPlayer`: video.js-backed media player.

### Templates

- `Templates/AdminShell`: admin app shell layout.
- `Templates/CrtShell`: visual shell/frame wrapper.
- `Templates/Layout`: `Flex` and `Grid` layout primitives. These are technically primitives, but template placement is acceptable because they control composition structure.
- `Templates/Page`: canonical generic page template.
- `Templates/PostLayout`: post-specific page template wrapper.

## Merge Candidates

- `PageLayout` into `Page`: `PageLayout` is already just a deprecated alias for `Page`. Delete the `PageLayout` story after consumers migrate to `Page`; keep a package export only as a temporary compatibility shim.
- `PostLayout` into `Post` or `Page`: `PostLayout` only fixes `PageLayout` to `variant="post"`. Prefer `Post` for full post pages and `Page` for generic layout. Deprecate `PostLayout` unless consumers need a header/body shell without `PostBody`.
- `AuthorCard` should use `Avatar`: it duplicates initials/image fallback logic already implemented by `Avatar`.
- `CourseCard` should use `ProgressBar`: it hand-rolls segmented progress cells that overlap with `ProgressBar`.
- `ModuleAccordion` should use `LessonRow` and `ProgressBar`: it repeats lesson row state, lock handling, and progress-cell rendering.
- `Exercise` should use `ProgressBar`: it currently uses a custom track/fill while the design system has a progress primitive.
- `Header` should use `BootNav`: it contains an inline nav list that overlaps with the standalone `BootNav`.
- `Footer` should use `TerminalPrompt`: it repeats prompt/cursor presentation.
- `PostBody` and `PostFrontmatter`: `PostBody` already composes `PostFrontmatter`; keep both, but document `PostFrontmatter` as the lower-level molecule.
- `Search` and `SearchResult`: keep both, but document `SearchResult` as the lower-level molecule and `Search` as the filtering organism.
- `StepperFoot` and `SeriesNav`: both model previous/next navigation. If both remain, define `StepperFoot` as generic adjacent navigation and `SeriesNav` as the post-series variant.
- `Callout` and `Toast`: both are feedback surfaces. Keep both only if `Callout` is static/in-content and `Toast` is transient/status; otherwise consolidate variants and glyph rules.
- `Glyphs`, `AsciiBanner`, and `HeroFrame`: all expose display/glyph language. Keep `Glyph` as the primitive, `AsciiBanner` as a molecule, and `HeroFrame` as an organism.

## Split Candidates

- `Modal`: split `Drawer` into `Molecules/Drawer` if it gets independent usage; it has separate props and behavior.
- `Stepper`: split `StepperFoot` into its own molecule if previous/next post navigation is used outside step flows.
- `HeroFrame`: HUD helpers are currently static properties. Split them into exported atoms/molecules if consumers need to compose HUDs outside `HeroFrame`.
- `FormField`: split `ContentStatusBadge` into its own molecule or atom; it is unrelated to generic form-field layout.
- `PostListing`: split `PostRow` into `Molecules/PostRow` if row rendering is reused outside the listing.
- `ContentEditor`: the internal `EditorShell`, `TagInput`, `StatusSelect`, `PairListField`, and `RepeaterField` are reusable admin molecules, but they currently live under `admin/ContentEditor`. Promote only the pieces needed outside admin editors.

## Delete Or Deprecate Candidates

- Delete `PageLayout` story after `Templates/Page` covers the same behavior.
- Deprecate `PostLayout` if `Pages/Post` becomes the canonical post page story.
- Delete `Legacy/Demo` from design-system Storybook if demos are not part of the published component library.
- Convert or delete `Legacy/Introduction` once Storybook docs move to MDX.
- `FooterStencil` was removed; use `Footer` for footer composition.
- Consider deleting `CrtShell` if CRT effects are only decorative and not a supported template surface.

## Story Coverage Gaps

- `Pages/PostPage` has source in `src/components/pages/Post/Post.tsx`, but no dedicated `*.stories.tsx` file. Add a `Post.stories.tsx` under `src/components/pages/Post` if page-level taxonomy should be complete.
- `ContentEditor`, `CourseEditor`, and `LessonEditor` are exported but do not currently have stories. Add stories under `Organisms/ContentEditor`, `Organisms/CourseEditor`, and `Organisms/LessonEditor` if admin workflows are part of the design system.
