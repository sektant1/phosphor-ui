# Component Inventory

Generated during the `PLAN.md` implementation pass. Baseline source typecheck passed with `npm run typecheck:src` before code changes.

## Source Tree Notes

- Source components live under `src/components/{atoms,molecules,organisms,templates,content,admin,pages,presets}`.
- Story files are colocated beside most public components as `*.stories.tsx`.
- Tests are colocated for higher-risk components such as `CodeBlock`, `ContentEditor`, `Headings`, `Header`, `Link`, `Pagination`, `Post`, `PostListing`, `Prose`, `SearchResult`, and `Text`.
- `src/components/templates/Page` exists as an empty directory and has no implementation files.
- Current production component categories still include `pages` and `presets`.

## Public Component Map

| Current source path | Exported name(s) | Props type(s) | Current category | Style file | Story file | Test file | Heavy deps | Proposed category | Migration action |
|---|---|---|---|---|---|---|---|---|---|
| `src/components/atoms/Avatar/Avatar.tsx` | `Avatar` | `AvatarProps`, `AvatarSize` | Atom | `Avatar.module.scss` | yes | no | none | Atom | keep |
| `src/components/atoms/Badge/Badge.tsx` | `Badge` | `BadgeProps`, `BadgeSize`, `BadgeTone` | Atom | `Badge.module.scss` | no | no | none | Atom | keep |
| `src/components/atoms/Button/Button.tsx` | `Button` | `ButtonProps`, `ButtonVariant`, `ButtonSize` | Atom | `Button.module.scss` | yes | no | none | Atom | harden |
| `src/components/atoms/Checkbox/Checkbox.tsx` | `Checkbox` | `CheckboxProps` | Atom | `Checkbox.module.scss` | yes | no | none | Molecule + atom | split later |
| `src/components/atoms/Glyph/index.ts` | `Glyph` | `GlyphProps` | Atom alias | none | yes | no | none | Atom | split from `Glyphs` later |
| `src/components/atoms/Headings/Headings.tsx` | `Heading`, `H1`-`H6` | `HeadingProps`, `HeadingLevel`, `HeadingGlyphPosition` | Atom | none | yes | yes | none | Atom | rename folder later |
| `src/components/atoms/Hr/Hr.tsx` | `Hr` | native hr props | Atom | `Hr.module.scss` | yes | no | none | Atom | alias to `Separator` later |
| `src/components/atoms/Input/Input.tsx` | `Input`, `Textarea` | `InputProps`, `TextareaProps` | Atom | `Input.module.scss` | yes | no | none | Molecule + atom | split later |
| `src/components/atoms/Kbd/Kbd.tsx` | `Kbd` | `KbdProps` | Atom | `Kbd.module.scss` | no | no | none | Atom | keep |
| `src/components/atoms/Link/Link.tsx` | `Link` | `LinkProps` | Atom | `Link.scss` | yes | yes | none | Atom | keep |
| `src/components/atoms/ProgressBar/ProgressBar.tsx` | `ProgressBar` | `ProgressBarProps` | Atom | `ProgressBar.module.scss` | yes | no | none | Atom | keep |
| `src/components/atoms/ReadingRail/ReadingRail.tsx` | `ReadingRail` | `ReadingRailProps` | Atom | `ReadingRail.module.scss` | yes | no | none | Molecule | move later |
| `src/components/atoms/Select/Select.tsx` | `Select` | `SelectProps`, `SelectOption` | Atom | `Select.module.scss` | yes | no | none | Molecule + atom | split later |
| `src/components/atoms/StatPill/StatPill.tsx` | `StatPill` | `StatPillProps`, `StatPillColor` | Atom | `StatPill.module.scss` | yes | no | none | Atom | keep |
| `src/components/atoms/Tag/Tag.tsx` | `Tag` | `TagProps` | Atom | `Tag.module.scss` | yes | no | none | Atom | keep |
| `src/components/atoms/TerminalPrompt/TerminalPrompt.tsx` | `TerminalPrompt` | `TerminalPromptProps` | Atom | `TerminalPrompt.module.scss` | yes | no | none | Atom | keep |
| `src/components/atoms/Text/Text.tsx` | `Text` | `TextProps`, `TextVariant` | Atom | none | yes | yes | none | Atom | harden later |
| `src/components/atoms/Tooltip/Tooltip.tsx` | `Tooltip` | `TooltipProps`, `TooltipPlacement` | Atom | `Tooltip.module.scss` | yes | no | none | Molecule | move later |
| `src/components/molecules/*` | `AuthorCard`, `Breadcrumbs`, `Callout`, `CourseCard`, `DropdownMenu`, `EmptyState`, `Form`, `FormField`, `LessonRow`, `List`, `LocaleSwitch`, `Modal`, `Pagination`, `PostFrontmatter`, `PostMeta`, `PrereqList`, `SearchResultList`, `ShareBar`, `Stepper`, `TableOfContents`, `Tabs`, `Timeline`, `Toast` | colocated exported props | Molecule | colocated scss | mostly yes | some | none | Mixed | keep or move per `PLAN.md` |
| `src/components/organisms/*` | `AsciiBanner`, `CrtShell`, `Exercise`, `Footer`, `Glyphs`, `Header`, `HeaderNav`, `HeroFrame`, `LoginForm`, `ModuleAccordion`, `NerdTree`, `PdaWindow`, `PostHeader`, `PostListing`, `RelatedPosts`, `Search`, `SeriesNav`, `VideoPlayer` | colocated exported props | Organism | colocated scss | yes | some | `Header` uses `figlet` lazily; `VideoPlayer` lazy-loads `video.js` | Mixed | isolate heavy deps; move small nav later |
| `src/components/content/*` | `ArticleList`, `CodeBlock`, `mdxComponents`, `PostBody`, `Prose` | colocated exported props | Content | colocated scss | yes | some | `CodeBlock` dynamic-imports `shiki`; `PostBody` no longer imports `@mdx-js/react` at module load | Content | keep and isolate |
| `src/components/admin/*` | `AdminShell`, `ContentEditor`, `CourseEditor`, `LessonEditor`, `NoteEditor`, `ProjectEditor` | colocated exported props | Admin | colocated scss | yes | `ContentEditor` | none | Admin/templates/organisms | keep admin subpath |
| `src/components/pages/Post/Post.tsx` | `Post` | `PostProps` | Page | `Post.module.scss` | yes | yes | none | Template | move later |
| `src/components/presets/SiteShell/SiteShell.tsx` | `SiteShell` | `SiteShellProps` | Preset | `SiteShell.module.scss` | yes | no | none | Template | move later |
| `src/components/templates/Layout/Layout.tsx` | `Stack`, `Cluster`, `Flex`, `Grid`, `Container` | layout props | Template | `Layout.module.scss` | yes | no | none | Template primitives | keep |

## Confirmed Source/Package Differences

- The current repo is ahead of the published package described in `PLAN.md`: source, tests, stories, Storybook config, and Rollup config are present.
- `src/components/templates/Page` is empty and can be removed in a cleanup phase after git intent is confirmed.

## Follow-Up Migration Queue

1. Move `Post` to `templates/PostTemplate` and keep `Post` as the public alias.
2. Move `SiteShell` to `templates/SiteShell` when ready.
3. Move `CourseCard` to organisms, `Tooltip` and `HeaderNav` to molecules, and `PostFrontmatter` to content.
4. Split field-like atoms into control atoms plus field molecules.
5. Update stories to match the new Atomic hierarchy after the source folders move.
