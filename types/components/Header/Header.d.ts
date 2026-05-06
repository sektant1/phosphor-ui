import React from "react";
import "./Header.scss";
export interface HeaderNavItem {
    label: React.ReactNode;
    href: string;
    active?: boolean;
}
export interface HeaderLocale {
    code: string;
    label: React.ReactNode;
    href: string;
    active?: boolean;
}
export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    title: string;
    homeHref?: string;
    bannerFont?: string;
    tagline?: React.ReactNode;
    nav?: HeaderNavItem[];
    locales?: HeaderLocale[];
    rule?: boolean;
    align?: "left" | "center";
}
declare const Header: React.FC<HeaderProps>;
export default Header;
