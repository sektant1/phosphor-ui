# Header Redesign

## Changed files

- `src/components/organisms/Header/Header.tsx`
- `src/components/organisms/Header/Header.scss`
- `src/components/organisms/Header/Header.stories.tsx`
- `src/components/organisms/Header/Header.test.tsx`
- `src/components/molecules/HeaderNav/HeaderNav.module.scss`

## Notes

- Redesigned the header/topbar around a compact dark CRT terminal treatment using existing `--pho-*` color, spacing, motion, focus, and glow tokens.
- Added default ASCII banner rendering for the header. `sektant's hideout` uses a bundled pre-rendered ASCII banner so it does not fall back to plain text when `figlet` is unavailable in the browser.
- Kept the existing `AsciiBanner` neon/flicker/jitter animation behavior, including its existing `prefers-reduced-motion` handling.
- Added bracket-style nav links, a simple active state, and hover/focus glow only for interactive emphasis.
- Preserved the previous header layout structure: centered banner/title area, toolbar row, desktop nav, mobile nav, inline locale switch, and rule.
- Defaulted Header locale rendering to the `inline` locale variant.
- Removed the terminal frame treatment and omitted `ONLINE`/`LOCAL` from the examples.
- Kept active nav links using `aria-current="page"`.
- Updated Header stories to use the requested title and nav labels: Blog, Wiki, Projects, Course, About.

## Verification

- `npm run typecheck`
- `npm test -- Header --runInBand`
- `npm run build`
