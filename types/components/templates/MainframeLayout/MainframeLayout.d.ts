import React from "react";
import type { NerdTreeProps } from "../../organisms/NerdTree";
export type MainframeVariant = "post" | "wiki" | "course" | "project" | "admin";
export interface MainframeLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: MainframeVariant;
    leftPanel?: React.ReactNode;
    rightPanel?: React.ReactNode;
    children: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    leftPanelLabel?: string;
    rightPanelLabel?: string;
    mainAs?: MainContentProps["as"];
    mainClassName?: string;
    leftPanelClassName?: string;
    rightPanelClassName?: string;
    stickyPanels?: boolean;
}
/**
 * @deprecated Prefer `PageShell` plus `SidebarLayout`, `ContentFrame`, and
 * `Panel` for new layouts. `MainframeLayout` remains available as a
 * compatibility/template wrapper for older blog/wiki/course/admin examples.
 */
export declare const MainframeLayout: React.ForwardRefExoticComponent<MainframeLayoutProps & React.RefAttributes<HTMLDivElement>>;
export interface MainContentProps extends React.HTMLAttributes<HTMLElement> {
    as?: "main" | "section" | "article" | "div";
}
export declare const MainContent: React.ForwardRefExoticComponent<MainContentProps & React.RefAttributes<HTMLElement>>;
export interface ContextPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
    title?: React.ReactNode;
    meta?: React.ReactNode;
    as?: "aside" | "section" | "div";
}
/**
 * @deprecated Prefer `Panel` for reusable framed right-rail content.
 */
export declare const ContextPanel: React.ForwardRefExoticComponent<ContextPanelProps & React.RefAttributes<HTMLElement>>;
export interface NerdTreeSidebarProps extends NerdTreeProps {
    shellClassName?: string;
}
/**
 * @deprecated Prefer composing `NerdTree` inside the `left` slot of
 * `SidebarLayout`; keep this wrapper for existing Mainframe examples.
 */
export declare const NerdTreeSidebar: React.ForwardRefExoticComponent<NerdTreeSidebarProps & React.RefAttributes<HTMLDivElement>>;
type VariantLayoutProps = Omit<MainframeLayoutProps, "variant">;
/**
 * @deprecated Prefer `PageShell` plus `SidebarLayout`.
 */
export declare const PostLayout: React.ForwardRefExoticComponent<VariantLayoutProps & React.RefAttributes<HTMLDivElement>>;
/**
 * @deprecated Prefer `PageShell` plus `SidebarLayout`.
 */
export declare const WikiLayout: React.ForwardRefExoticComponent<VariantLayoutProps & React.RefAttributes<HTMLDivElement>>;
/**
 * @deprecated Prefer a course recipe built from `PageShell`, `SidebarLayout`,
 * `ContentFrame`, and `Panel`.
 */
export declare const CourseLayout: React.ForwardRefExoticComponent<VariantLayoutProps & React.RefAttributes<HTMLDivElement>>;
/**
 * @deprecated Prefer `AppShell`, `PageShell`, `DashboardGrid`, and `Panel`.
 */
export declare const AdminLayout: React.ForwardRefExoticComponent<VariantLayoutProps & React.RefAttributes<HTMLDivElement>>;
export {};
