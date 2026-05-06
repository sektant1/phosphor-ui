import React from "react";
export interface BootNavItem {
    label: string;
    href: string;
    glyph?: string;
    active?: boolean;
}
export interface BootNavProps {
    items: BootNavItem[];
    className?: string;
    ariaLabel?: string;
}
export declare const BootNav: React.FC<BootNavProps>;
