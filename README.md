<div align="center">
<h1>phosphor-ui</h1>

<p>Single-channel green-phosphor React UI for personal wikis, blogs, digital gardens, project logs, and second brains.</p>

[![npm version](https://img.shields.io/npm/v/phosphor-ui?color=2cff7a&labelColor=03110a&style=flat-square)](https://www.npmjs.com/package/phosphor-ui)
[![npm downloads](https://img.shields.io/npm/dm/phosphor-ui?color=2cff7a&labelColor=03110a&style=flat-square)](https://www.npmjs.com/package/phosphor-ui)
[![license](https://img.shields.io/github/license/sektant1/phosphor-ui?color=2cff7a&labelColor=03110a&style=flat-square)](./LICENSE)
[![Storybook](https://img.shields.io/badge/storybook-live-2cff7a?labelColor=03110a&style=flat-square)](https://sektant1.github.io/phosphor)
[![TypeScript](https://img.shields.io/badge/typescript-strict-2cff7a?labelColor=03110a&style=flat-square)](https://www.typescriptlang.org)

</div>

---


<div align="center">
  <img src="./assets/output.gif" alt="Hero frame and post listing" width="100%" />
</div>

## Install

```bash
npm install phosphor-ui
```

Peer deps: `react ^17 || ^18 || ^19`, `react-dom ^17 || ^18 || ^19`.
`@mdx-js/react ^2 || ^3` is optional for MDX applications, but the package root does not load it at module initialization.

## Setup

Import the full stylesheet once at your app root:

```tsx
import "phosphor-ui/phosphor.css";
```

If you need finer control, import `tokens.css`, `global.css`, and `components.css` separately.

### CSS import matrix

| Import | Use when |
|---|---|
| `phosphor-ui/phosphor.css` | You want the full default theme: fonts, tokens, typography, global defaults, effects, and component styles. |
| `phosphor-ui/tokens.css` | You only need the public `--pho-*` design tokens. |
| `phosphor-ui/fonts.css` | You want the bundled Bender, JetBrains Mono, and VCR OSD fonts. |
| `phosphor-ui/typography.css` | You want typography utility classes without all globals. |
| `phosphor-ui/global.css` | You want element defaults, cursors, scrollbars, focus helpers, and effect utility classes. |
| `phosphor-ui/components.css` | You are composing React components and need their styles. |

For app code, prefer `phosphor.css` first. Use granular imports only when your app owns global typography, fonts, cursors, or decorative effects.

### Themes

The default theme is green phosphor. Alternate CRT palettes are included in `tokens.css` and work by setting `data-theme` on a wrapper or on `<html>`:

```html
<html data-theme="cyan">
```

Supported values are `phosphor`, `amber`, and `cyan`.

## Tokens

Use the `--pho-*` tokens for app-level customization. The older raw tokens
(`--phosphor`, `--bg`, `--magenta`, etc.) still work, but the semantic names are
the stable consumer API.

```css
:root {
  --pho-color-background: #04140a;
  --pho-color-primary: #2cff7a;
  --pho-color-accent: #62ff9a;
  --pho-size-prose: 72ch;
}

.noteShell {
  max-width: var(--pho-size-prose);
  color: var(--pho-color-text);
  border: var(--pho-border-line);
  box-shadow: var(--pho-glow-primary-soft);
}
```

For TypeScript tooling, token names are exported from the package:

```ts
import { PHOSPHOR_TOKEN_GROUPS, phosphorVar } from "phosphor-ui";

const linkColor = phosphorVar("--pho-color-link");
```

## Quick start

```tsx
import { SiteShell, Post, Callout } from "phosphor-ui";
import "phosphor-ui/phosphor.css";

export default function App() {
  return (
    <SiteShell
      title="field notes"
      tagline="personal wiki / project log"
      nav={[
        { label: "notes", href: "/notes", active: true },
        { label: "projects", href: "/projects" },
      ]}
      footerLinks={[{ label: "rss", href: "/rss.xml" }]}
    >
      <Post
        title="Boot sequence"
        headerProps={{
          eyebrow: "log / systems",
          meta: { date: "2026-05-09", readTime: "3 min", tags: ["wiki"] },
        }}
      >
        <p>Use normal React or MDX content inside the post body.</p>
        <Callout title="signal">
          The shell includes a CRT frame, accessible skip link, header, content
          region, and footer.
        </Callout>
      </Post>
    </SiteShell>
  );
}
```

## Import Model

Use the root package for application code:

```tsx
import { SiteShell, Post, Button, Callout, TableOfContents } from "phosphor-ui";
```

The physical folders are organized for maintainers. Consumers should prefer the stable root exports so components can move internally without breaking your site.

## Components

| Group | Components |
|---|---|
| **Presets** | `SiteShell` |
| **Layout** | `AppShell` `PageShell` `SidebarLayout` `SplitLayout` `SplitPane` `Section` `Panel` `ContentShell` `ContentFrame` `ContentWidth` `Container` `Stack` `Inline` `Cluster` `Grid` `AutoGrid` `ResponsiveColumns` `DashboardGrid` `Row` `Column` |
| **Chrome** | `CrtShell` `Header` `Footer` `HeroFrame` `NerdTree` `PdaWindow` `Post` |
| **Content** | `Prose` `PostBody` `Callout` `CodeBlock` `Hr` `Tag` `Text` `AsciiBanner` `TerminalPrompt` |
| **Lists** | `PostListing` `PostRow` `CourseCard` `LessonRow` `ModuleAccordion` `PrereqList` `Exercise` |
| **Nav** | `Breadcrumbs` `Pagination` `SeriesNav` `Stepper` `TableOfContents` `Link` |
| **Form** | `Button` `Input` `Textarea` `Checkbox` `Select` `DropdownMenu` `Badge` |
| **Feedback** | `ProgressBar` `ReadingRail` `StatPill` `Toast` `Tooltip` `VideoPlayer` |

## Recipes

### Course cards

```tsx
<CourseCard
  stamp="COURSE-01"
  thumbSrc="/images/course-frame.png"
  coverMeta="6 modules"
  tag="entry"
  title="Cold-boot operations"
  progress={{ value: 4, total: 6 }}
  cta={{ label: "resume", href: "/courses/cold-boot" }}
/>
```

For a compact text-only card, remove the cover column:

```tsx
<CourseCard showCover={false} title="Reference index" cta={{ label: "open", href: "/ref" }} />
```

### Admin editors

```tsx
<ContentEditor
  kindLabel="POST"
  autoSlug={{ from: "title", to: "slug" }}
  fields={[
    { kind: "text", key: "title", label: "TITLE" },
    { kind: "textarea", key: "body", label: "BODY", rows: 12 },
    { kind: "tags", key: "tags", label: "TAGS" },
  ]}
/>
```

## Personal Site Pattern

For blogs, digital gardens, and second brains, start with `SiteShell` and add pages with `Post`:

```tsx
<SiteShell title="notes" nav={navItems}>
  <Post title="Now page" sidebar={<TableOfContents items={toc} />}>
    <NowPageMdx />
  </Post>
</SiteShell>
```

Reach for lower-level components when you need custom app structure:

```tsx
<CrtShell>
  <Header title="lab" />
  <main>
    <NerdTree nodes={nodes} />
    <Prose>{children}</Prose>
  </main>
  <Footer brand="lab" />
</CrtShell>
```

## Layout primitives

Use layout primitives before writing custom page CSS. They cover the common app shapes for blogs, wikis, portfolios, course pages, and admin dashboards.

```tsx
import {
  AutoGrid,
  ContentFrame,
  Inline,
  PageShell,
  Panel,
  Section,
  SidebarLayout,
  Stack,
  Tag,
} from "phosphor-ui";

export function WikiPage({ nav, toc, children }) {
  return (
    <PageShell
      eyebrow="wiki"
      title="Packet capture checklist"
      description="Reusable runbook for tracing a failing ingestion job."
      actions={<Inline><Tag>runbook</Tag><Tag>ops</Tag></Inline>}
    >
      <SidebarLayout
        left={nav}
        sidebarLabel="content tree"
        right={toc}
        asideLabel="table of contents"
        collapseAt="lg"
      >
        <ContentFrame>
          {children}
        </ContentFrame>
      </SidebarLayout>
    </PageShell>
  );
}
```

For listing pages, combine `Section`, `AutoGrid`, and `Panel`:

```tsx
<Section title="Projects" description="Active builds and field notes.">
  <AutoGrid minItemWidth="18rem">
    <Panel title="Terminal CMS" meta="active">
      <p>Admin publishing tools and content workflows.</p>
    </Panel>
    <Panel title="Course Platform" meta="draft">
      <p>Modules, lessons, progress, and media playback.</p>
    </Panel>
  </AutoGrid>
</Section>
```

For dashboards, use `DashboardGrid` so cards align consistently:

```tsx
<DashboardGrid minItemWidth="14rem">
  <Panel title="Drafts" meta="12">Waiting for review.</Panel>
  <Panel title="Published" meta="48" tone="accent">Live entries.</Panel>
</DashboardGrid>
```

`SidebarLayout` accepts both the legacy `sidebar`/`aside` props and the preferred `left`/`main`/`right` slot names. New code should use `left`, `main` or children, and `right`.

## MDX posts

```tsx
import { PostBody } from "phosphor-ui";
import PostMdx from "./posts/boot.mdx";

<PostBody>
  <PostMdx />
</PostBody>
```

`PostBody` wraps content in `<Prose>`. Use `mdxComponents` with your MDX provider/compiler to map native MDX tags (`h1-h6`, `pre`, `blockquote`, `img`, `hr`, `a`) to phosphor components. Fenced code blocks render via `<CodeBlock>` with Shiki syntax highlighting.

## Hooks

```ts
import { useReadingProgress, useHashRoute } from "phosphor-ui";
```

- **`useReadingProgress<T>()`** → `{ ref, pct }` — tracks element scroll percentage, pair with `<ReadingRail value={pct} />`
- **`useHashRoute({ routes, fallback })`** → `[route, go]` — hash-based router with regex/predicate matchers

## Animation utilities

Included in `global.css`:

| Class | Effect |
|---|---|
| `.pho-page-enter` | CRT blur + brightness fade-in |
| `.pho-fade-up` | translate + opacity fade |
| `.pho-stagger > *` | auto-staggered children (40–520ms) |
| `.pho-flicker-in` | multi-step CRT flicker |
| `.pho-blink::after` | phosphor block cursor |

All respect `prefers-reduced-motion`.

## Develop

```bash
npm install
npm run storybook        # http://localhost:6006
npm run typecheck
npm run build            # rollup → dist/
npm run build-storybook  # static → storybook-static/
```

## Release checks

Before publishing a stable release, run the package validation flow:

```bash
npm run validate:package
```

This runs TypeScript checks, public API export checks, story source audits, Jest,
the library build, and a package smoke test against the generated `dist/`
artifacts. For public API changes, refresh the checked-in declaration snapshot:

```bash
npm run build:types:snapshot
```

Pushes to `prod` are protected by the tracked `pre-push` hook in `.githooks/`.
Enable it once per clone:

```bash
git config core.hooksPath .githooks
```

The hook runs the package validation flow, checks that the next prod patch
version is not already on npm, and runs `npm publish --dry-run` before allowing
the push that triggers the real GitHub Actions publish.

The supported consumer API is the root import plus the documented CSS subpaths.
Deep component imports are internal implementation details.

## CI/CD

The GitHub Actions setup uses `dev` and `prod` as long-lived branches:

- `dev` validates the package and publishes prereleases to npm with the `next`
  dist-tag.
- `prod` validates the package, publishes the stable npm package with the
  `latest` dist-tag, and deploys Storybook to GitHub Pages.

See [docs/branching-and-deploy.md](./docs/branching-and-deploy.md) for branch
setup, required secrets, environments, and release behavior.

## License

MIT © [sektant1](https://github.com/sektant1)
