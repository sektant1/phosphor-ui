import React from "react";
import type { HeaderNavVariant } from "../HeaderNav";
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
export type HeaderVariant = "masthead" | "compact" | "terminal";
export type HeaderMobileLayout = "scroll" | "stack";
export type LocaleSwitchVariant = "inline" | "segmented" | "terminal";
export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    title: string;
    homeHref?: string;
    bannerArt?: string;
    bannerFont?: string;
    tagline?: React.ReactNode;
    nav?: HeaderNavItem[];
    locales?: HeaderLocale[];
    navAriaLabel?: string;
    localeAriaLabel?: string;
    variant?: HeaderVariant;
    navVariant?: HeaderNavVariant;
    localeVariant?: LocaleSwitchVariant;
    mobileLayout?: HeaderMobileLayout;
    rule?: boolean;
    align?: "left" | "center";
}
declare const Header: React.FC<HeaderProps>;
export default Header;
