import React from "react";
type LayoutElement = keyof JSX.IntrinsicElements;
type LayoutGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
type LayoutSpace = LayoutGap | string | number;
type LayoutBreakpoint = "sm" | "md" | "lg";
type GridColumns = number | React.CSSProperties["gridTemplateColumns"];
interface ResponsiveVisibilityProps {
    hideOnMobile?: boolean;
    showOnMobile?: boolean;
    fullWidth?: boolean;
}
type PolymorphicProps<T extends LayoutElement> = Omit<React.ComponentPropsWithoutRef<T>, "as"> & {
    as?: T;
};
type LayoutPolymorphicProps<T extends LayoutElement, OwnProps extends object> = Omit<PolymorphicProps<T>, keyof OwnProps> & OwnProps;
export interface FlexOwnProps {
    direction?: React.CSSProperties["flexDirection"];
    align?: React.CSSProperties["alignItems"];
    justify?: React.CSSProperties["justifyContent"];
    wrap?: React.CSSProperties["flexWrap"];
    gap?: LayoutSpace;
    rowGap?: LayoutSpace;
    columnGap?: LayoutSpace;
    inline?: boolean;
    mobileDirection?: React.CSSProperties["flexDirection"];
    mobileAlign?: React.CSSProperties["alignItems"];
    mobileJustify?: React.CSSProperties["justifyContent"];
    mobileWrap?: React.CSSProperties["flexWrap"];
    mobileGap?: LayoutSpace;
    mobileRowGap?: LayoutSpace;
    mobileColumnGap?: LayoutSpace;
    stackOnMobile?: boolean;
    hideOnMobile?: boolean;
    showOnMobile?: boolean;
    fullWidth?: boolean;
}
export type FlexProps<T extends LayoutElement = "div"> = PolymorphicProps<T> & FlexOwnProps;
export declare const Flex: <T extends LayoutElement = "div">({ as, direction, align, justify, wrap, gap, rowGap, columnGap, inline, mobileDirection, mobileAlign, mobileJustify, mobileWrap, mobileGap, mobileRowGap, mobileColumnGap, stackOnMobile, hideOnMobile, showOnMobile, fullWidth, className, style, ...rest }: FlexProps<T>) => React.ReactElement;
export type RowProps<T extends LayoutElement = "div"> = Omit<FlexProps<T>, "direction">;
export declare const Row: <T extends LayoutElement = "div">(props: RowProps<T>) => React.ReactElement;
export type ColumnProps<T extends LayoutElement = "div"> = Omit<FlexProps<T>, "direction">;
export declare const Column: <T extends LayoutElement = "div">(props: ColumnProps<T>) => React.ReactElement;
export interface GridOwnProps {
    columns?: GridColumns;
    minItemWidth?: React.CSSProperties["minWidth"];
    align?: React.CSSProperties["alignItems"];
    justify?: React.CSSProperties["justifyContent"];
    gap?: LayoutSpace;
    rowGap?: LayoutSpace;
    columnGap?: LayoutSpace;
    inline?: boolean;
    mobileColumns?: GridColumns;
    mobileMinItemWidth?: React.CSSProperties["minWidth"];
    mobileAlign?: React.CSSProperties["alignItems"];
    mobileJustify?: React.CSSProperties["justifyContent"];
    mobileGap?: LayoutSpace;
    mobileRowGap?: LayoutSpace;
    mobileColumnGap?: LayoutSpace;
    hideOnMobile?: boolean;
    showOnMobile?: boolean;
    fullWidth?: boolean;
}
export type GridProps<T extends LayoutElement = "div"> = PolymorphicProps<T> & GridOwnProps;
export declare const Grid: <T extends LayoutElement = "div">({ as, columns, minItemWidth, align, justify, gap, rowGap, columnGap, inline, mobileColumns, mobileMinItemWidth, mobileAlign, mobileJustify, mobileGap, mobileRowGap, mobileColumnGap, hideOnMobile, showOnMobile, fullWidth, className, style, ...rest }: GridProps<T>) => React.ReactElement;
export type AutoGridProps<T extends LayoutElement = "div"> = Omit<GridProps<T>, "columns">;
export declare const AutoGrid: <T extends LayoutElement = "div">({ minItemWidth, mobileColumns, ...rest }: AutoGridProps<T>) => React.ReactElement;
export interface ResponsiveColumnsOwnProps extends Omit<GridOwnProps, "columns"> {
    columns?: GridColumns;
    mobileColumns?: GridColumns;
}
export type ResponsiveColumnsProps<T extends LayoutElement = "div"> = PolymorphicProps<T> & ResponsiveColumnsOwnProps;
export declare const ResponsiveColumns: <T extends LayoutElement = "div">({ columns, mobileColumns, ...rest }: ResponsiveColumnsProps<T>) => React.ReactElement;
export type DashboardGridProps<T extends LayoutElement = "div"> = AutoGridProps<T>;
export declare const DashboardGrid: <T extends LayoutElement = "div">({ className, minItemWidth, gap, ...rest }: DashboardGridProps<T>) => React.ReactElement;
export type StackProps<T extends LayoutElement = "div"> = Omit<FlexProps<T>, "direction" | "mobileDirection">;
export declare const Stack: <T extends LayoutElement = "div">({ className, style, ...rest }: StackProps<T>) => React.ReactElement;
export type ClusterProps<T extends LayoutElement = "div"> = Omit<FlexProps<T>, "wrap" | "mobileWrap">;
export declare const Cluster: <T extends LayoutElement = "div">(props: ClusterProps<T>) => React.ReactElement;
export type InlineProps<T extends LayoutElement = "div"> = Omit<FlexProps<T>, "direction" | "inline">;
export declare const Inline: <T extends LayoutElement = "div">(props: InlineProps<T>) => React.ReactElement;
export interface ContainerOwnProps {
    width?: "content" | "prose" | "full" | string | number;
    maxWidth?: "content" | "prose" | "full" | string | number;
    padding?: LayoutSpace;
    mobilePadding?: LayoutSpace;
    center?: boolean;
    fullWidth?: boolean;
    hideOnMobile?: boolean;
    showOnMobile?: boolean;
}
export type ContainerProps<T extends LayoutElement = "div"> = PolymorphicProps<T> & ContainerOwnProps;
export declare const Container: <T extends LayoutElement = "div">(props: ContainerProps<T> & {
    ref?: React.Ref<Element>;
}) => React.ReactElement | null;
export type LayoutWidth = "content" | "prose" | "full" | string | number;
export type PanelTone = "default" | "accent" | "danger" | "muted";
export type LayoutDensity = "default" | "compact";
export interface PanelOwnProps extends ResponsiveVisibilityProps {
    title?: React.ReactNode;
    meta?: React.ReactNode;
    actions?: React.ReactNode;
    footer?: React.ReactNode;
    tone?: PanelTone;
    density?: LayoutDensity;
    maxWidth?: LayoutWidth;
}
export type PanelProps<T extends LayoutElement = "section"> = LayoutPolymorphicProps<T, PanelOwnProps>;
export declare const Panel: <T extends LayoutElement = "section">({ as, title, meta, actions, footer, tone, density, maxWidth, fullWidth, hideOnMobile, showOnMobile, className, style, children, ...rest }: PanelProps<T>) => React.ReactElement;
export interface SectionOwnProps {
    title?: React.ReactNode;
    eyebrow?: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
    gap?: LayoutSpace;
    paddingBlock?: LayoutSpace;
    width?: LayoutWidth;
}
export type SectionProps<T extends LayoutElement = "section"> = LayoutPolymorphicProps<T, SectionOwnProps>;
export declare const Section: <T extends LayoutElement = "section">({ as, title, eyebrow, description, actions, gap, paddingBlock, width, className, style, children, ...rest }: SectionProps<T>) => React.ReactElement;
export interface ContentFrameOwnProps {
    width?: LayoutWidth;
    padding?: LayoutSpace;
    framed?: boolean;
}
export type ContentFrameProps<T extends LayoutElement = "article"> = PolymorphicProps<T> & ContentFrameOwnProps;
export declare const ContentFrame: <T extends LayoutElement = "article">({ as, width, padding, framed, className, style, ...rest }: ContentFrameProps<T>) => React.ReactElement;
export interface ContentWidthOwnProps {
    width?: LayoutWidth;
    center?: boolean;
}
export type ContentWidthProps<T extends LayoutElement = "div"> = PolymorphicProps<T> & ContentWidthOwnProps;
export declare const ContentWidth: <T extends LayoutElement = "div">({ as, width, center, className, style, ...rest }: ContentWidthProps<T>) => React.ReactElement;
export interface ContentShellOwnProps {
    eyebrow?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
    width?: LayoutWidth;
    gap?: LayoutSpace;
    paddingBlock?: LayoutSpace;
}
export type ContentShellProps<T extends LayoutElement = "section"> = LayoutPolymorphicProps<T, ContentShellOwnProps>;
export declare const ContentShell: <T extends LayoutElement = "section">({ as, eyebrow, title, description, actions, width, gap, paddingBlock, className, style, children, ...rest }: ContentShellProps<T>) => React.ReactElement;
export interface SidebarLayoutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    left?: React.ReactNode;
    main?: React.ReactNode;
    right?: React.ReactNode;
    sidebar?: React.ReactNode;
    sidebarLabel?: string;
    sidebarWidth?: string | number;
    aside?: React.ReactNode;
    asideLabel?: string;
    asideWidth?: string | number;
    sticky?: boolean;
    collapseAt?: LayoutBreakpoint;
    gap?: LayoutSpace;
    mobileLayout?: "stack" | "main-first";
    hideSidebarOnMobile?: boolean;
    hideAsideOnMobile?: boolean;
    children?: React.ReactNode;
    mainClassName?: string;
    sidebarClassName?: string;
    asideClassName?: string;
}
export declare const SidebarLayout: React.ForwardRefExoticComponent<SidebarLayoutProps & React.RefAttributes<HTMLDivElement>>;
export interface PageShellProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    eyebrow?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
    width?: LayoutWidth;
    gap?: LayoutSpace;
    children: React.ReactNode;
}
export declare const PageShell: React.ForwardRefExoticComponent<PageShellProps & React.RefAttributes<HTMLDivElement>>;
export interface AppShellProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    header?: React.ReactNode;
    sidebar?: React.ReactNode;
    aside?: React.ReactNode;
    footer?: React.ReactNode;
    children: React.ReactNode;
    contentId?: string;
    skipLinkLabel?: string;
    sidebarLabel?: string;
    asideLabel?: string;
    mainClassName?: string;
}
export declare const AppShell: React.ForwardRefExoticComponent<AppShellProps & React.RefAttributes<HTMLDivElement>>;
export interface SplitPaneProps extends React.HTMLAttributes<HTMLDivElement> {
    start: React.ReactNode;
    end: React.ReactNode;
    startWidth?: string | number;
    endWidth?: string | number;
    gap?: LayoutSpace;
    collapseAt?: "sm" | "md" | "lg";
}
export declare const SplitPane: React.ForwardRefExoticComponent<SplitPaneProps & React.RefAttributes<HTMLDivElement>>;
export declare const SplitLayout: React.ForwardRefExoticComponent<SplitPaneProps & React.RefAttributes<HTMLDivElement>>;
export type SplitLayoutProps = SplitPaneProps;
export type { LayoutBreakpoint, LayoutElement, LayoutGap, LayoutSpace };
