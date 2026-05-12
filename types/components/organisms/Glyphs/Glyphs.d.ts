import React from "react";
import { DEFAULT_GLYPHS, type GlyphItem } from "../../../foundations/glyphs";
export { DEFAULT_GLYPHS };
export type { GlyphItem };
export interface GlyphsProps {
    items?: readonly GlyphItem[];
    showLabels?: boolean;
    onSelect?: (item: GlyphItem) => void;
    className?: string;
}
export declare const Glyphs: React.FC<GlyphsProps>;
