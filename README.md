<div align="center">

<!-- Replace with actual logo asset -->
<img src=".github/assets/logo.png" alt="phosphor-ui logo" width="120" height="120" />

<h1>phosphor-ui</h1>

<p>Single-channel green-phosphor React component library.<br/>Retro · military · cyberpunk CRT aesthetic.</p>

[![npm version](https://img.shields.io/npm/v/@sektant1/phosphor-ui?color=2cff7a&labelColor=03110a&style=flat-square)](https://www.npmjs.com/package/@sektant1/phosphor-ui)
[![npm downloads](https://img.shields.io/npm/dm/@sektant1/phosphor-ui?color=2cff7a&labelColor=03110a&style=flat-square)](https://www.npmjs.com/package/@sektant1/phosphor-ui)
[![license](https://img.shields.io/github/license/sektant1/phosphor?color=2cff7a&labelColor=03110a&style=flat-square)](./LICENSE)
[![Storybook](https://img.shields.io/badge/storybook-live-2cff7a?labelColor=03110a&style=flat-square)](https://sektant1.github.io/phosphor)
[![TypeScript](https://img.shields.io/badge/typescript-strict-2cff7a?labelColor=03110a&style=flat-square)](https://www.typescriptlang.org)

</div>

---

<!-- Replace with actual screenshots -->
<div align="center">
  <img src=".github/assets/screenshot-hero.png" alt="Hero frame and post listing" width="100%" />
</div>

<br/>

<div align="center">
  <img src=".github/assets/screenshot-codeblock.png" alt="CodeBlock with phosphor syntax theme" width="48%" />
  &nbsp;
  <img src=".github/assets/screenshot-components.png" alt="Component grid — buttons, callouts, inputs" width="48%" />
</div>

---

## Install

```bash
npm install @sektant1/phosphor-ui
```

Peer deps: `react ^17||^18`, `react-dom ^17||^18`.  
`@mdx-js/react ^2` is optional — only needed for `<PostBody>` MDX rendering.

## Setup

Import once at the app root:

```tsx
import "@sektant1/phosphor-ui/tokens.css";  // CSS custom properties + fonts
import "@sektant1/phosphor-ui/global.css";  // base resets + animation utilities
```

## Quick start

```tsx
import {
  CrtShell, Header, Footer,
  NerdTree, HeroFrame, CourseCard,
  PostBody, Callout,
} from "@sektant1/phosphor-ui";

export default function App() {
  return (
    <CrtShell>
      <Header title="phosphor ui" nav={[{ label: "log", href: "/log" }]} />
      <HeroFrame title="boot sequence" subtitle="signal acquired." />
      <Footer
        brand="phosphor ui"
        links={[{ label: "github", href: "https://github.com/sektant1/phosphor" }]}
        status={{ label: "link", value: "STABLE" }}
      />
    </CrtShell>
  );
}
```

## Components

| Group | Components |
|---|---|
| **Layout** | `CrtShell` `Header` `Footer` `FooterStencil` `HeroFrame` `NerdTree` `PdaWindow` |
| **Content** | `Prose` `PostBody` `Callout` `CodeBlock` `Hr` `Tag` `Text` `AsciiBanner` `TerminalPrompt` |
| **Lists** | `PostListing` `PostRow` `CourseCard` `LessonRow` `ModuleAccordion` `PrereqList` `Exercise` |
| **Nav** | `BootNav` `Pagination` `Stepper` `TableOfContents` `Link` |
| **Form** | `Button` `Input` `Textarea` `Checkbox` |
| **Feedback** | `ProgressBar` `ReadingRail` `VideoPlayer` |

## MDX posts

```tsx
import { PostBody } from "@sektant1/phosphor-ui";
import PostMdx from "./posts/boot.mdx";

<PostBody>
  <PostMdx />
</PostBody>
```

`PostBody` wraps content in `<Prose>` + `MDXProvider`. Native MDX tags (`h1–h6`, `pre`, `blockquote`, `img`, `hr`, `a`) render with full phosphor styling. Fenced code blocks render via `<CodeBlock>` with Shiki syntax highlighting.

## Hooks

```ts
import { useReadingProgress, useHashRoute } from "@sektant1/phosphor-ui";
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
| `.pho-blink::after` | blinking cursor |

All respect `prefers-reduced-motion`.

## Develop

```bash
npm install
npm run storybook        # http://localhost:6006
npm run typecheck
npm run build            # rollup → dist/
npm run build-storybook  # static → storybook-static/
```

## License

MIT © [sektant1](https://github.com/sektant1)
