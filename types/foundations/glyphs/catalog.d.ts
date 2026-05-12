export interface GlyphItem {
    char: string;
    name?: string;
}
export declare const DEFAULT_GLYPHS: readonly [{
    readonly char: "▌";
    readonly name: "rail";
}, {
    readonly char: "▐";
    readonly name: "rail-r";
}, {
    readonly char: "█";
    readonly name: "block";
}, {
    readonly char: "▓";
    readonly name: "shade-d";
}, {
    readonly char: "▒";
    readonly name: "shade-m";
}, {
    readonly char: "░";
    readonly name: "shade-l";
}, {
    readonly char: "▸";
    readonly name: "tri-r";
}, {
    readonly char: "▾";
    readonly name: "tri-d";
}, {
    readonly char: "▴";
    readonly name: "tri-u";
}, {
    readonly char: "◂";
    readonly name: "tri-l";
}, {
    readonly char: "◆";
    readonly name: "diamond";
}, {
    readonly char: "◇";
    readonly name: "diamond-o";
}, {
    readonly char: "◈";
    readonly name: "diamond-i";
}, {
    readonly char: "●";
    readonly name: "dot";
}, {
    readonly char: "○";
    readonly name: "dot-o";
}, {
    readonly char: "·";
    readonly name: "mid";
}, {
    readonly char: "•";
    readonly name: "bullet";
}, {
    readonly char: "▶";
    readonly name: "play";
}, {
    readonly char: "■";
    readonly name: "sq";
}, {
    readonly char: "□";
    readonly name: "sq-o";
}, {
    readonly char: "☢";
    readonly name: "rad";
}, {
    readonly char: "☣";
    readonly name: "bio";
}, {
    readonly char: "✶";
    readonly name: "star";
}, {
    readonly char: "✷";
    readonly name: "star-8";
}, {
    readonly char: "✦";
    readonly name: "spark";
}, {
    readonly char: "↳";
    readonly name: "ret";
}, {
    readonly char: "└";
    readonly name: "br-bl";
}, {
    readonly char: "├";
    readonly name: "br-l";
}, {
    readonly char: "─";
    readonly name: "h-line";
}, {
    readonly char: "│";
    readonly name: "v-line";
}, {
    readonly char: "╱";
    readonly name: "slash";
}, {
    readonly char: "╲";
    readonly name: "bslash";
}];
export type GlyphName = NonNullable<(typeof DEFAULT_GLYPHS)[number]["name"]>;
export declare const GLYPH_CHAR_BY_NAME: Readonly<Record<string, string>>;
