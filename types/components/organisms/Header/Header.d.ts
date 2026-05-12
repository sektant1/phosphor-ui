import React from "react";
import { type BannerFontName } from "../../../ascii";
import type { HeaderNavVariant } from "../../molecules/HeaderNav";
import type { LocaleSwitchItem, LocaleSwitchVariant } from "../../molecules/LocaleSwitch";
import "./Header.scss";
export interface HeaderNavItem {
    label: React.ReactNode;
    href: string;
    active?: boolean;
}
export interface HeaderLocale extends LocaleSwitchItem {
}
export type HeaderVariant = "masthead" | "compact" | "terminal";
export type HeaderMobileLayout = "scroll" | "stack";
export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    title: string;
    homeHref?: string;
    bannerArt?: string;
    bannerFont?: BannerFontName;
    showAsciiBanner?: boolean;
    tagline?: React.ReactNode;
    status?: React.ReactNode;
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
