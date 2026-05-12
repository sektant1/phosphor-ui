export interface GlyphItem {
  char: string;
  name?: string;
}

export const DEFAULT_GLYPHS = [
  { char: "▌", name: "rail" },
  { char: "▐", name: "rail-r" },
  { char: "█", name: "block" },
  { char: "▓", name: "shade-d" },
  { char: "▒", name: "shade-m" },
  { char: "░", name: "shade-l" },
  { char: "▸", name: "tri-r" },
  { char: "▾", name: "tri-d" },
  { char: "▴", name: "tri-u" },
  { char: "◂", name: "tri-l" },
  { char: "◆", name: "diamond" },
  { char: "◇", name: "diamond-o" },
  { char: "◈", name: "diamond-i" },
  { char: "●", name: "dot" },
  { char: "○", name: "dot-o" },
  { char: "·", name: "mid" },
  { char: "•", name: "bullet" },
  { char: "▶", name: "play" },
  { char: "■", name: "sq" },
  { char: "□", name: "sq-o" },
  { char: "☢", name: "rad" },
  { char: "☣", name: "bio" },
  { char: "✶", name: "star" },
  { char: "✷", name: "star-8" },
  { char: "✦", name: "spark" },
  { char: "↳", name: "ret" },
  { char: "└", name: "br-bl" },
  { char: "├", name: "br-l" },
  { char: "─", name: "h-line" },
  { char: "│", name: "v-line" },
  { char: "╱", name: "slash" },
  { char: "╲", name: "bslash" },
] as const satisfies readonly GlyphItem[];

export type GlyphName = NonNullable<(typeof DEFAULT_GLYPHS)[number]["name"]>;

export const GLYPH_CHAR_BY_NAME = Object.freeze(
  DEFAULT_GLYPHS.reduce<Record<string, string>>((acc, glyph) => {
    if (glyph.name) acc[glyph.name] = glyph.char;
    return acc;
  }, {}),
);
