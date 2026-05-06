# Zone Design System

> _retro / military / 80s terminal / Fallout Pip-Boy 3000 / STALKER GAMMA_
> _single-channel phosphor — every accent is a shade of green._

A design system extracted from **sektant's hideout** ([sektant1/sektant1.github.io](https://github.com/sektant1/sektant1.github.io)) — the developer blog of a TypeScript static-site generator called **rampage**, styled like a late-80s CRT terminal sitting in a bunker somewhere in the Chernobyl Exclusion Zone.

The blog ships four themes (`zone`, `crt`, `amber`, `pipboy`); this design system canonicalises the **`zone` theme** as the primary brand, with `pipboy` and `crt` documented as variants.

## Sources
- **Repo:** `sektant1/sektant1.github.io@master`
- **Primary theme:** `themes/zone/` (palette, layouts, partials)
- **Variants:** `themes/pipboy/`, `themes/crt/`, `themes/amber/`
- **Sample content:** `content/posts/*.md`, `content/pages/about.md`
- **Brand assets:** `static/{favicon.svg, icon.svg, og-image.png, ...}` — copied into `assets/`

---

## Index

| File / folder         | Purpose                                                  |
|-----------------------|----------------------------------------------------------|
| `README.md`           | This file — context, content, visual foundations         |
| `colors_and_type.css` | All design tokens (CSS vars) — colors, type, spacing, z  |
| `assets/`             | Logos, icons, OG images (radiation trefoil)              |
| `preview/`            | Cards rendered in the Design System tab                  |
| `ui_kits/zone/`       | UI kit recreation of the rampage `zone` blog            |
| `SKILL.md`            | Agent-skill manifest (use this skill from Claude Code)   |

---

## Brand vocabulary

The brand is a fictional cold-war-era radio bunker. Every surface is a CRT tube. The metaphor is consistent: posts are "transmissions", build timestamps are "last contact", search queries are typed at a `~/zone-net $` prompt, the operator is signed in as `sektant1` from `припять-9`. Russian Cyrillic is used as decorative chrome (not for actual i18n) — `СЕКРЕТНО`, `ЧЕРНОБЫЛЬСКАЯ ЗОНА ОТЧУЖДЕНИЯ`, `ОПЕРАТОР`, `АНОМАЛЬНАЯ АКТИВНОСТЬ`.

---

## Content fundamentals

### Voice
- **Tone:** dry, terse, military-radio. Lowercase by default. Punctuation minimal. Frequent terminal verbs (`grep`, `cat`, `tail`).
- **POV:** first-person sparingly ("I"), but the system itself often speaks in operator-log voice (no pronouns, just commands and stamps).
- **Casing:** **all-lowercase** for body and post titles ("how to setup neovim", "neovim zero to hero ide"). Headings inside the rendered page get UPPERCASED via CSS `text-transform`, not in the markdown.
- **Profanity / casual:** allowed and expected ("How tf will I be more productive…", "sudo pacman -S neovim", "(btw)").
- **Cyrillic chrome:** Russian text is decoration only — `// СЕКРЕТНО //` tape, `последняя передача`, `артефакты`, `сигнал`, `~/zone-net $`. Never used to convey real information.
- **No emoji.** The aesthetic is single-channel green; emoji break the tube. Use box-drawing characters and unicode blocks instead (▌ ▸ ▾ █ ▓ ▒ ░ ☢ ◇ ╔ ╗ ╚ ╝ │ ─).
- **No marketing fluff.** No exclamation marks selling anything. Write like a sysadmin documenting an outage.

### Specific examples (verbatim from the source)
- Post title: `Neovim Zero to Hero IDE`
- Post intro: `When you compare the out-of-the-box Neovim experience with, lets say, Vscode, your first impression would probably be: "How tf will I be more productive with this?"`
- Empty-list message: `// нет передач в журнале — попробуй npm run new my-first-report`
- Pagination: `<< прошлая смена` … `следующая смена >>`
- Footer EOF: `// EOF // конец передачи. удачной ходки, сталкер.`
- Operator dossier:
  ```
  callsign   :: sektant1
  clearance  :: ОДИНОЧКА
  faction    :: вольный сталкер · без альянса
  origin     :: припять-9 · сектор-7
  ```
- Doctrine bullets: `> grind skills irl  > minimize copes, maximize reps  > clarity > comfort`
- About page contact: `*email:* contact@sektant.dev · *gpg:* 0xDEADBEEF · *radio:* CQ on 14.230 MHz, mostly evenings, near Электрозаводск`
- Hero HUD strip: `// СЕКТОР-7 // АНОМАЛЬНАЯ АКТИВНОСТЬ // 2026-05-04 // ОПЕРАТОР sektant1 //`

### Microcopy patterns
- Labels are uppercased single words: `DATA`, `AUTHOR`, `READ MIN`, `сигнал`, `TAGS`.
- Stat units are tabular: `14 µR/h`, `~3 м` (minutes), `CH 0x1D`.
- Status labels: `СТАБИЛЕН`, `ПРИНЯТО`, `НОРМ`, `АНОМ`.
- Section IDs: `REPORT/HOW-TO-SETUP-NEOVIM`, `OBJECT-4`, `BEAR-4`.

---

## Visual foundations

### Palette
- **Single-channel green phosphor.** No warm channels, no blood-red. Even error states stay green — they get a wider glow and dashed border instead of a hue shift.
- Primary `#2cff7a`, bright highlight `#b6ffce`, mid `#1fb854`, deep `#0a4d22`.
- Tube body `#04140a` (near-black w/ green undertone), raised `#082416`, deep `#010604`.
- Accent column ("magenta" var name retained from the CRT base it forks) is a slightly cooler/paler green: `#62ff9a` / `#d6ffe2` / `#157a3b` / `#06321a`.
- Code-block tokens span teal → mint → lime → moss for syntax distinction without leaving the green family.

### Typography
- **Display / heading:** `Space Mono` and `JetBrains Mono` interchangeably. Headings UPPERCASE with positive tracking (0.04 – 0.10em).
- **Body:** `JetBrains Mono`. Small (15–17px), generous line-height (1.6–1.7), `text-wrap: pretty`-friendly.
- **Terminal voice:** `VT323` — used for prompts, HUD strips, classification stamps, telemetry rows. Larger size (1.15em+), wider letter-spacing.
- **No proportional fonts anywhere.** Everything is mono. This is deliberate — the brand is a typewriter terminal.
- **Glow** is the primary emphasis tool. Strong elements get `--glow-emerald`; weak elements drop the shadow entirely (`text-shadow: none`).
- Headings prefix with terminal glyphs: `// ` for h2 (with a 3px-solid green left rail), `▸ ` for h3, `└─ ` for h4.

### Backgrounds
- Page bg is a vertical radial-gradient from raised → bg → deep — a "sodium pool" of light at the top center.
- No imagery, no full-bleed photos, no gradients with multiple hues. The only non-green color is `#000`.
- **Texture is procedural:** scanlines (3px repeat), CRT noise (animated SVG turbulence at 4% opacity), corner vignette, slow vsync roll bar. Layered as fixed overlays at z-index 9000+.

### Borders
- Hierarchy from strong → weak: `--border-frame` (2px solid) → `--border-line` (1px solid) → `--border-dash` (1px dashed) → `--border-dot`.
- All in `--phosphor-fade` or `--phosphor-dim` (deep forest greens).
- Accented rails: `--rail-strong` (2px solid bright phosphor) used as left-borders on h2 and important panels; `--rail-quote` (3px double) for blockquotes.
- Outer chrome uses `outline: 1px dashed; outline-offset: -8px;` to simulate a stencilled mil-spec frame inside the main border.

### Corner radii
- **None.** `border-radius: 0` everywhere. Hard right-angle CRT pixel grid. The only round things are `.hud-led` indicators (50%) and the `<svg>` radiation trefoil paths.

### Shadows
- No box-shadows in the conventional UI sense. Depth is communicated by:
  1. Layered `--bg-raise` surfaces.
  2. Inset glow: `box-shadow: inset 0 0 80px rgba(44,255,122,0.08)` and `inset 0 0 24px rgba(44,255,122,0.04)`.
  3. Outer glow on key elements: `box-shadow: 0 0 24px rgba(44,255,122,0.18), 0 0 60px rgba(44,255,122,0.06)`.
- Text-shadow is the workhorse — three tiers (`--glow-emerald` / `--glow-magenta` / `--glow-amber` for accent, all green-tinted).

### Animation
- **Heavy use of micro-animations** to sell the "live tube" feeling, but all subtle and looped:
  - `geigerTick` — 2.4s short flash + double-pulse on a fixed overlay (radiation click).
  - `vsyncRoll` — 11s slow vertical-sync bright bar drifting top→bottom.
  - `hsyncJitter` — 4s; banner glitches sideways one frame every cycle.
  - `shellFlicker` — 6s low-amplitude brightness wobble.
  - `noiseShift` — 1.2s, 6 steps; phosphor noise jitter.
  - `flicker` — 7s linear; horizontal chromatic flicker.
  - `bootline` — 280ms `steps(12) backwards`; nav items reveal as if typed.
  - `blink` — 1.05s `steps(2)`; cursor.
  - `hudPulse`, `hudBlink` — LED indicators.
  - `bloomPulse`, `heroBreathe`, `heroGlitch`, `heroScan` — hero ASCII art glow modulation.
- **Easing:** mostly `linear` and `steps(N)` (CRT scan / tape feel). Smooth `ease-in-out` only on the hero breathe and HUD pulse.
- **Reduced motion:** all animations gated behind `prefers-reduced-motion: reduce`. Cursor stays solid, noise/flicker layers `display: none`.

### Hover states
- **Inverted block.** Links flip to `background: var(--magenta); color: var(--bg); text-shadow: none;` — like a terminal selection. No fade, no transition (`transition: none`).
- Border-bottoms switch from `dashed` to solid bright phosphor.
- LED chips scale to 0.85 and fade to 0.45 opacity in a slow pulse.

### Press / focus states
- `:focus-visible` matches hover. No outline ring — outline goes `none` and the inverted block carries focus.
- No press-shrink animation. Buttons feel like keypresses, not bounces.

### Transparency / blur
- Blur is used **only sparingly** — the `hsyncJitter` keyframe applies `filter: blur(0.3px–0.4px)` for a single frame to mimic a tube losing horizontal lock.
- Translucent surfaces: `rgba(44, 255, 122, 0.04–0.08)` — a faint green wash on raised panels and code-block backgrounds.
- No backdrop-filter. No frosted glass.

### Layout rules
- Three-column shell on desktop: `[NERDTree sidebar] [main container] [sysinfo telemetry rail]`.
- Below 1180px the sysinfo rail hides; below 760px the sidebar becomes an off-canvas drawer.
- Body content is constrained to `max-width: 72ch` for legibility.
- Container padding is `clamp(1.5rem, 4vw, 3.5rem)` horizontally.
- Listing rows are CSS-grid templated — the listing-header and post-row share the exact same column template so columns line up like `ls -lah` output.

### Iconography (see ICONOGRAPHY below)
- Logo: a hand-built radiation-trefoil SVG (3 sectors + center dot, single fill color = `#2cff7a`).
- UI icons: **none**. Box-drawing chars and unicode glyphs do all the work.

### Cards / panels
- **Cards have no rounded corners and no drop shadows.** They are bordered rectangles with a faint green glow and an optional inner stencil outline (`outline: 1px dashed; outline-offset: -8px`).
- "PDA windows" use a top bar with 3 LEDs (REC / RX / PWR), a title slug, and a meta cluster.
- "Stencil corners": a `+` glyph absolutely positioned at each corner over a dashed border to fake mil-spec stenciling.

---

## Iconography

The brand uses **almost no traditional UI icons**. Here's what it actually does:

- **Logo:** the radiation trefoil — a hand-coded SVG with 3 arc-paths + center dot, single `#2cff7a` fill. Available as `assets/favicon.svg` (transparent), `assets/icon.svg` (rounded square), `assets/icon-192.png`, `assets/icon-512.png`. Used as favicon, manifest icons, PDA chrome.
- **OG image:** `assets/og-image.png` / `assets/og.svg` — full Sektant brand panel for social shares.
- **No icon font, no icon set (no Lucide, no Heroicons, no Material).**
- **Box-drawing characters carry all UI semantics:**
  - `▌` — list-item glyph (left bar, looks like a CRT cursor block).
  - `▾` `▸` — fold/unfold (open / closed) for the NERDTree sidebar.
  - `▸` — h3 prefix glyph.
  - `└─` — h4 prefix glyph (tree-branch).
  - `▮` — typing cursor caret.
  - `┌─[ ]──` — h2 wrapper bracket (CRT theme variant).
  - `═══════ ◇ ═══════` — `<hr>` content.
  - `█▓▒░` — gradient bar / radiation strength bars.
  - `+` — corner stencils on framed panels.
  - `☢` — radiation symbol (used as a tag-row prefix glyph).
- **Unicode-only emoji-substitutes:** `▮ ◇ ☢ ▌ ▾ ▸ █ ▓ ▒ ░` — all printable in any monospace font.
- **No emoji.** Not anywhere. The single-channel green tube cannot render `💚`.
- **ASCII art** is heavily used as branded imagery — figlet banners for the site title, an enormous skull/Pip-Boy ASCII for the home hero (~60 lines × ~90 cols), and a small radiation-trefoil ASCII (`▄█████▄ / ███████▌ / ▐██████▌`) in the footer.

When you need an icon and box-drawing won't carry it: prefer a 16–24 px monochrome SVG (single `--phosphor` fill, no stroke), no rounded joins, hard right angles. **Never substitute an emoji or a colored icon-set glyph.**

---

## Substitutions

- **Fonts:** No font files were attached. The blog loads `VT323`, `Space Mono`, and `JetBrains Mono` from Google Fonts, which is the canonical source — this design system links them the same way. **No substitutions made.** If you want offline copies, drop the `.woff2` files into `fonts/` and update `colors_and_type.css`.
- **Icons:** No icon set used in the source — none substituted.
- **OG image:** Source PNG copied verbatim.

---

## What's not in this system (yet)

- Form controls beyond `<input type="text">` (no checkbox / radio / toggle styles in the source — the blog has none).
- Modal / dialog patterns — none in the source.
- Toast / notification patterns — none in the source.
- A full mobile breakdown beyond the off-canvas sidebar drawer.

If you need any of these, **build them in-system** (hard corners, single-channel green, no rounded radii) and contribute back.
