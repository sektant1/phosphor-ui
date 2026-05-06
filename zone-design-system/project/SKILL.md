---
name: zone-design
description: Use this skill to generate well-branded interfaces and assets for the Zone / Sektant brand — a retro / military / 80s CRT terminal / Fallout Pip-Boy 3000 / STALKER GAMMA aesthetic. Single-channel green phosphor — every accent is a shade of green. Useful for production code or throwaway prototypes, mocks, and decks.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key rules to internalise:
- **Single-channel green only.** No warm channels, no red, no purple. Errors get more glow, not a hue shift.
- **Mono fonts everywhere** (`JetBrains Mono` for body/headings, `Space Mono` for display, `VT323` for terminal voice).
- **Hard right-angle corners.** `border-radius: 0` everywhere except LED indicators.
- **No emoji.** Use box-drawing characters (`▌ ▸ ▾ █ ▓ ▒ ░ ☢ ◇`).
- **CRT chrome** (scanlines + noise + vignette + vsync roll) goes on every page as fixed overlays.
- **Lowercase body copy.** Headings get `text-transform: uppercase` via CSS, not by typing in caps.
- **Cyrillic chrome** (`СЕКРЕТНО`, `ОПЕРАТОР`, `~/zone-net $`) is decorative — never used for real info.
