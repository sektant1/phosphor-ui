import React from "react";
import { useReadingProgress } from "../hooks";
import "./demo.scss";
export declare type Route = "home" | "post" | "course";
export declare const useHashRoute: () => [Route, (hash: string) => void];
export { useReadingProgress };
export declare const SITE_TITLE = "phosphor ui";
export declare const SITE_TAGLINE = "// \u0421\u0415\u041A\u0420\u0415\u0422\u041D\u041E // single-channel transmissions";
export declare const NAV_ITEMS: {
    label: string;
    href: string;
}[];
export declare const SiteHeader: React.FC<{
    active?: string;
}>;
export declare const SiteFooter: React.FC;
export declare const SiteTree: React.FC<{
    active?: string;
}>;
export declare const Page: React.FC<{
    active?: string;
    children: React.ReactNode;
    routeKey?: string;
}>;
