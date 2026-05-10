import React from "react";
export interface HeaderNavLink {
    label: React.ReactNode;
    href: string;
    glyph?: React.ReactNode;
    active?: boolean;
}
export type HeaderNavVariant = "plain" | "tabs" | "command" | "mobile";
export interface HeaderNavProps extends React.HTMLAttributes<HTMLElement> {
    items: HeaderNavLink[];
    ariaLabel?: string;
    variant?: HeaderNavVariant;
}
export declare const HeaderNav: React.FC<HeaderNavProps>;
