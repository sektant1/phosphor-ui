# Storybook Show Code Audit

## Summary

Audited public exports from `src/components/index.ts` against component stories under `src/**/*.stories.tsx`, `src/**/*.stories.mdx`, and `src/stories/**/*.mdx`.

Most component stories were visually useful but relied on Storybook's automatic source generation, which exposed relative imports, args-only examples, or large demo render functions. The fixed stories now provide explicit `parameters.docs.source.code` snippets that show simple package imports from `@sektant1/phosphor-ui`.

Added missing basic stories for `ContentEditor`, `CourseEditor`, `LessonEditor`, `Glyph`, `Page`, and `Post`. Validation passed with `npm run typecheck` and `npm run build-storybook`.

## Fixed Components

| Component | Story File | Problem | Fix |
|---|---|---|---|
| AdminShell | `src/components/admin/AdminShell/AdminShell.stories.tsx` | Automatic source exposed story internals. | Added default story source using package import. |
| ContentEditor | `src/components/admin/ContentEditor/ContentEditor.stories.tsx` | Missing public component story. | Added basic editor story and explicit source. |
| EditorShell | `src/components/admin/ContentEditor/ContentEditor.stories.tsx` | Missing public subcomponent example. | Added focused shell story and explicit source. |
| PairListField | `src/components/admin/ContentEditor/ContentEditor.stories.tsx` | Missing public subcomponent example. | Added field-parts story with minimal source. |
| RepeaterField | `src/components/admin/ContentEditor/ContentEditor.stories.tsx` | Missing public subcomponent example. | Added field-parts story with minimal source. |
| StatusSelect | `src/components/admin/ContentEditor/ContentEditor.stories.tsx` | Missing public subcomponent example. | Added field-parts story with minimal source. |
| TagInput | `src/components/admin/ContentEditor/ContentEditor.stories.tsx` | Missing public subcomponent example. | Added field-parts story with minimal source. |
| CourseEditor | `src/components/admin/CourseEditor/CourseEditor.stories.tsx` | Missing public component story. | Added default story and explicit source. |
| LessonEditor | `src/components/admin/LessonEditor/LessonEditor.stories.tsx` | Missing public component story. | Added default story and explicit source. |
| NoteEditor | `src/components/admin/NoteEditor/NoteEditor.stories.tsx` | Automatic source was not useful. | Added explicit basic source. |
| ProjectEditor | `src/components/admin/ProjectEditor/ProjectEditor.stories.tsx` | Automatic source was not useful. | Added explicit basic source. |
| Avatar | `src/components/atoms/Avatar/Avatar.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| Button | `src/components/atoms/Button/Button.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| Checkbox | `src/components/atoms/Checkbox/Checkbox.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| Glyph | `src/components/atoms/Glyph/Glyph.stories.tsx` | Missing standalone public component story. | Added default story and explicit source. |
| Heading, H1-H6 | `src/components/atoms/Headings/Headings.stories.tsx` | No default story and generated snippets showed internal imports. | Renamed basic story to `Default` and added explicit source for Heading/helpers. |
| Hr | `src/components/atoms/Hr/Hr.stories.tsx` | Automatic source exposed story internals. | Added explicit basic source. |
| Input | `src/components/atoms/Input/Input.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| Textarea | `src/components/atoms/Input/Input.stories.tsx` | Secondary public component lacked clean source. | Added explicit source to `TextArea` story. |
| Link | `src/components/atoms/Link/Link.stories.tsx` | Bind-template source hid package usage. | Added explicit basic source. |
| ProgressBar | `src/components/atoms/ProgressBar/ProgressBar.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| ReadingRail | `src/components/organisms/ReadingRail/ReadingRail.stories.tsx` | No default story and generated source was demo-heavy. | Renamed `Idle` to `Default` and added explicit source. |
| Select | `src/components/atoms/Select/Select.stories.tsx` | Automatic source exposed story internals. | Added explicit basic source. |
| StatPill | `src/components/atoms/StatPill/StatPill.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| Switch | `src/components/atoms/Switch/Switch.stories.tsx` | Automatic source exposed story internals. | Added explicit basic source. |
| Tag | `src/components/atoms/Tag/Tag.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| TerminalPrompt | `src/components/atoms/TerminalPrompt/TerminalPrompt.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| Text | `src/components/atoms/Text/Text.stories.tsx` | No default story and bind-template source hid package usage. | Renamed `Body` to `Default` and added explicit source. |
| Tooltip | `src/components/atoms/Tooltip/Tooltip.stories.tsx` | Automatic source exposed composition internals. | Added explicit basic source. |
| CodeBlock | `src/components/content/CodeBlock/CodeBlock.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| PostBody | `src/components/content/MdxComponents/PostBody.stories.tsx` | Automatic source exposed story internals. | Added explicit basic source. |
| Prose | `src/components/content/Prose/Prose.stories.tsx` | No default story and generated source lacked package usage. | Renamed `Article` to `Default` and added explicit source. |
| AuthorCard | `src/components/molecules/AuthorCard/AuthorCard.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| Breadcrumbs | `src/components/molecules/Breadcrumbs/Breadcrumbs.stories.tsx` | Automatic source exposed story internals. | Added explicit basic source. |
| Callout | `src/components/molecules/Callout/Callout.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| CalloutHeading | `src/components/molecules/Callout/Callout.stories.tsx` | Missing public subcomponent example. | Added focused heading story and explicit source. |
| CourseCard | `src/components/molecules/CourseCard/CourseCard.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| DropdownMenu | `src/components/molecules/DropdownMenu/DropdownMenu.stories.tsx` | Automatic source exposed story internals. | Added explicit basic source. |
| EmptyState | `src/components/molecules/EmptyState/EmptyState.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| FormField | `src/components/molecules/FormField/FormField.stories.tsx` | No default story and generated source exposed raw story markup. | Renamed basic field story to `Default` and added explicit source. |
| ContentStatusBadge | `src/components/molecules/FormField/FormField.stories.tsx` | Missing clean public subcomponent source. | Added explicit source to status badge story. |
| LessonRow, LessonList | `src/components/molecules/LessonRow/LessonRow.stories.tsx` | Automatic source showed large demo list. | Added compact package-import source. |
| Modal | `src/components/molecules/Modal/Modal.stories.tsx` | Render-function source was too complex. | Added explicit basic source. |
| Drawer | `src/components/molecules/Modal/Modal.stories.tsx` | Secondary public component lacked clean source. | Added explicit source to drawer story. |
| Pagination | `src/components/molecules/Pagination/Pagination.stories.tsx` | No default story and bind-template source hid package usage. | Renamed `Middle` to `Default` and added explicit source. |
| PostFrontmatter | `src/components/molecules/PostFrontmatter/PostFrontmatter.stories.tsx` | Automatic source exposed story internals. | Added explicit basic source. |
| PostMeta | `src/components/molecules/PostMeta/PostMeta.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| PrereqList | `src/components/molecules/PrereqList/PrereqList.stories.tsx` | Automatic source exposed story internals. | Added explicit basic source. |
| SearchResultList | `src/components/molecules/SearchResult/SearchResult.stories.tsx` | No default story and demo source was verbose. | Renamed `WithHits` to `Default` and added explicit source. |
| SearchResult | `src/components/molecules/SearchResult/SearchResult.stories.tsx` | Missing individual public component example. | Added focused single-result story and explicit source. |
| ShareBar | `src/components/molecules/ShareBar/ShareBar.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| Stepper | `src/components/molecules/Stepper/Stepper.stories.tsx` | No default story. | Renamed breadcrumb story to `Default` and added explicit source. |
| StepperFoot | `src/components/molecules/Stepper/Stepper.stories.tsx` | Secondary public component lacked clean source. | Added explicit source to foot story. |
| TableOfContents | `src/components/molecules/TableOfContents/TableOfContents.stories.tsx` | Automatic source exposed story internals. | Added explicit basic source. |
| Tabs | `src/components/molecules/Tabs/Tabs.stories.tsx` | Automatic source exposed story internals. | Added explicit basic source. |
| Timeline | `src/components/molecules/Timeline/Timeline.stories.tsx` | Automatic source exposed story internals. | Added explicit basic source. |
| Toast | `src/components/molecules/Toast/Toast.stories.tsx` | No default story and demo source was verbose. | Renamed static story to `Default` and added explicit source. |
| AsciiBanner | `src/components/organisms/AsciiBanner/AsciiBanner.stories.tsx` | Existing source omitted package import. | Replaced default source with package-import snippet. |
| BootNav | `src/components/organisms/BootNav/BootNav.stories.tsx` | Automatic source exposed story internals. | Added explicit basic source. |
| CrtShell | `src/components/organisms/CrtShell/CrtShell.stories.tsx` | Automatic source exposed fullscreen demo. | Added explicit basic source. |
| Exercise | `src/components/organisms/Exercise/Exercise.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| Footer | `src/components/organisms/Footer/Footer.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| FooterStencil | `src/components/organisms/FooterStencil/FooterStencil.stories.tsx` | Automatic source exposed fullscreen demo. | Added explicit basic source. |
| Glyphs | `src/components/organisms/Glyphs/Glyphs.stories.tsx` | Automatic source exposed story internals. | Added explicit basic source. |
| Header | `src/components/organisms/Header/Header.stories.tsx` | Existing source omitted package import. | Replaced default source with package-import snippet. |
| HeroFrame | `src/components/organisms/HeroFrame/HeroFrame.stories.tsx` | Automatic source exposed large visual demo. | Added explicit basic source. |
| LoginForm | `src/components/organisms/LoginForm/LoginForm.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| ModuleAccordion | `src/components/organisms/ModuleAccordion/ModuleAccordion.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| NerdTree | `src/components/organisms/NerdTree/NerdTree.stories.tsx` | Automatic source exposed story internals. | Added explicit basic source. |
| PdaWindow | `src/components/organisms/PdaWindow/PdaWindow.stories.tsx` | Automatic source exposed story internals. | Added explicit basic source. |
| PostHeader | `src/components/organisms/PostHeader/PostHeader.stories.tsx` | Automatic source exposed story internals. | Added explicit basic source. |
| PostListing, PostRow | `src/components/organisms/PostListing/PostListing.stories.tsx` | Demo source was too large. | Added compact package-import source for listing and row. |
| RelatedPosts | `src/components/organisms/RelatedPosts/RelatedPosts.stories.tsx` | Automatic source exposed story internals. | Added explicit basic source. |
| Search | `src/components/organisms/Search/Search.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| SeriesNav | `src/components/organisms/SeriesNav/SeriesNav.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| VideoPlayer | `src/components/organisms/VideoPlayer/VideoPlayer.stories.tsx` | Args-only source hid package usage. | Added explicit basic source. |
| Page | `src/components/templates/Page/Page.stories.tsx` | Missing public component story. | Added default story and explicit source. |
| PageLayout | `src/components/templates/PageLayout/PageLayout.stories.tsx` | No default story and generated source was large. | Added explicit source to the main page story. |
| PostLayout | `src/components/templates/PostLayout/PostLayout.stories.tsx` | Existing source was large and omitted package import. | Replaced default source with compact package-import snippet. |
| Post | `src/components/pages/Post/Post.stories.tsx` | Missing public page component story. | Added default story and explicit source. |
| Flex | `src/components/templates/Layout/Layout.stories.tsx` | No default story for layout primitive. | Renamed row layout story to `Default` and added explicit source. |
| Grid | `src/components/templates/Layout/Layout.stories.tsx` | Secondary layout primitive lacked clean source. | Added explicit source to grid story. |

## Components Already OK

| Component | Story File | Reason |
|---|---|---|
| N/A | N/A | No public React component was left relying solely on automatic source after this audit. |

## Components Still Needing Manual Review

| Component | Story File | Reason |
|---|---|---|
| `useToast` | `src/components/molecules/Toast/Toast.stories.tsx` | Public hook, not a component. Interactive story remains, but no component-style Basic story is expected. |
| `mdxComponents` | `src/components/content/MdxComponents/PostBody.stories.tsx` | Public MDX mapping object, not a standalone component. Covered indirectly through `PostBody`. |
| `extractMdxCode` | `src/components/content/CodeBlock/CodeBlock.stories.tsx` | Public utility function, not a component. |
| `phosphorTheme` | `src/components/content/CodeBlock/CodeBlock.stories.tsx` | Public Shiki theme export, not a component. |
| `DEFAULT_GLYPHS` | `src/components/organisms/Glyphs/Glyphs.stories.tsx` | Public data constant, not a component. Covered indirectly through `Glyphs`. |
