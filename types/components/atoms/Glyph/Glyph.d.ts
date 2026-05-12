import React from "react";
import { type GlyphName } from "../../../foundations/glyphs/catalog";
export type { GlyphName };
export type GlyphTone = "primary" | "accent" | "danger" | "muted" | "inherit";
export interface GlyphProps extends React.HTMLAttributes<HTMLSpanElement> {
    char?: string;
    name?: GlyphName | string;
    size?: number | string;
    tone?: GlyphTone;
    boxed?: boolean;
    label?: string;
    decorative?: boolean;
}
export declare const Glyph: React.FC<GlyphProps>;
