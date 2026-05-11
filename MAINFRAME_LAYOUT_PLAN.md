# Mainframe Layout Plan

## Changed files

- `src/components/templates/MainframeLayout/*`
  - New mainframe template primitives and stories.
- `src/components/templates/PostTemplate/Post.tsx`
  - `Post` now composes the mainframe grid and accepts `leftPanel` / `rightPanel` while preserving `sidebar`.
- `src/components/templates/PostTemplate/Post.module.scss`
  - Removed the old post-only sidebar grid and moved sizing to mainframe tokens.
- `src/components/content/Prose/Prose.scss`
  - Added explicit prose max-width, min-width, and horizontal overflow handling for code/table-heavy content.
- `src/components/index.ts`
  - Exported the new layout primitives from the public root.

## New layout components

- `MainframeLayout`
  - Content-aware shell with `variant="post" | "wiki" | "course" | "project" | "admin"`.
  - Accepts `leftPanel`, `rightPanel`, `children`, optional `header`, and optional `footer`.
- `NerdTreeSidebar`
  - Convenience wrapper around `NerdTree` for the left rail.
- `MainContent`
  - Center content primitive used by the layout.
- `ContextPanel`
  - Right rail wrapper for TOC, backlinks, modules, metadata, or admin actions.
- `PostLayout`, `WikiLayout`, `CourseLayout`, `AdminLayout`
  - Thin variant wrappers around `MainframeLayout`.

## Responsive behavior

- Desktop:
  - Three-column grid: left NerdTree rail / main content / right context panel.
  - Side panels have clamp-based min/max widths and optional sticky positioning.
- Medium:
  - Left rail and main remain side-by-side when there is enough room.
  - When both rails are present, the right panel moves below the mainframe row before the main column becomes cramped.
- Small:
  - Single-column layout.
  - `NerdTree` keeps its drawer trigger behavior.
  - Context panel moves below the content.

## Content width rules

- Long-form prose uses `--pho-layout-prose-max` and never competes with fixed rails below the collapse breakpoint.
- Course, project, and admin variants use the wider `--pho-layout-content-max`.
- Main columns use `minmax()` with nonzero readable minimums on desktop and `minmax(0, 1fr)` on small screens.
- Code blocks and tables scroll horizontally inside the prose column instead of widening or squeezing the page.

## Migration notes

- Existing `Post sidebar={...}` continues to work and now maps to the right context rail.
- New pages should prefer:
  - `leftPanel={<NerdTreeSidebar ... />}`
  - `rightPanel={<ContextPanel ... />}` or a direct component such as `TableOfContents`.
- Existing imports remain valid. New primitives are available from `@sektant1/phosphor-ui`.
