import React from "react";
export interface SeriesNavItem {
    title: string;
    href: string;
}
export interface SeriesNavProps {
    seriesTitle: string;
    current: number;
    total: number;
    prev?: SeriesNavItem;
    next?: SeriesNavItem;
    className?: string;
}
export declare const SeriesNav: React.FC<SeriesNavProps>;
