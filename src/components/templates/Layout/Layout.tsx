import React from "react";
import styles from "./Layout.module.scss";
import { cx } from "../../../utils/classNames";
import type { CssVars } from "../../../utils/browser";

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

const gapClass: Record<LayoutGap, string> = {
  none: styles.gapNone,
  xs: styles.gapXs,
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg,
  xl: styles.gapXl,
};

const gapVar: Record<LayoutGap, string> = {
  none: "0",
  xs: "var(--pho-space-2)",
  sm: "var(--pho-space-3)",
  md: "var(--pho-space-5)",
  lg: "var(--pho-space-6)",
  xl: "var(--pho-space-7)",
};

const toCssLength = (value: string | number) =>
  typeof value === "number" ? `${value}px` : value;

const toResponsiveMin = (value: string | number) =>
  `min(100%, ${toCssLength(value)})`;

const isLayoutGap = (value: unknown): value is LayoutGap =>
  typeof value === "string" && value in gapClass;

const applySpaceVar = (
  vars: CssVars,
  name: `--${string}`,
  value: LayoutSpace | undefined,
) => {
  if (value === undefined) return;
  vars[name] = isLayoutGap(value) ? gapVar[value] : toCssLength(value);
};

type PolymorphicProps<T extends LayoutElement> = Omit<
  React.ComponentPropsWithoutRef<T>,
  "as"
> & {
  as?: T;
};

type LayoutPolymorphicProps<
  T extends LayoutElement,
  OwnProps extends object,
> = Omit<PolymorphicProps<T>, keyof OwnProps> & OwnProps;

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

export type FlexProps<T extends LayoutElement = "div"> = PolymorphicProps<T> &
  FlexOwnProps;

export const Flex = <T extends LayoutElement = "div">({
  as,
  direction,
  align,
  justify,
  wrap,
  gap = "md",
  rowGap,
  columnGap,
  inline,
  mobileDirection,
  mobileAlign,
  mobileJustify,
  mobileWrap,
  mobileGap,
  mobileRowGap,
  mobileColumnGap,
  stackOnMobile,
  hideOnMobile,
  showOnMobile,
  fullWidth,
  className,
  style,
  ...rest
}: FlexProps<T>): React.ReactElement => {
  const Tag = (as ?? "div") as LayoutElement;
  const isTokenGap = isLayoutGap(gap);
  const vars: CssVars = {};
  if (direction) vars["--pho-flex-direction"] = direction;
  if (align) vars["--pho-align"] = align;
  if (justify) vars["--pho-justify"] = justify;
  if (wrap) vars["--pho-wrap"] = wrap;
  if (!isTokenGap) applySpaceVar(vars, "--pho-gap", gap);
  applySpaceVar(vars, "--pho-row-gap", rowGap);
  applySpaceVar(vars, "--pho-column-gap", columnGap);
  if (mobileDirection || stackOnMobile) {
    vars["--pho-mobile-flex-direction"] = mobileDirection ?? "column";
  }
  if (mobileAlign || stackOnMobile) {
    vars["--pho-mobile-align"] = mobileAlign ?? "stretch";
  }
  if (mobileJustify) vars["--pho-mobile-justify"] = mobileJustify;
  if (mobileWrap) vars["--pho-mobile-wrap"] = mobileWrap;
  applySpaceVar(vars, "--pho-mobile-gap", mobileGap);
  applySpaceVar(vars, "--pho-mobile-row-gap", mobileRowGap);
  applySpaceVar(vars, "--pho-mobile-column-gap", mobileColumnGap);

  return React.createElement(Tag, {
    className: cx(
      styles.flex,
      inline && styles.inline,
      isTokenGap && gapClass[gap],
      fullWidth && styles.fullWidth,
      hideOnMobile && styles.hideOnMobile,
      showOnMobile && styles.showOnMobile,
      className,
    ),
    style: { ...vars, ...style },
    ...rest,
  });
};

export type RowProps<T extends LayoutElement = "div"> = Omit<
  FlexProps<T>,
  "direction"
>;

export const Row = <T extends LayoutElement = "div">(
  props: RowProps<T>,
): React.ReactElement => <Flex direction="row" {...props} />;

export type ColumnProps<T extends LayoutElement = "div"> = Omit<
  FlexProps<T>,
  "direction"
>;

export const Column = <T extends LayoutElement = "div">(
  props: ColumnProps<T>,
): React.ReactElement => <Flex direction="column" {...props} />;

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

export type GridProps<T extends LayoutElement = "div"> = PolymorphicProps<T> &
  GridOwnProps;

export const Grid = <T extends LayoutElement = "div">({
  as,
  columns,
  minItemWidth,
  align,
  justify,
  gap = "md",
  rowGap,
  columnGap,
  inline,
  mobileColumns,
  mobileMinItemWidth,
  mobileAlign,
  mobileJustify,
  mobileGap,
  mobileRowGap,
  mobileColumnGap,
  hideOnMobile,
  showOnMobile,
  fullWidth,
  className,
  style,
  ...rest
}: GridProps<T>): React.ReactElement => {
  const Tag = (as ?? "div") as LayoutElement;
  const isTokenGap = isLayoutGap(gap);
  const vars: CssVars = {};
  const resolvedColumns =
    typeof columns === "number"
      ? `repeat(${columns}, minmax(0, 1fr))`
      : columns;
  const resolvedMobileColumns =
    typeof mobileColumns === "number"
      ? `repeat(${mobileColumns}, minmax(0, 1fr))`
      : mobileColumns;
  if (resolvedColumns) vars["--pho-grid-columns"] = resolvedColumns;
  if (minItemWidth) vars["--pho-grid-min"] = toResponsiveMin(minItemWidth);
  if (align) vars["--pho-align"] = align;
  if (justify) vars["--pho-justify"] = justify;
  if (!isTokenGap) applySpaceVar(vars, "--pho-gap", gap);
  applySpaceVar(vars, "--pho-row-gap", rowGap);
  applySpaceVar(vars, "--pho-column-gap", columnGap);
  if (resolvedMobileColumns) vars["--pho-mobile-grid-columns"] = resolvedMobileColumns;
  if (mobileMinItemWidth) {
    vars["--pho-mobile-grid-min"] = toResponsiveMin(mobileMinItemWidth);
  }
  if (mobileAlign) vars["--pho-mobile-align"] = mobileAlign;
  if (mobileJustify) vars["--pho-mobile-justify"] = mobileJustify;
  applySpaceVar(vars, "--pho-mobile-gap", mobileGap);
  applySpaceVar(vars, "--pho-mobile-row-gap", mobileRowGap);
  applySpaceVar(vars, "--pho-mobile-column-gap", mobileColumnGap);

  return React.createElement(Tag, {
    className: cx(
      styles.grid,
      inline && styles.inline,
      isTokenGap && gapClass[gap],
      fullWidth && styles.fullWidth,
      hideOnMobile && styles.hideOnMobile,
      showOnMobile && styles.showOnMobile,
      className,
    ),
    style: { ...vars, ...style },
    ...rest,
  });
};

export type AutoGridProps<T extends LayoutElement = "div"> = Omit<
  GridProps<T>,
  "columns"
>;

export const AutoGrid = <T extends LayoutElement = "div">({
  minItemWidth = "14rem",
  mobileColumns = "1fr",
  ...rest
}: AutoGridProps<T>): React.ReactElement => (
  <Grid
    minItemWidth={minItemWidth}
    mobileColumns={mobileColumns}
    {...rest}
  />
);

export interface ResponsiveColumnsOwnProps extends Omit<GridOwnProps, "columns"> {
  columns?: GridColumns;
  mobileColumns?: GridColumns;
}

export type ResponsiveColumnsProps<T extends LayoutElement = "div"> =
  PolymorphicProps<T> & ResponsiveColumnsOwnProps;

export const ResponsiveColumns = <T extends LayoutElement = "div">({
  columns = 2,
  mobileColumns = "1fr",
  ...rest
}: ResponsiveColumnsProps<T>): React.ReactElement => {
  const resolvedColumns =
    typeof columns === "number"
      ? `repeat(${columns}, minmax(0, 1fr))`
      : columns;

  return (
    <Grid
      columns={resolvedColumns}
      mobileColumns={mobileColumns}
      {...rest}
    />
  );
};

export type DashboardGridProps<T extends LayoutElement = "div"> =
  AutoGridProps<T>;

export const DashboardGrid = <T extends LayoutElement = "div">({
  className,
  minItemWidth = "14rem",
  gap = "md",
  ...rest
}: DashboardGridProps<T>): React.ReactElement => (
  <AutoGrid
    className={cx(styles.dashboardGrid, className)}
    minItemWidth={minItemWidth}
    gap={gap}
    {...rest}
  />
);

export type StackProps<T extends LayoutElement = "div"> = Omit<
  FlexProps<T>,
  "direction" | "mobileDirection"
>;

export const Stack = <T extends LayoutElement = "div">({
  className,
  style,
  ...rest
}: StackProps<T>): React.ReactElement => {
  return (
    <Flex
      direction="column"
      className={cx(styles.stack, className)}
      style={style}
      {...rest}
    />
  );
};

export type ClusterProps<T extends LayoutElement = "div"> = Omit<
  FlexProps<T>,
  "wrap" | "mobileWrap"
>;

export const Cluster = <T extends LayoutElement = "div">(
  props: ClusterProps<T>,
): React.ReactElement => <Flex wrap="wrap" align="center" {...props} />;

export type InlineProps<T extends LayoutElement = "div"> = Omit<
  FlexProps<T>,
  "direction" | "inline"
>;

export const Inline = <T extends LayoutElement = "div">(
  props: InlineProps<T>,
): React.ReactElement => <Flex inline direction="row" align="center" {...props} />;

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

export type ContainerProps<T extends LayoutElement = "div"> =
  PolymorphicProps<T> & ContainerOwnProps;

const ContainerBase = <T extends LayoutElement = "div">(
  {
    as,
    width = "content",
    maxWidth,
    padding = "md",
    mobilePadding = "sm",
    center = true,
    fullWidth,
    hideOnMobile,
    showOnMobile,
    className,
    style,
    ...rest
  }: ContainerProps<T>,
  ref: React.ForwardedRef<Element>,
) => {
  const Tag = (as ?? "div") as LayoutElement;
  const vars: CssVars = {};
  const resolvedWidth = fullWidth ? "full" : (maxWidth ?? width);
  vars["--pho-container-width"] =
    resolvedWidth === "content"
      ? "var(--pho-size-content)"
      : resolvedWidth === "prose"
        ? "var(--pho-size-prose)"
        : resolvedWidth === "full"
          ? "none"
          : toCssLength(resolvedWidth);
  applySpaceVar(vars, "--pho-container-padding", padding);
  applySpaceVar(vars, "--pho-mobile-container-padding", mobilePadding);

  return React.createElement(Tag, {
    className: cx(
      styles.container,
      center && styles.center,
      hideOnMobile && styles.hideOnMobile,
      showOnMobile && styles.showOnMobile,
      className,
    ),
    ref,
    style: { ...vars, ...style },
    ...rest,
  });
};

export const Container = React.forwardRef(ContainerBase) as <
  T extends LayoutElement = "div",
>(
  props: ContainerProps<T> & { ref?: React.Ref<Element> },
) => React.ReactElement | null;

export type LayoutWidth = "content" | "prose" | "full" | string | number;
export type PanelTone = "default" | "accent" | "danger" | "muted";
export type LayoutDensity = "default" | "compact";

const applyWidthVar = (
  vars: CssVars,
  name: `--${string}`,
  width: LayoutWidth | undefined,
) => {
  if (width === undefined) return;
  vars[name] =
    width === "content"
      ? "var(--pho-size-content)"
      : width === "prose"
        ? "var(--pho-size-prose)"
        : width === "full"
          ? "none"
          : toCssLength(width);
};

export interface PanelOwnProps extends ResponsiveVisibilityProps {
  title?: React.ReactNode;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  tone?: PanelTone;
  density?: LayoutDensity;
  maxWidth?: LayoutWidth;
}

export type PanelProps<T extends LayoutElement = "section"> =
  LayoutPolymorphicProps<T, PanelOwnProps>;

export const Panel = <T extends LayoutElement = "section">({
  as,
  title,
  meta,
  actions,
  footer,
  tone = "default",
  density = "default",
  maxWidth,
  fullWidth,
  hideOnMobile,
  showOnMobile,
  className,
  style,
  children,
  ...rest
}: PanelProps<T>): React.ReactElement => {
  const Tag = (as ?? "section") as LayoutElement;
  const vars: CssVars = {};
  applyWidthVar(vars, "--pho-panel-max-width", fullWidth ? "full" : maxWidth);
  const hasHeader = title !== undefined || meta !== undefined || actions !== undefined;

  return React.createElement(
    Tag,
    {
      className: cx(
        styles.panel,
        tone === "accent" && styles.panelAccent,
        tone === "danger" && styles.panelDanger,
        tone === "muted" && styles.panelMuted,
        density === "compact" && styles.compact,
        fullWidth && styles.fullWidth,
        hideOnMobile && styles.hideOnMobile,
        showOnMobile && styles.showOnMobile,
        className,
      ),
      style: { ...vars, ...style },
      ...rest,
    },
    <>
      {hasHeader ? (
        <header className={styles.panelHeader}>
          <div className={styles.panelTitleBlock}>
            {title ? <h2 className={styles.panelTitle}>{title}</h2> : null}
            {meta ? <div className={styles.panelMeta}>{meta}</div> : null}
          </div>
          {actions ? <div className={styles.panelActions}>{actions}</div> : null}
        </header>
      ) : null}
      <div className={styles.panelBody}>{children}</div>
      {footer ? <footer className={styles.panelFooter}>{footer}</footer> : null}
    </>,
  );
};

export interface SectionOwnProps {
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  gap?: LayoutSpace;
  paddingBlock?: LayoutSpace;
  width?: LayoutWidth;
}

export type SectionProps<T extends LayoutElement = "section"> =
  LayoutPolymorphicProps<T, SectionOwnProps>;

export const Section = <T extends LayoutElement = "section">({
  as,
  title,
  eyebrow,
  description,
  actions,
  gap = "md",
  paddingBlock = "lg",
  width = "content",
  className,
  style,
  children,
  ...rest
}: SectionProps<T>): React.ReactElement => {
  const Tag = (as ?? "section") as LayoutElement;
  const vars: CssVars = {};
  applySpaceVar(vars, "--pho-section-gap", gap);
  applySpaceVar(vars, "--pho-section-padding-block", paddingBlock);
  applyWidthVar(vars, "--pho-section-width", width);
  const hasHeader =
    title !== undefined ||
    eyebrow !== undefined ||
    description !== undefined ||
    actions !== undefined;

  return React.createElement(
    Tag,
    {
      className: cx(styles.section, className),
      style: { ...vars, ...style },
      ...rest,
    },
    <>
      {hasHeader ? (
        <header className={styles.sectionHeader}>
          <div className={styles.sectionTitleBlock}>
            {eyebrow ? <p className={styles.sectionEyebrow}>{eyebrow}</p> : null}
            {title ? <h2 className={styles.sectionTitle}>{title}</h2> : null}
            {description ? (
              <p className={styles.sectionDescription}>{description}</p>
            ) : null}
          </div>
          {actions ? <div className={styles.sectionActions}>{actions}</div> : null}
        </header>
      ) : null}
      <div className={styles.sectionBody}>{children}</div>
    </>,
  );
};

export interface ContentFrameOwnProps {
  width?: LayoutWidth;
  padding?: LayoutSpace;
  framed?: boolean;
}

export type ContentFrameProps<T extends LayoutElement = "article"> =
  PolymorphicProps<T> & ContentFrameOwnProps;

export const ContentFrame = <T extends LayoutElement = "article">({
  as,
  width = "prose",
  padding = "none",
  framed = false,
  className,
  style,
  ...rest
}: ContentFrameProps<T>): React.ReactElement => {
  const Tag = (as ?? "article") as LayoutElement;
  const vars: CssVars = {};
  applyWidthVar(vars, "--pho-content-frame-width", width);
  applySpaceVar(vars, "--pho-content-frame-padding", padding);

  return React.createElement(Tag, {
    className: cx(styles.contentFrame, framed && styles.framed, className),
    style: { ...vars, ...style },
    ...rest,
  });
};

export interface ContentWidthOwnProps {
  width?: LayoutWidth;
  center?: boolean;
}

export type ContentWidthProps<T extends LayoutElement = "div"> =
  PolymorphicProps<T> & ContentWidthOwnProps;

export const ContentWidth = <T extends LayoutElement = "div">({
  as,
  width = "prose",
  center = true,
  className,
  style,
  ...rest
}: ContentWidthProps<T>): React.ReactElement => {
  const Tag = (as ?? "div") as LayoutElement;
  const vars: CssVars = {};
  applyWidthVar(vars, "--pho-content-width", width);

  return React.createElement(Tag, {
    className: cx(styles.contentWidth, center && styles.center, className),
    style: { ...vars, ...style },
    ...rest,
  });
};

export interface ContentShellOwnProps {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  width?: LayoutWidth;
  gap?: LayoutSpace;
  paddingBlock?: LayoutSpace;
}

export type ContentShellProps<T extends LayoutElement = "section"> =
  LayoutPolymorphicProps<T, ContentShellOwnProps>;

export const ContentShell = <T extends LayoutElement = "section">({
  as,
  eyebrow,
  title,
  description,
  actions,
  width = "prose",
  gap = "md",
  paddingBlock = "none",
  className,
  style,
  children,
  ...rest
}: ContentShellProps<T>): React.ReactElement => {
  const Tag = (as ?? "section") as LayoutElement;
  const vars: CssVars = {};
  applyWidthVar(vars, "--pho-content-shell-width", width);
  applySpaceVar(vars, "--pho-content-shell-gap", gap);
  applySpaceVar(vars, "--pho-content-shell-padding-block", paddingBlock);
  const hasHeader =
    eyebrow !== undefined ||
    title !== undefined ||
    description !== undefined ||
    actions !== undefined;

  return React.createElement(
    Tag,
    {
      className: cx(styles.contentShell, className),
      style: { ...vars, ...style },
      ...rest,
    },
    <>
      {hasHeader ? (
        <header className={styles.contentShellHeader}>
          <div className={styles.contentShellTitleBlock}>
            {eyebrow ? <p className={styles.pageEyebrow}>{eyebrow}</p> : null}
            {title ? <h1 className={styles.contentShellTitle}>{title}</h1> : null}
            {description ? (
              <p className={styles.pageDescription}>{description}</p>
            ) : null}
          </div>
          {actions ? <div className={styles.pageActions}>{actions}</div> : null}
        </header>
      ) : null}
      <div className={styles.contentShellBody}>{children}</div>
    </>,
  );
};

export interface SidebarLayoutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
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

export const SidebarLayout = React.forwardRef<HTMLDivElement, SidebarLayoutProps>(
  (
    {
      left,
      main,
      right,
      sidebar,
      sidebarLabel = "sidebar",
      sidebarWidth,
      aside,
      asideLabel = "context",
      asideWidth,
      sticky = true,
      collapseAt = "md",
      gap = "md",
      mobileLayout = "stack",
      hideSidebarOnMobile,
      hideAsideOnMobile,
      children,
      className,
      mainClassName,
      sidebarClassName,
      asideClassName,
      style,
      ...rest
    },
    ref,
  ) => {
    const vars: CssVars = {};
    const resolvedSidebar = left ?? sidebar;
    const resolvedMain = main ?? children;
    const resolvedAside = right ?? aside;
    const hasSidebar =
      resolvedSidebar !== undefined &&
      resolvedSidebar !== null &&
      resolvedSidebar !== false;
    const hasAside =
      resolvedAside !== undefined &&
      resolvedAside !== null &&
      resolvedAside !== false;
    applySpaceVar(vars, "--pho-sidebar-layout-gap", gap);
    if (sidebarWidth !== undefined) {
      vars["--pho-sidebar-layout-sidebar-width"] = toCssLength(sidebarWidth);
    }
    if (asideWidth !== undefined) {
      vars["--pho-sidebar-layout-aside-width"] = toCssLength(asideWidth);
    }

    return (
      <div
        ref={ref}
        className={cx(
          styles.sidebarLayout,
          hasSidebar && styles.hasSidebar,
          hasAside && styles.hasAside,
          sticky && styles.sticky,
          collapseAt === "sm" && styles.collapseSm,
          collapseAt === "lg" && styles.collapseLg,
          mobileLayout === "main-first" && styles.mainFirstMobile,
          className,
        )}
        style={{ ...vars, ...style }}
        {...rest}
      >
        {hasSidebar ? (
          <aside
            className={cx(
              styles.sidebar,
              hideSidebarOnMobile && styles.hideOnMobile,
              sidebarClassName,
            )}
            aria-label={sidebarLabel}
          >
            {resolvedSidebar}
          </aside>
        ) : null}
        <main className={cx(styles.sidebarMain, mainClassName)}>{resolvedMain}</main>
        {hasAside ? (
          <aside
            className={cx(
              styles.aside,
              hideAsideOnMobile && styles.hideOnMobile,
              asideClassName,
            )}
            aria-label={asideLabel}
          >
            {resolvedAside}
          </aside>
        ) : null}
      </div>
    );
  },
);

SidebarLayout.displayName = "SidebarLayout";

export interface PageShellProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  width?: LayoutWidth;
  gap?: LayoutSpace;
  children: React.ReactNode;
}

export const PageShell = React.forwardRef<HTMLDivElement, PageShellProps>(
  (
    {
      eyebrow,
      title,
      description,
      actions,
      width = "content",
      gap = "lg",
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const vars: CssVars = {};
    applyWidthVar(vars, "--pho-page-shell-width", width);
    applySpaceVar(vars, "--pho-page-shell-gap", gap);
    const hasHeader =
      eyebrow !== undefined ||
      title !== undefined ||
      description !== undefined ||
      actions !== undefined;

    return (
      <div
        ref={ref}
        className={cx(styles.pageShell, className)}
        style={{ ...vars, ...style }}
        {...rest}
      >
        {hasHeader ? (
          <header className={styles.pageHeader}>
            <div className={styles.pageTitleBlock}>
              {eyebrow ? <p className={styles.pageEyebrow}>{eyebrow}</p> : null}
              {title ? <h1 className={styles.pageTitle}>{title}</h1> : null}
              {description ? (
                <p className={styles.pageDescription}>{description}</p>
              ) : null}
            </div>
            {actions ? <div className={styles.pageActions}>{actions}</div> : null}
          </header>
        ) : null}
        <div className={styles.pageBody}>{children}</div>
      </div>
    );
  },
);

PageShell.displayName = "PageShell";

export interface AppShellProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
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

export const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(
  (
    {
      header,
      sidebar,
      aside,
      footer,
      children,
      contentId = "main-content",
      skipLinkLabel = "Skip to content",
      sidebarLabel = "sidebar",
      asideLabel = "context",
      className,
      mainClassName,
      ...rest
    },
    ref,
  ) => (
    <div ref={ref} className={cx(styles.appShell, className)} {...rest}>
      <a className={styles.skipLink} href={`#${contentId}`}>
        {skipLinkLabel}
      </a>
      {header ? <header className={styles.appHeader}>{header}</header> : null}
      <div className={styles.appBody}>
        {sidebar ? (
          <aside className={styles.appSidebar} aria-label={sidebarLabel}>
            {sidebar}
          </aside>
        ) : null}
        <main id={contentId} className={cx(styles.appMain, mainClassName)} tabIndex={-1}>
          {children}
        </main>
        {aside ? (
          <aside className={styles.appAside} aria-label={asideLabel}>
            {aside}
          </aside>
        ) : null}
      </div>
      {footer ? <footer className={styles.appFooter}>{footer}</footer> : null}
    </div>
  ),
);

AppShell.displayName = "AppShell";

export interface SplitPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  start: React.ReactNode;
  end: React.ReactNode;
  startWidth?: string | number;
  endWidth?: string | number;
  gap?: LayoutSpace;
  collapseAt?: "sm" | "md" | "lg";
}

export const SplitPane = React.forwardRef<HTMLDivElement, SplitPaneProps>(
  (
    {
      start,
      end,
      startWidth,
      endWidth,
      gap = "md",
      collapseAt = "md",
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const vars: CssVars = {};
    applySpaceVar(vars, "--pho-split-pane-gap", gap);
    if (startWidth !== undefined) vars["--pho-split-pane-start"] = toCssLength(startWidth);
    if (endWidth !== undefined) vars["--pho-split-pane-end"] = toCssLength(endWidth);

    return (
      <div
        ref={ref}
        className={cx(
          styles.splitPane,
          collapseAt === "sm" && styles.collapseSm,
          collapseAt === "lg" && styles.collapseLg,
          className,
        )}
        style={{ ...vars, ...style }}
        {...rest}
      >
        <div className={styles.splitStart}>{start}</div>
        <div className={styles.splitEnd}>{end}</div>
      </div>
    );
  },
);

SplitPane.displayName = "SplitPane";

export const SplitLayout = SplitPane;

export type SplitLayoutProps = SplitPaneProps;

export type { LayoutBreakpoint, LayoutElement, LayoutGap, LayoutSpace };
