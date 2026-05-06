import React from "react";
export interface TocItem {
    label: React.ReactNode;
    href: string;
    glyph?: string;
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
}
export declare const TableOfContents: React.FC<TableOfContentsProps>;
