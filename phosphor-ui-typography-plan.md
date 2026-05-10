# PLAN.md — Phosphor UI Typography Audit + Google Fonts Migration

## Role / execution context

Act as a Staff UI/UX Designer, Staff React Engineer, Staff Design System Engineer, and Atomic Design reviewer.

Target repo: `sektant1/phosphor-ui`

Goal: audit and refactor typography so it is consistent, token-driven, atomic-design aligned, free of duplicated logic, and migrated from bundled/local font files to Google Fonts.

Do not redesign the whole visual identity. Keep the phosphor CRT / terminal look, colors, glow behavior, component personality, and public API as stable as possible.

---

## Executive summary

The typography foundation already exists, but it is not fully governed.

Current state:

1. `src/styles/tokens.css` defines font stacks, type scale tokens, aliases, and semantic utility classes such as `.t-h1`, `.t-body`, `.t-caption`, `.t-terminal`, etc.
2. `src/styles/tokens.css` also embeds local `@font-face` rules pointing to `./fonts/*`, which conflicts with the requested move to Google Fonts.
3. `src/styles/phosphor.css` imports only `tokens.css` and `global.css`.
4. `src/styles/global.css` applies body/default typography using the public `--pho-*` token aliases.
5. Some component styles use public tokens consistently, but several still use legacy raw variables like `--font-code`, `--font-display`, `--ink`, `--magenta`, `--bg`, etc.
6. `Text.tsx` and `Headings.tsx` both map React variants/levels to `.t-*` classes, but the heading system only has first-class styles for h1-h4. H5 and H6 are rendered as semantic headings but visually fall back to `.t-h4`.
7. Several components hardcode font sizes such as `13px`, `14px`, `17px`, `20px`, `0.78rem`, and `0.75rem` instead of using typography tokens.
8. `tokens.css` and `global.css` duplicate global rules/animations such as `::selection` and multiple `@keyframes phosphor*`.
9. Storybook imports `tokens.css` and `global.css` directly, so the font-loading strategy must work there too.
10. The package currently exports and copies local font assets. If Google Fonts replaces local fonts, `package.json` exports/scripts must be updated.

Result: the library looks coherent visually, but typography is not yet a clean design-system foundation. It needs a single typography contract, a single font-loading strategy, and stricter token usage.

---

## Non-negotiable constraints

- Keep the public package name and component API stable unless a change is explicitly documented as a breaking change.
- Keep existing visual identity: green phosphor, CRT terminal feel, uppercase display rhythm, mono-heavy aesthetic.
- Keep existing class names such as `.t-h1`, `.t-body`, `.t-caption`, `.t-terminal`, `.pho-heading`, etc.
- Prefer public `--pho-*` tokens in component styles.
- Preserve legacy raw token aliases temporarily for backwards compatibility, but do not use them in internal component styles after the refactor.
- Do not introduce a new visual theme system in this pass.
- Do not rewrite the component library architecture beyond typography-related cleanup.
- Do not remove legacy variables without a deprecation path.

---

## Desired typography architecture

Use a layered design-system model:

```txt
src/styles/
  fonts.css          # Google Fonts import only
  tokens.css         # design tokens only: colors, type, spacing, effects, aliases
  typography.css     # semantic typography utilities: .t-h1, .t-body, .t-caption...
  global.css         # global document defaults, reset-ish rules, scrollbar, effects
  phosphor.css       # public full stylesheet entrypoint, ordered imports
```

Recommended import order:

```css
/* src/styles/phosphor.css */
@import "./fonts.css";
@import "./tokens.css";
@import "./typography.css";
@import "./global.css";
```

Why:

- Google Fonts `@import` must be loaded before regular CSS rules.
- `tokens.css` should not own font-face rules or semantic utility classes.
- Typography utilities should be isolated, testable, and easier to document.
- `global.css` should consume tokens/utilities, not define design tokens.

---

## Google Fonts migration

### Recommended font stack

Use the same current families, but load them from Google Fonts:

```css
/* src/styles/fonts.css */
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=VT323&display=swap");
```

Recommended token roles:

```css
:root {
  --font-display: "Space Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --font-heading: "Space Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --font-body: "JetBrains Mono", "Space Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --font-code: "JetBrains Mono", "Space Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --font-terminal: "VT323", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  --pho-font-display: var(--font-display);
  --pho-font-heading: var(--font-heading);
  --pho-font-body: var(--font-body);
  --pho-font-code: var(--font-code);
  --pho-font-terminal: var(--font-terminal);
}
```

### Required package changes

Update `package.json`:

1. Remove exports for local font files:
   - `./fonts/JetBrainsMono-Regular.woff2`
   - `./fonts/JetBrainsMono-Bold.woff2`
   - `./fonts/JetBrainsMono-Italic.woff2`
   - `./fonts/SpaceMono-Regular.woff2`
   - `./fonts/SpaceMono-Bold.woff2`
   - `./fonts/SpaceMono-Italic.woff2`
   - `./fonts/VT323-Regular.ttf`

2. Add style export if needed:
   - `./fonts.css`: `./dist/fonts.css`
   - `./typography.css`: `./dist/typography.css`

3. Update `copy-styles`:
   - Stop copying `src/styles/fonts/*`.
   - Copy `src/styles/fonts.css`.
   - Copy `src/styles/typography.css`.

Suggested script:

```json
"copy-styles": "cp src/styles/fonts.css dist/fonts.css && cp src/styles/tokens.css dist/tokens.css && cp src/styles/typography.css dist/typography.css && cp src/styles/global.css dist/global.css && cp src/styles/phosphor.css dist/phosphor.css"
```

4. Remove unused dev dependencies if no longer needed:
   - `@fontsource/jetbrains-mono`
   - `@fontsource/space-mono`

5. Delete or stop publishing:
   - `src/styles/fonts/*`

Important: removing font file exports is technically a package API change. If this package was already consumed through those exports, bump at least a minor version and document the migration. If strict semver is desired, keep the local font exports for one release but stop using them internally.

---

## Token cleanup plan

### Keep these current public tokens

Keep:

```css
--pho-font-display
--pho-font-heading
--pho-font-body
--pho-font-code
--pho-font-terminal
--pho-type-h1-size
--pho-type-h2-size
--pho-type-h3-size
--pho-type-h4-size
--pho-type-body-size
--pho-type-mono-size
--pho-line-tight
--pho-line-snug
--pho-line-normal
--pho-line-prose
--pho-tracking-tight
--pho-tracking-normal
--pho-tracking-wide
--pho-tracking-wider
--pho-tracking-stamp
```

### Add missing typography tokens

Add:

```css
--type-h5-size: 0.98rem;
--type-h6-size: 0.88rem;

--type-lead-size: clamp(1.05rem, 0.3vw + 1rem, 1.2rem);
--type-small-size: 0.875rem;
--type-caption-size: 0.78rem;
--type-label-size: 0.78rem;
--type-control-size: 0.95rem;
--type-control-sm-size: 0.875rem;
--type-control-lg-size: 1.1rem;

--pho-type-h5-size: var(--type-h5-size);
--pho-type-h6-size: var(--type-h6-size);
--pho-type-lead-size: var(--type-lead-size);
--pho-type-small-size: var(--type-small-size);
--pho-type-caption-size: var(--type-caption-size);
--pho-type-label-size: var(--type-label-size);
--pho-type-control-size: var(--type-control-size);
--pho-type-control-sm-size: var(--type-control-sm-size);
--pho-type-control-lg-size: var(--type-control-lg-size);
```

Optional but recommended:

```css
--type-line-control: 1;
--type-line-caption: 1.35;

--pho-line-control: var(--type-line-control);
--pho-line-caption: var(--type-line-caption);
```

### Update `src/foundations/tokens/index.ts`

Add new typography tokens to `PHOSPHOR_TOKEN_GROUPS.type`:

```ts
"--pho-type-h5-size",
"--pho-type-h6-size",
"--pho-type-lead-size",
"--pho-type-small-size",
"--pho-type-caption-size",
"--pho-type-label-size",
"--pho-type-control-size",
"--pho-type-control-sm-size",
"--pho-type-control-lg-size",
"--pho-line-control",
"--pho-line-caption",
```

---

## Typography utility cleanup

Move all `.t-*` utilities out of `tokens.css` into `src/styles/typography.css`.

### Add missing utilities

Add:

```css
.t-h5 {
  font-family: var(--pho-font-heading);
  font-weight: 700;
  font-size: var(--pho-type-h5-size);
  line-height: var(--pho-line-snug);
  letter-spacing: var(--pho-tracking-wide);
  text-transform: uppercase;
  color: var(--pho-color-primary);
}

.t-h6 {
  font-family: var(--pho-font-heading);
  font-weight: 700;
  font-size: var(--pho-type-h6-size);
  line-height: var(--pho-line-snug);
  letter-spacing: var(--pho-tracking-wider);
  text-transform: uppercase;
  color: var(--pho-color-text-muted);
}
```

Update `.t-lead`, `.t-small`, `.t-caption` to use new tokens instead of hardcoded values:

```css
.t-lead {
  font-size: var(--pho-type-lead-size);
}

.t-small {
  font-size: var(--pho-type-small-size);
}

.t-caption {
  font-size: var(--pho-type-caption-size);
}
```

### Normalize utility naming

Keep existing utilities:

```txt
t-muted
t-dim
t-faded
```

But document their semantic difference:

- `muted`: secondary text.
- `dim`: visually reduced UI text.
- `faded`: tertiary/de-emphasized metadata.

If there is no meaningful difference today, keep all aliases for compatibility but map them to the same visual output. Do not delete them in this pass.

---

## React typography component cleanup

### `src/components/atoms/Text/Text.tsx`

Current `TextVariant` only includes h1-h4. Add h5/h6:

```ts
export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  ...
```

Update `variantTag`:

```ts
h5: "h5",
h6: "h6",
```

Keep `as` override.

### `src/components/atoms/Headings/Headings.tsx`

Current behavior maps heading levels 5 and 6 to `.t-h4`.

Change:

```ts
const typeClass = `t-h${level}`;
```

after `.t-h5` and `.t-h6` exist.

### Reduce duplicated variant logic

Create a shared foundation file:

```txt
src/foundations/typography/
  index.ts
```

Export:

```ts
export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "lead"
  | "body"
  | "small"
  | "caption"
  | "mono"
  | "code"
  | "terminal"
  | "stamp"
  | "prompt"
  | "glow"
  | "glow-pale"
  | "muted"
  | "dim"
  | "faded";

export const TYPOGRAPHY_CLASS_BY_VARIANT: Record<TypographyVariant, string> = {
  h1: "t-h1",
  h2: "t-h2",
  h3: "t-h3",
  h4: "t-h4",
  h5: "t-h5",
  h6: "t-h6",
  lead: "t-lead",
  body: "t-body",
  small: "t-small",
  caption: "t-caption",
  mono: "t-mono",
  code: "t-code",
  terminal: "t-terminal",
  stamp: "t-stamp",
  prompt: "t-prompt",
  glow: "t-glow",
  "glow-pale": "t-glow-pale",
  muted: "t-muted",
  dim: "t-dim",
  faded: "t-faded",
};

export const TYPOGRAPHY_DEFAULT_TAG_BY_VARIANT: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  lead: "p",
  body: "p",
  small: "small",
  caption: "span",
  mono: "span",
  code: "code",
  terminal: "span",
  stamp: "span",
  prompt: "span",
  glow: "span",
  "glow-pale": "span",
  muted: "span",
  dim: "span",
  faded: "span",
};
```

Then `Text.tsx` and `Headings.tsx` consume this single source.

---

## Component style migration

### Rule

Internal library styles should prefer `--pho-*`.

Legacy raw variables may stay defined in `tokens.css`, but should not be used by components.

### Fix `src/components/content/Prose/Prose.scss`

Current issues:

- Uses raw `--ink`, `--font-display`, `--font-code`, `--font-terminal`, `--magenta`, `--magenta-bright`, `--magenta-deep`, `--bg`, etc.
- Hardcodes `font-size: 1rem`, `line-height: 1.7`, `1.6em`, `1.25em`, `0.95em`, `0.84em`, `0.85em`, `0.7em`.
- Uses color values that do not match the single-channel green design language, such as purple-ish RGBA values in prose blockquote/background/emphasis.

Required changes:

- Replace raw font variables:
  - `var(--font-display)` -> `var(--pho-font-display)` or `var(--pho-font-heading)`
  - `var(--font-code)` -> `var(--pho-font-code)`
  - `var(--font-terminal)` -> `var(--pho-font-terminal)`

- Replace raw color variables:
  - `var(--ink)` -> `var(--pho-color-text)`
  - `var(--bg)` -> `var(--pho-color-background)`
  - `var(--bg-deep)` -> `var(--pho-color-background-deep)`
  - `var(--bg-raise)` -> `var(--pho-color-background-raised)`
  - `var(--phosphor-bright)` -> `var(--pho-color-primary-strong)`
  - `var(--phosphor-fade)` -> `var(--pho-color-primary-faint)`
  - `var(--magenta)` -> `var(--pho-color-accent)`
  - `var(--magenta-bright)` -> `var(--pho-color-accent-strong)`
  - `var(--magenta-deep)` -> `var(--pho-color-accent-muted)`
  - `var(--magenta-fade)` -> `var(--pho-color-accent-faint)`

- Replace raw type values:
  - `.pho-prose { font-size: var(--pho-type-body-size); line-height: var(--pho-line-prose); }`
  - `.pho-prose h1` -> use `var(--pho-type-h1-size)`
  - `.pho-prose h2` -> use `var(--pho-type-h2-size)`
  - `.pho-prose h3` -> use `var(--pho-type-h3-size)`
  - `.pho-prose h4` -> use `var(--pho-type-h4-size)`
  - `.pho-prose h5` -> use `var(--pho-type-h5-size)`
  - `.pho-prose h6` -> use `var(--pho-type-h6-size)`
  - captions/code labels -> use caption/control/mono tokens

### Fix `src/components/atoms/Link/Link.scss`

Current issues:

- Uses raw `--font-code`, `--magenta`, `--glow-magenta`, `--bg`.
- Hardcodes `font-size: 13px`.

Required changes:

```scss
.pho-link {
  font-family: var(--pho-font-code);
  font-size: var(--pho-type-control-sm-size);
  color: var(--pho-color-link);
  text-shadow: var(--pho-glow-accent);
  border-bottom: 1px dashed var(--pho-color-link);
}

.pho-link:hover,
.pho-link:focus-visible {
  background: var(--pho-color-link);
  color: var(--pho-color-background);
  border-bottom-color: var(--pho-color-link-hover);
}
```

### Fix `src/components/atoms/Input/Input.module.scss`

Current state is better because it already mostly uses `--pho-*`.

Required changes:

- Replace hardcoded `13px` with `var(--pho-type-control-sm-size)` or `var(--pho-type-control-size)`.
- Replace `0.78rem` label with `var(--pho-type-label-size)`.
- Replace `0.75rem` help/error with `var(--pho-type-caption-size)` or `var(--pho-type-label-size)`.
- Ensure `.textarea` and `.input` use the same typography token.

### Fix `src/components/atoms/Button/Button.module.scss`

Required changes:

- Replace `font-size: 17px` with `var(--pho-type-control-size)`.
- Replace `.sm { font-size: 14px }` with `var(--pho-type-control-sm-size)`.
- Replace `.lg { font-size: 20px }` with `var(--pho-type-control-lg-size)`.
- Keep `font-family: var(--pho-font-terminal)` unless visual review says button readability improves with `--pho-font-code`.

### Batch audit all SCSS/CSS files

Search for these patterns:

```sh
grep -R "font-size: [0-9]" src/components src/styles
grep -R "font-family: var(--font" src/components src/styles
grep -R "var(--ink\\|var(--bg\\|var(--magenta\\|var(--phosphor" src/components src/styles
grep -R "@font-face\\|fonts/" src package.json rollup.config.mjs .storybook
grep -R "@keyframes phosphor\\|::selection" src/styles
```

For each match:

- If the value is a design decision, promote it to a token.
- If the value is a one-off implementation detail, add a comment explaining why it must stay local.
- Prefer `--pho-*` tokens in component styles.

---

## Duplicate logic cleanup

### `::selection`

Currently selection styling exists in both `tokens.css` and `global.css`.

Keep selection only in `global.css`.

Remove it from `tokens.css`.

### `@keyframes`

Several `phosphor*` keyframes exist in both `tokens.css` and `global.css`.

Rule:

- `tokens.css`: no keyframes.
- `typography.css`: no keyframes unless typography-specific and used only by typography utilities.
- `global.css`: global animation utilities and shared keyframes.
- component module scss: component-private keyframes only.

Move duplicated keyframes into `global.css` and remove from `tokens.css`.

---

## Storybook/docs work

### Update imports

If `fonts.css` and `typography.css` are introduced, update `.storybook/preview.ts`:

```ts
import "../src/styles/fonts.css";
import "../src/styles/tokens.css";
import "../src/styles/typography.css";
import "../src/styles/global.css";
```

Or simply:

```ts
import "../src/styles/phosphor.css";
```

Prefer importing `phosphor.css` in Storybook to match consumer behavior.

### Add or update typography stories

Update:

```txt
src/stories/Tokens.stories.tsx
src/components/atoms/Text/Text.stories.tsx
src/components/atoms/Headings/Headings.stories.tsx
src/components/content/Prose/Prose.stories.tsx
```

Required story coverage:

1. Font roles:
   - Display
   - Heading
   - Body
   - Code
   - Terminal

2. Type scale:
   - h1-h6
   - lead
   - body
   - small
   - caption
   - mono
   - code
   - terminal
   - stamp

3. Real usage examples:
   - Article/prose content
   - UI control cluster: button, input, label, help, error
   - Navigation/header/footer text
   - Dense metadata list

4. Visual regression focus:
   - long headings
   - lowercase/uppercase rendering
   - small text readability
   - mobile width
   - code blocks
   - nested prose

---

## Tests

### Unit tests

Update or add tests for:

```txt
src/components/atoms/Text/Text.test.tsx
src/components/atoms/Headings/Headings.test.tsx
```

Minimum assertions:

- `Text variant="h5"` renders `h5` and class `t-h5`.
- `Text variant="h6"` renders `h6` and class `t-h6`.
- `Text as="span" variant="h2"` renders a `span` with class `t-h2`.
- `Heading level={5}` renders `h5` with class `t-h5`.
- `Heading level={6}` renders `h6` with class `t-h6`.
- Heading glyph still renders with `aria-hidden="true"`.

### Build checks

Run:

```sh
npm run typecheck
npm test -- --runInBand
npm run build-storybook -- --quiet
npm run build
npm run validate:package
```

If Storybook source docs fail because of CSS import ordering, fix Storybook config instead of duplicating CSS imports in stories.

---

## Acceptance criteria

The task is complete only when all criteria pass:

1. Full package stylesheet loads Google Fonts.
2. No local `@font-face` rules remain in `tokens.css`.
3. `src/styles/phosphor.css` imports fonts before tokens/global rules.
4. `tokens.css` contains tokens only, not semantic `.t-*` utilities, keyframes, or global selection.
5. `typography.css` contains semantic typography utility classes.
6. `global.css` contains global document defaults and shared global effects.
7. Components use `--pho-*` typography/color tokens instead of raw legacy variables.
8. Hardcoded component font sizes are replaced by type tokens unless explicitly justified.
9. H1-H6 are supported consistently in CSS, React `Text`, React `Heading`, Storybook, and tests.
10. `package.json` no longer copies local font assets if Google Fonts fully replaces them.
11. Storybook renders typography correctly with one canonical stylesheet import path.
12. `npm run validate:package` passes.
13. Visual identity remains recognizably phosphor-ui: green terminal CRT, sharp mono aesthetic, uppercase display language.

---

## Suggested implementation order for Codex CLI

1. Inspect current repo state:
   - `src/styles/tokens.css`
   - `src/styles/global.css`
   - `src/styles/phosphor.css`
   - `src/foundations/tokens/index.ts`
   - `src/components/atoms/Text/Text.tsx`
   - `src/components/atoms/Headings/Headings.tsx`
   - `src/components/content/Prose/Prose.scss`
   - `src/components/atoms/Link/Link.scss`
   - `src/components/atoms/Input/Input.module.scss`
   - `src/components/atoms/Button/Button.module.scss`
   - `.storybook/preview.ts`
   - `package.json`

2. Create `src/styles/fonts.css`.

3. Create `src/styles/typography.css`.

4. Move semantic `.t-*` classes from `tokens.css` to `typography.css`.

5. Remove `@font-face` from `tokens.css`.

6. Remove duplicate `::selection` and duplicated shared keyframes from `tokens.css`.

7. Update `phosphor.css` import order.

8. Update `package.json` style exports and `copy-styles`.

9. Update `src/foundations/tokens/index.ts` with new type tokens.

10. Add h5/h6 typography classes and tokens.

11. Update `Text.tsx` and `Headings.tsx`.

12. Migrate component styles from raw legacy vars to `--pho-*`.

13. Replace hardcoded font sizes with tokens.

14. Update Storybook preview import strategy.

15. Update typography-related stories.

16. Update tests.

17. Run validation.

18. Fix any regressions.

19. Add a short `docs/TYPOGRAPHY.md` documenting:
    - font roles
    - type scale
    - when to use each text variant
    - migration note from local fonts to Google Fonts
    - package import examples

---

## Codex CLI prompt

Use this prompt with codex-cli:

```txt
You are working in the @sektant1/phosphor-ui React design system.

Act as a Staff UI/UX Designer, Staff React Engineer, Staff Design System Engineer, and Atomic Design reviewer.

Task: perform a typography architecture cleanup and Google Fonts migration.

Read PLAN.md completely before editing. Follow it as the source of truth.

Main goals:
1. Move font loading from local bundled @font-face files to Google Fonts.
2. Create a clean style architecture:
   - src/styles/fonts.css
   - src/styles/tokens.css
   - src/styles/typography.css
   - src/styles/global.css
   - src/styles/phosphor.css
3. Keep existing visual identity: green phosphor CRT terminal look.
4. Keep public --pho-* tokens stable.
5. Prefer --pho-* tokens inside all component styles.
6. Add full h1-h6 typography support.
7. Remove duplicated typography/global logic from tokens.css.
8. Replace hardcoded font sizes in components with typography tokens.
9. Update package exports/copy scripts for the new CSS files and Google Fonts strategy.
10. Update Storybook imports/stories and tests.
11. Run validation and fix failures.

Important files to inspect first:
- src/styles/tokens.css
- src/styles/global.css
- src/styles/phosphor.css
- src/foundations/tokens/index.ts
- src/components/atoms/Text/Text.tsx
- src/components/atoms/Headings/Headings.tsx
- src/components/content/Prose/Prose.scss
- src/components/atoms/Link/Link.scss
- src/components/atoms/Input/Input.module.scss
- src/components/atoms/Button/Button.module.scss
- .storybook/preview.ts
- package.json

Implementation details:
- Add src/styles/fonts.css with this Google Fonts import:
  @import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=VT323&display=swap");

- Update src/styles/phosphor.css to import:
  @import "./fonts.css";
  @import "./tokens.css";
  @import "./typography.css";
  @import "./global.css";

- Remove local @font-face rules from tokens.css.
- Move .t-* utility classes from tokens.css to typography.css.
- Keep legacy raw variables in tokens.css for compatibility, but migrate internal styles to --pho-*.
- Add h5/h6 tokens and .t-h5/.t-h6 classes.
- Add explicit lead/small/caption/label/control type tokens.
- Update src/foundations/tokens/index.ts with all new type tokens.
- Update Text.tsx to support h5/h6.
- Update Headings.tsx so level 5 maps to t-h5 and level 6 maps to t-h6.
- Replace hardcoded typography values in Link/Input/Button/Prose and any similar component files.
- Remove duplicated ::selection and duplicated shared keyframes from tokens.css.
- Prefer importing src/styles/phosphor.css in Storybook preview so Storybook matches consumers.
- Update package.json exports and copy-styles. Stop copying src/styles/fonts/* if Google Fonts fully replaces local font files.
- Remove unused @fontsource devDependencies if they are no longer used.
- Add/update typography stories and tests.

Validation:
Run:
npm run typecheck
npm test -- --runInBand
npm run build-storybook -- --quiet
npm run build
npm run validate:package

Before finishing, provide:
1. Summary of changed files.
2. Typography decisions made.
3. Any intentional compatibility tradeoffs.
4. Validation results.
```

---

## Notes / risks

### Remote font loading in a component library

Google Fonts creates a runtime network dependency for consumers. That matches the requested change, but it is different from bundled local fonts.

Recommended mitigation:

- Make `phosphor.css` load Google Fonts by default.
- Export `tokens.css`, `typography.css`, and `global.css` separately so advanced consumers can choose their own font-loading strategy.
- Document this clearly.

### Semver risk

Removing font file exports can break consumers who imported font files directly.

Safer release path:

1. First release: add Google Fonts and keep local font exports.
2. Deprecation note: local font exports will be removed later.
3. Next minor/major release: remove local font exports.

If this is mostly your own library and breaking old consumers is acceptable, remove local font exports now and bump version accordingly.

### Visual QA checklist

Check:

- Button labels are still readable.
- Input text is not too small.
- Prose paragraphs remain comfortable at desktop and mobile widths.
- H5/H6 no longer look identical to H4.
- VT323 is only used where the terminal/stamp aesthetic is intentional.
- Body text does not overuse glow.
- Code and prose do not fight for visual hierarchy.
- Storybook docs render with the same fonts as consumer apps.

