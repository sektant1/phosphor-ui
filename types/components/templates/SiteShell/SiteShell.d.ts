import React from "react";
import type { CrtShellProps } from "../../organisms/CrtShell";
import type { HeaderLocale, HeaderNavItem, HeaderProps } from "../../organisms/Header";
import type { FooterLink, FooterProps } from "../../organisms/Footer";
export interface SiteShellProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    title: string;
    children: React.ReactNode;
    tagline?: React.ReactNode;
    nav?: HeaderNavItem[];
    locales?: HeaderLocale[];
    homeHref?: string;
    header?: React.ReactNode;
    headerProps?: Omit<HeaderProps, "title" | "tagline" | "nav" | "locales" | "homeHref">;
    footer?: React.ReactNode;
    footerLinks?: FooterLink[];
    footerProps?: Omit<FooterProps, "brand" | "links">;
    brand?: React.ReactNode;
    crt?: boolean;
    crtProps?: Omit<CrtShellProps, "children" | "className">;
    contentId?: string;
    skipLinkLabel?: string;
    maxWidth?: string;
    frameClassName?: string;
    mainClassName?: string;
}
export declare const SiteShell: React.ForwardRefExoticComponent<SiteShellProps & React.RefAttributes<HTMLDivElement>>;
