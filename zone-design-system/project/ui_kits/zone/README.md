# Zone UI Kit — rampage blog (themes/zone)

A pixel-faithful HTML/CSS recreation of the **rampage** static site generator's `zone` theme — sektant1's developer blog.

## Files
- `index.html` — interactive home view (banner + nav + hero + post listing + sidebar + sysinfo + footer)
- `Sidebar.jsx`, `Header.jsx`, `Hero.jsx`, `PostListing.jsx`, `Sysinfo.jsx`, `Footer.jsx` — component breakdowns (inline JSX inside index.html)

## What's recreated
- Three-column shell: NERDTree sidebar / main content / sysinfo telemetry rail
- Classification tape, banner, boot-nav with terminal `>` glyphs
- Hero broadcast panel with HUD strip + Pip-Boy ASCII art + scanline sweep
- `~/zone-net $` prompt + `ls -lah`-style post listing rows
- Footer "perehvat zakonchen" panel with trefoil + dossier + RX channel
- All four CRT overlays (scanlines / noise / vignette / vsync roll)

## What's intentionally lossy
- Search modal, locale switcher, and tag pages are not rebuilt (the home view doesn't show them).
- ASCII hero art is a shorter ~28-row variant rather than the full 60-row skull, to keep the file readable.
