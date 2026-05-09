import React from "react";
export interface HeaderNavLink {
    label: React.ReactNode;
    href: string;
    glyph?: React.ReactNode;
    active?: boolean;
}
export interface HeaderNavProps extends React.HTMLAttributes<HTMLElement> {
    items: HeaderNavLink[];
    ariaLabel?: string;
}
export declare const HeaderNav: React.FC<HeaderNavProps>;
