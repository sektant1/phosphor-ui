import React from "react";
export interface TocItem {
    label: React.ReactNode;
    href: string;
    glyph?: string | null;
    state?: "default" | "active" | "done";
    children?: TocItem[];
}
export interface TableOfContentsProps {
    heading?: React.ReactNode;
    items: TocItem[];
    foot?: React.ReactNode;
    className?: string;
    spy?: boolean;
    smoothScroll?: boolean;
    /**
     * Distance from viewport top (in px) used to decide which heading is
     * "current" while scrolling. A heading becomes active once its top edge
     * crosses above this offset. Default: 25% of viewport height.
     */
    spyOffset?: number;
    /**
     * When true, parent items with children render a fold toggle and can be
     * collapsed. Default: true.
     */
    collapsible?: boolean;
    /**
     * When true (and `collapsible`), parent items start collapsed. Default: false.
     */
    defaultCollapsed?: boolean;
    /**
     * Render the glyph column. Set false to hide glyphs entirely.
     * Per-item `glyph: null` also suppresses an individual glyph. Default: true.
     */
    showGlyphs?: boolean;
    /**
     * Default glyph for top-level items. Overridden by `TocItem.glyph`. Default: "▌".
     */
    glyph?: string;
    /**
     * Default glyph for nested items. Overridden by `TocItem.glyph`. Default: "·".
     */
    subGlyph?: string;
}
export declare const TableOfContents: React.FC<TableOfContentsProps>;
