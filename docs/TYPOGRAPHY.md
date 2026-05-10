# Typography

Phosphor UI loads typography through `@sektant1/phosphor-ui/phosphor.css`, which imports:

```css
@import "./fonts.css";
@import "./tokens.css";
@import "./typography.css";
@import "./global.css";
```

`fonts.css` uses Google Fonts for JetBrains Mono, Space Mono, and VT323. Consumers that need a different font-loading policy can import `tokens.css`, `typography.css`, and `global.css` separately and provide their own fonts.

## Font Roles

- `--pho-font-display`: large display and prose headings.
- `--pho-font-heading`: component headings and section titles.
- `--pho-font-body`: paragraph and long-form reading text.
- `--pho-font-code`: inline code, labels, metadata, and dense UI text.
- `--pho-font-terminal`: terminal prompts, stamps, and CRT command labels.

## Type Scale

Use semantic utilities instead of raw sizes:

- `.t-h1` through `.t-h6`
- `.t-lead`, `.t-body`, `.t-small`, `.t-caption`
- `.t-mono`, `.t-code`, `.t-terminal`, `.t-stamp`, `.t-prompt`
- `.t-muted`, `.t-dim`, `.t-faded`

Control typography uses `--pho-type-control-size`, `--pho-type-control-sm-size`, and `--pho-type-control-lg-size`. Labels, helper text, compact metadata, and dense UI text use `--pho-type-label-size`, `--pho-type-caption-size`, `--pho-type-ui-xs-size`, `--pho-type-ui-sm-size`, and `--pho-type-micro-size`. Decorative text glyphs use `--pho-type-icon-sm-size`, `--pho-type-icon-md-size`, and `--pho-type-icon-lg-size`.

## Migration Note

Local font file exports were removed in favor of Google Fonts. Import `@sektant1/phosphor-ui/phosphor.css` for the default experience, or import the layer CSS files and load compatible font families yourself.
