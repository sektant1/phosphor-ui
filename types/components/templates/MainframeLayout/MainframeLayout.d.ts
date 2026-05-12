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
export declare const ContextPanel: React.ForwardRefExoticComponent<ContextPanelProps & React.RefAttributes<HTMLElement>>;
export interface NerdTreeSidebarProps extends NerdTreeProps {
    shellClassName?: string;
}
export declare const NerdTreeSidebar: React.ForwardRefExoticComponent<NerdTreeSidebarProps & React.RefAttributes<HTMLDivElement>>;
type VariantLayoutProps = Omit<MainframeLayoutProps, "variant">;
export declare const PostLayout: React.ForwardRefExoticComponent<VariantLayoutProps & React.RefAttributes<HTMLDivElement>>;
export declare const WikiLayout: React.ForwardRefExoticComponent<VariantLayoutProps & React.RefAttributes<HTMLDivElement>>;
export declare const CourseLayout: React.ForwardRefExoticComponent<VariantLayoutProps & React.RefAttributes<HTMLDivElement>>;
export declare const AdminLayout: React.ForwardRefExoticComponent<VariantLayoutProps & React.RefAttributes<HTMLDivElement>>;
export {};
