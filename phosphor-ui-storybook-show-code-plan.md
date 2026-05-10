# PLAN.md — Storybook Show Code Real Client Usage Audit

## Role / execution context

Act as a Staff UI/UX Designer, Staff React Engineer, Staff Design System Engineer, Storybook maintainer, and component documentation reviewer.

Target repo: `sektant1/phosphor-ui`

Goal: update **ALL component Storybook "Show code" outputs** so every snippet shows **real client React usage code for the exact previewed component/story above the Show code panel**.

This is not a visual redesign task. This is a documentation correctness and design-system trust task.

---

## Problem statement

Current Storybook code snippets are inconsistent.

The repo already has `docs/STORYBOOK_SHOW_CODE_AUDIT.md`, which says many stories were fixed by adding explicit `parameters.docs.source.code` snippets and package imports. However, the current quality bar is not strict enough.

Observed issues:

1. Some snippets are generated automatically by Storybook and expose story internals.
2. Some snippets are args-only or metadata-like instead of usable React code.
3. Some snippets come from the centralized `src/stories/basicUsage.ts` map and do not match the actual rendered preview.
4. Some stories render a matrix, stateful demo, or decorated layout, but Show Code shows a smaller/different "basic usage" example.
5. Some complex components need real client examples with `useState`, handlers, arrays, and component composition, but their snippets are currently simplified or misleading.
6. Some public exports have stories, but not every story/export has a correct client usage snippet.
7. Storybook global config still allows fallback automatic source generation. That means incomplete stories can silently show bad output.

This hurts the design system because consumers should be able to copy the Show Code snippet and get the previewed UI in a normal React app.

---

## Hard rule

For every component story:

> The Show Code panel must show real React client usage code that recreates the rendered preview directly above it.

A snippet is valid only if it satisfies all rules below:

1. It imports public components from `@sektant1/phosphor-ui`, not relative story/component paths.
2. It is a complete client-consumable React example.
3. It exports an `Example` component or clearly shows a complete JSX usage block.
4. It matches the actual preview for that story.
5. It does not show Storybook metadata, CSF objects, `args` JSON, `render: () =>`, decorators, or local story helpers unless those helpers are included as normal client code in the snippet.
6. It does not use private/internal imports such as `./Button`, `../../../stories/basicUsage`, or story-only mock helpers.
7. It does not show a different/simplified component state unless the preview itself is also simplified.
8. It includes realistic client-side state where the preview is interactive.
9. It can include local arrays/objects if the preview uses data.
10. It should avoid huge app-specific wrappers unless required to reproduce the preview.

---

## Important finding from current repo

### Existing centralized snippets are not enough

`src/stories/basicUsage.ts` contains a large `basicUsage` map with snippets imported by stories. This helped avoid auto-generated Storybook internals, but it creates drift because snippets are separated from the story preview.

Example bug:

```tsx
// Toast.stories.tsx
export const Default = {
  parameters: {
    docs: { source: { code: basicUsage.Toast } },
  },
  render: () => (
    <div>
      <Toast inline variant="info" message="enrollment confirmed." visible />
      <Toast inline variant="success" message="link copied to clipboard" visible />
      <Toast inline variant="warn" message="session expiring soon." visible />
      <Toast inline variant="error" message="connection failed." visible />
    </div>
  ),
};
```

But `basicUsage.Toast` shows only:

```tsx
import { Toast } from "@sektant1/phosphor-ui";

export function Example() {
  return <Toast visible message="Saved" variant="success" />;
}
```

That violates the hard rule because Show Code does not recreate the preview.

Another example:

`CourseCard.Default` uses rich meta args in the preview, but its Show Code comes from `basicUsage.CourseCard`, which is a smaller/different example. That is also not acceptable.

---

## Target architecture

### Prefer colocated story source snippets

Move from centralized generic snippets to colocated per-story snippets.

Use this pattern:

```tsx
const defaultSource = `import { Button } from "@sektant1/phosphor-ui";

export function Example() {
  return <Button>Engage</Button>;
}`;
```

Then:

```tsx
export const Default: StoryObj<ButtonProps> = {
  parameters: {
    docs: {
      source: {
        code: defaultSource,
        language: "tsx",
      },
    },
  },
};
```

For stories with explicit `render`, place the source directly above the story:

```tsx
const variantsSource = `import { Button } from "@sektant1/phosphor-ui";

const variants = ["primary", "secondary", "accent", "ghost", "quiet", "danger"] as const;

export function Example() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  );
}`;
```

Then use the same data/JSX in the story render.

### Add a small source helper

Create:

```txt
src/stories/source.ts
```

Recommended implementation:

```ts
export function source(code: string): { code: string; language: "tsx" } {
  return {
    code: code.trim(),
    language: "tsx",
  };
}
```

Optional dedent helper:

```ts
export function tsx(code: TemplateStringsArray, ...values: unknown[]) {
  return String.raw({ raw: code }, ...values).trim();
}
```

Usage:

```tsx
import { source, tsx } from "../../../stories/source";

const defaultSource = tsx`
import { Button } from "@sektant1/phosphor-ui";

export function Example() {
  return <Button>Engage</Button>;
}
`;

export const Default = {
  parameters: {
    docs: { source: source(defaultSource) },
  },
};
```

Keep this helper tiny. Do not build a complex docs framework.

---

## What to do with `src/stories/basicUsage.ts`

Do not rely on it for component Show Code snippets anymore.

Recommended path:

1. Stop importing `basicUsage` inside component story files.
2. Move every story-specific snippet next to the story that uses it.
3. After migration, delete `src/stories/basicUsage.ts` if it has no remaining consumers.
4. If some docs pages still need generic examples, rename it to something explicit like `src/stories/genericExamples.ts` and do not use it for per-story Show Code.

Rationale: a central map makes snippets drift from real previews.

---

## Storybook global source policy

Current `.storybook/preview.ts` uses:

```ts
docs: {
  toc: true,
  source: {
    type: "auto",
    excludeDecorators: true,
  },
}
```

This is risky because missing snippets silently fall back to auto-generated bad code.

After migration, set a stricter policy if Storybook supports it without breaking docs:

```ts
docs: {
  toc: true,
  source: {
    type: "code",
    excludeDecorators: true,
  },
}
```

If `type: "code"` breaks stories without explicit code, keep `auto` temporarily but add a validation script that fails CI when a public component story lacks `parameters.docs.source.code`.

---

## Scope

Audit all stories under:

```txt
src/components/**/*.stories.tsx
src/stories/**/*.stories.tsx
src/stories/**/*.mdx
```

Also check legacy/presets/admin areas if they expose public components.

Use `src/components/index.ts` as the primary public export list. Every public React component export should have at least one story with valid client usage code.

Important public component/export groups include:

```txt
atoms:
  Avatar, Badge, Button, Checkbox, Glyph, Heading/H1-H6, Hr, Input, Textarea,
  Kbd, Link, ProgressBar, ReadingRail, Select, StatPill, Switch, Tag,
  TerminalPrompt, Text, Tooltip

molecules:
  AuthorCard, Breadcrumbs, Callout, CalloutHeading, ContentStatusBadge,
  CourseCard, DropdownMenu, EmptyState, Form, FormField, LessonRow,
  LessonList, List, Modal, Drawer, Pagination, PostFrontmatter, PostMeta,
  PrereqList, SearchResult, SearchResultList, ShareBar, Stepper,
  StepperFoot, TableOfContents, Tabs, Timeline, Toast

organisms:
  AsciiBanner, BootNav/HeaderNav compat if public, CrtShell, Exercise,
  Footer, Glyphs, Header, HeaderNav, HeroFrame, LoginForm, ModuleAccordion,
  NerdTree, PdaWindow, PostHeader, PostListing, PostRow, ReadingRail if placed there,
  RelatedPosts, Search, SeriesNav, VideoPlayer

content:
  ArticleList, CodeBlock, PostBody, Prose

templates/pages/presets:
  Cluster, Container, Flex, Grid, Stack, Page, PageLayout, PostLayout,
  Post, SiteShell

admin:
  AdminShell, ContentEditor, EditorShell, PairListField, RepeaterField,
  StatusSelect, TagInput, NoteEditor, ProjectEditor, CourseEditor, LessonEditor
```

Exclude non-components from component Show Code requirements, but document them separately:

```txt
useToast
mdxComponents
extractMdxCode
codeToPhosphorHtml
phosphorTheme
DEFAULT_GLYPHS
types
constants
```

Hooks/utilities can have docs examples, but they should not be treated as visual component stories.

---

## Snippet quality standard

### Good snippet

```tsx
import { Button } from "@sektant1/phosphor-ui";

export function Example() {
  return <Button variant="primary">Engage</Button>;
}
```

### Good interactive snippet

```tsx
import { useState } from "react";
import { Button, Modal } from "@sektant1/phosphor-ui";

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>

      <Modal open={open} title="Confirm" onClose={() => setOpen(false)}>
        Confirm transmission.
      </Modal>
    </>
  );
}
```

### Good data-driven snippet

```tsx
import { CourseCard } from "@sektant1/phosphor-ui";

export function Example() {
  return (
    <CourseCard
      stamp="MOD-001"
      thumbSrc="/assets/og-image.png"
      thumbAlt="Phosphor terminal interface"
      coverMeta="// dossier"
      tag="intro"
      title="Phosphor protocol"
      description="Boot the terminal. Decode the signal. Engage the zone."
      stats="08 lessons · 1h 42m"
      progress={{ value: 40 }}
      cta={{ label: "resume ▸", href: "#" }}
    />
  );
}
```

### Bad snippet: args JSON

```json
{
  "variant": "primary",
  "children": "Engage"
}
```

### Bad snippet: story internals

```tsx
export const Default = {
  args: {
    children: "Engage"
  }
}
```

### Bad snippet: relative internal import

```tsx
import { Button } from "./Button";
```

### Bad snippet: not matching preview

```tsx
// Preview renders four Toast components
return <Toast visible message="Saved" variant="success" />;
```

---

## Required implementation strategy

### 1. Build a story inventory

Create a temporary or committed script:

```txt
scripts/audit-story-sources.mjs
```

It should scan all story files and report:

1. Story file path.
2. Exported story names.
3. Whether each story has `parameters.docs.source.code`.
4. Whether the file imports `basicUsage`.
5. Whether any `docs.source.code` appears to be JSON-only.
6. Whether any snippet imports from relative paths.
7. Whether any snippet contains `export const`, `StoryObj`, `Meta`, `args:`, or `render:` inside the code string.
8. Whether any story has `render` but no explicit code snippet.
9. Whether any story has `args` but no explicit code snippet.
10. Whether any `basicUsage.*` reference remains.

This script does not need perfect AST parsing. Prefer a simple Node script first. If robust parsing is needed, use TypeScript compiler APIs already available in the repo.

Example checks:

```txt
grep -R "basicUsage" src/**/*.stories.tsx
grep -R "docs:.*source" src/**/*.stories.tsx
grep -R "source: { code:" src/**/*.stories.tsx
grep -R "language: \"json\"" src/**/*.stories.tsx
grep -R "JSON.stringify" src/**/*.stories.tsx
```

### 2. Replace centralized snippets story by story

For each story file:

1. Remove `import { basicUsage } from ".../stories/basicUsage"`.
2. Add colocated `const <storyName>Source = tsx\`...\`;`.
3. Ensure every story export has:
   ```ts
   parameters: {
     docs: {
       source: source(<storyName>Source),
     },
   }
   ```
4. If the story uses `args`, the source snippet must include those exact props in JSX.
5. If the story uses `render`, the source snippet must match the rendered JSX and necessary local data/state.
6. If the story uses decorators to show layout width/padding, include only layout wrappers that are necessary for the preview to make sense.
7. Keep examples as small as possible while still matching the preview.

### 3. Decide source requirements per story type

#### Default/basic story

Show the exact default usage.

#### Variant matrix story

If the preview shows all variants, Show Code must show all variants.

Example:

```tsx
import { Button } from "@sektant1/phosphor-ui";

const variants = ["primary", "secondary", "accent", "ghost", "quiet", "danger"] as const;

export function Example() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  );
}
```

#### Size matrix story

Show all sizes if the preview shows all sizes.

#### State matrix story

Show all state examples if the preview shows pressed/loading/disabled/etc.

#### Interactive story

Use real client state. Include `useState` or hooks if needed.

Do not show pseudo-code.

#### Page/template story

Show the page/template composition in realistic minimal usage. Include nested components if the preview uses them.

#### Admin/editor story

If the preview requires sample field specs/data, include the sample data object in the snippet.

Do not hide required data behind `mockFields` unless `mockFields` is included in the snippet.

---

## Priority order

### Phase 1 — infrastructure

1. Add `src/stories/source.ts`.
2. Add `scripts/audit-story-sources.mjs`.
3. Add package script:
   ```json
   "audit:story-sources": "node scripts/audit-story-sources.mjs"
   ```
4. Add script to validation chain if stable:
   ```json
   "validate:storybook-sources": "npm run audit:story-sources"
   ```
5. Update `.storybook/preview.ts` only if needed after all snippets are explicit.

### Phase 2 — Atoms

Fix all atom stories first:

```txt
Avatar
Badge
Button
Checkbox
Glyph
Headings
Hr
Input
Textarea
Kbd
Link
ProgressBar
ReadingRail
Select
StatPill
Switch
Tag
TerminalPrompt
Text
Tooltip
```

For each story export in each file, ensure Show Code matches the preview.

### Phase 3 — Molecules

Fix:

```txt
AuthorCard
Breadcrumbs
Callout
CourseCard
DropdownMenu
EmptyState
FormField/Form/ContentStatusBadge
LessonRow/LessonList
List
LocaleSwitch
Modal/Drawer
Pagination
PostFrontmatter
PostMeta
PrereqList
SearchResult/SearchResultList
ShareBar
Stepper/StepperFoot
TableOfContents
Tabs
Timeline
Toast
```

Special attention:

- `Toast.Default`: snippet must show the four inline toasts if preview renders four inline toasts.
- `Toast.Interactive`: snippet must show `useToast` or `useState`, buttons, and the rendered `Toast`.
- `CourseCard.Default`: snippet must include the same rich props as the preview.
- `Modal` and `Drawer`: snippet must use real `useState`.
- `Tabs`: snippet must include the same `tabs` array.
- `SearchResultList`: snippet must include the same `hits` array.

### Phase 4 — Organisms

Fix:

```txt
AsciiBanner
BootNav/HeaderNav compat
CrtShell
Exercise
Footer
Glyphs
Header
HeaderNav
HeroFrame
LoginForm
ModuleAccordion
NerdTree
PdaWindow
PostHeader
PostListing/PostRow
RelatedPosts
Search
SeriesNav
VideoPlayer
```

Special attention:

- Large preview demos should still have code matching the preview, but can be factored into local arrays/constants inside the snippet.
- Do not show only `<Component />` if the preview renders a configured component.

### Phase 5 — Content, templates, pages, admin

Fix:

```txt
ArticleList
CodeBlock
PostBody
Prose
Cluster
Container
Flex
Grid
Stack
Page
PageLayout
PostLayout
Post
SiteShell
AdminShell
ContentEditor
EditorShell
PairListField
RepeaterField
StatusSelect
TagInput
NoteEditor
ProjectEditor
CourseEditor
LessonEditor
```

Special attention:

- For `CodeBlock`, include a real code string and filename/lang.
- For `Prose`, include real child content if preview shows headings/paragraphs/lists.
- For editors/admin components, include minimal but complete field/data definitions.

---

## Suggested exact fixes for known issues

### Toast

Current `Default` preview renders four inline toasts.

Show Code should be:

```tsx
import { Toast } from "@sektant1/phosphor-ui";

export function Example() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "1rem" }}>
      <Toast inline variant="info" message="enrollment confirmed." visible />
      <Toast inline variant="success" message="link copied to clipboard" visible />
      <Toast inline variant="warn" message="session expiring soon." visible />
      <Toast inline variant="error" message="connection failed." visible />
    </div>
  );
}
```

For `Interactive`, Show Code should include `useToast` and the four buttons.

### CourseCard

Current `Default` preview uses meta args with stamp, thumb, cover meta, tag, title, description, stats, progress, cta, and locked.

Show Code should include the same props directly in JSX.

### Button

Do not stop at `Default`.

Add explicit source for:

```txt
Default
Variants
Sizes
States
Links
FullWidth
```

Each code snippet must match each preview.

### Story files with `args`

If a story has:

```ts
args: {
  title: "Something",
  description: "Something else",
}
```

Show Code should be JSX with those prop values:

```tsx
<Component title="Something" description="Something else" />
```

Not a JSON object.

### Story files with `render`

If a story has a render function, copy the render structure into a real `Example` function and replace local imports with package imports.

---

## Automated validation rules

Add `scripts/audit-story-sources.mjs` with these pass/fail rules.

Fail if:

1. A `.stories.tsx` file imports `basicUsage`.
2. A public component story lacks `parameters.docs.source.code`.
3. A story source code string contains:
   - `import { Something } from "./`
   - `import Something from "./`
   - `StoryObj`
   - `Meta`
   - `export const Default`
   - `args:`
   - `render:`
   - `component:`
4. A story source code string starts with `{` or `[` and looks like JSON.
5. A source code string imports from any path other than:
   - `"react"`
   - `"@sektant1/phosphor-ui"`
6. A story has `render:` but no explicit code.
7. A story has `args:` but no explicit code.
8. `src/stories/basicUsage.ts` is still imported by component stories.
9. Any `docs.source.language` is `"json"` for component stories.
10. Any `parameters.docs.source.code` is shorter than a useful threshold, except for very small atoms.

Warn, but do not fail, if:

1. The snippet contains `style={{ ... }}`. Inline style is acceptable only when the preview uses a layout wrapper.
2. The snippet imports many components. Complex page/template stories may need this.
3. The snippet is longer than 80 lines. It may be valid but should be manually reviewed.

---

## Manual QA checklist

After updating stories, run Storybook and inspect Docs mode.

For each story:

1. The rendered preview and Show Code describe the same example.
2. The code can be copied into a React app.
3. Imports come from `@sektant1/phosphor-ui`.
4. No story internals are visible.
5. No raw args JSON is visible.
6. No relative imports are visible.
7. Interactive examples include real state/hook code.
8. The code is not misleadingly simpler than the preview.
9. The snippet is not bloated with irrelevant Storybook layout/decorator internals.
10. The snippet uses realistic prop names and values.

---

## Validation commands

Run:

```sh
npm run audit:story-sources
npm run typecheck
npm test -- --runInBand
npm run build-storybook -- --quiet
npm run build
npm run validate:package
```

If `npm run build-storybook` passes but the audit script fails, fix snippets. Do not remove the audit rule to pass.

---

## Acceptance criteria

This task is done when:

1. Every public component story has explicit Show Code.
2. Every Show Code snippet is real client React code.
3. Every snippet imports public components from `@sektant1/phosphor-ui`.
4. No component story uses `basicUsage.*` for Show Code.
5. No component Show Code displays JSON args.
6. No component Show Code displays Storybook CSF metadata.
7. No component Show Code displays a different demo than the preview.
8. Stateful/interactive previews show real stateful code.
9. Complex previews include all required sample data in the snippet.
10. `scripts/audit-story-sources.mjs` exists and passes.
11. `npm run build-storybook -- --quiet` passes.
12. `npm run validate:package` passes.
13. `docs/STORYBOOK_SHOW_CODE_AUDIT.md` is updated with:
    - date of new audit,
    - stricter rule,
    - list of fixed files,
    - list of intentional exceptions for hooks/utilities,
    - validation command results.

---

## Codex CLI prompt

Use this prompt with codex-cli:

```txt
You are working in @sektant1/phosphor-ui.

Act as a Staff UI/UX Designer, Staff React Engineer, Staff Design System Engineer, Storybook maintainer, and documentation quality reviewer.

Task: fix ALL Storybook "Show code" output docs for all public components.

Read PLAN.md completely before editing.

Hard rule:
Every Storybook Show Code snippet must show real client React usage code that recreates the exact rendered preview directly above it.

Do not show:
- args JSON
- Storybook CSF objects
- render functions
- Meta/StoryObj code
- local relative imports
- generic examples that differ from the preview
- centralized basicUsage snippets that drift from the actual story

Do show:
- package imports from @sektant1/phosphor-ui
- real React client code
- an exported Example component
- useState/useToast/hooks where the preview is interactive
- all local arrays/data required to reproduce the preview
- the same JSX/props/state as the preview story

Implementation plan:
1. Add src/stories/source.ts with tiny source/tsx helpers.
2. Add scripts/audit-story-sources.mjs.
3. Add package script "audit:story-sources".
4. Scan all src/components/**/*.stories.tsx and src/stories/**/*.stories.tsx.
5. Remove component story imports of src/stories/basicUsage.
6. For each story export, add colocated source code constants.
7. Set parameters.docs.source.code/language for every story.
8. Make each snippet match the actual preview.
9. Replace JSON/args-only snippets with JSX.
10. Replace auto-source reliance with explicit code.
11. Update docs/STORYBOOK_SHOW_CODE_AUDIT.md with new stricter audit results.
12. Run validation.

Important files to inspect first:
- docs/STORYBOOK_SHOW_CODE_AUDIT.md
- src/stories/basicUsage.ts
- .storybook/preview.ts
- src/components/index.ts
- all src/components/**/*.stories.tsx

Known current mismatch examples:
- Toast.Default renders four inline Toast components, but Show Code uses basicUsage.Toast and shows only one Toast.
- CourseCard.Default renders rich args, but Show Code uses a smaller/different basicUsage.CourseCard example.
- Button only has explicit source for Default; Variants/Sizes/States/Links/FullWidth must also get exact snippets.
- Any story using args or render must still have explicit real client source code.

Validation:
Run:
npm run audit:story-sources
npm run typecheck
npm test -- --runInBand
npm run build-storybook -- --quiet
npm run build
npm run validate:package

Before finishing, report:
1. Files changed.
2. Stories fixed.
3. Exceptions left for hooks/utilities/non-components.
4. Validation results.
```

---

## Important design-system principle

A Storybook "Show Code" panel is not a screenshot caption. It is a contract with consumers.

If the preview shows a rich component state and the code shows a smaller fake example, the docs are lying.

Use stricter, colocated, exact snippets even if that means a little more maintenance per story.
