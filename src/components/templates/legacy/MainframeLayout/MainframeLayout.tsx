import React from "react";
import styles from "./MainframeLayout.module.scss";
import { cx } from "../../../../utils/classNames";
import { NerdTree } from "../../../organisms/NerdTree";
import type { NerdTreeProps } from "../../../organisms/NerdTree";
import type { SlotClassNames } from "../../../../types/slots";

export type MainframeVariant = "post" | "wiki" | "course" | "project" | "admin";
export type MainframeLayoutSlot =
  | "root"
  | "header"
  | "grid"
  | "leftPanel"
  | "main"
  | "rightPanel"
  | "rightPanelHeader"
  | "rightPanelTitle"
  | "rightPanelMeta"
  | "rightPanelBody"
  | "footer";

export interface MainframeLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
  gridClassName?: string;
  slotClassNames?: SlotClassNames<MainframeLayoutSlot>;
  stickyPanels?: boolean;
}

/**
 * @deprecated Prefer `PageShell` plus `SidebarLayout`, `ContentFrame`, and
 * `Panel` for new layouts. `MainframeLayout` remains available as a
 * compatibility/template wrapper for older blog/wiki/course/admin examples.
 */
export const MainframeLayout = React.forwardRef<HTMLDivElement, MainframeLayoutProps>(
  (
    {
      variant = "post",
      leftPanel,
      rightPanel,
      children,
      header,
      footer,
      leftPanelLabel = "navigation",
      rightPanelLabel = "context",
      mainAs,
      stickyPanels = true,
      className,
      mainClassName,
      leftPanelClassName,
      rightPanelClassName,
      gridClassName,
      slotClassNames,
      ...rest
    },
    ref,
  ) => {
    const hasLeftPanel = leftPanel !== null && leftPanel !== undefined && leftPanel !== false;
    const hasRightPanel = rightPanel !== null && rightPanel !== undefined && rightPanel !== false;

    return (
      <div
        ref={ref}
        className={cx(
          styles.root,
          styles[`variant-${variant}`],
          hasLeftPanel && styles.hasLeft,
          hasRightPanel && styles.hasRight,
          stickyPanels && styles.stickyPanels,
          slotClassNames?.root,
          className,
        )}
        data-mainframe-variant={variant}
        data-pho-component="MainframeLayout"
        data-pho-slot="root"
        data-pho-variant={variant}
        {...rest}
      >
        {header ? (
          <div className={cx(styles.header, slotClassNames?.header)} data-pho-slot="header">
            {header}
          </div>
        ) : null}

        <div className={cx(styles.grid, gridClassName, slotClassNames?.grid)} data-pho-slot="grid">
          {hasLeftPanel ? (
            <aside
              className={cx(styles.leftPanel, slotClassNames?.leftPanel, leftPanelClassName)}
              aria-label={leftPanelLabel}
              data-pho-slot="leftPanel"
            >
              {leftPanel}
            </aside>
          ) : null}

          <MainContent as={mainAs} className={cx(slotClassNames?.main, mainClassName)}>{children}</MainContent>

          {hasRightPanel ? (
            <ContextPanel
              className={cx(slotClassNames?.rightPanel, rightPanelClassName)}
              aria-label={rightPanelLabel}
              slotClassNames={slotClassNames}
            >
              {rightPanel}
            </ContextPanel>
          ) : null}
        </div>

        {footer ? (
          <footer className={cx(styles.footer, slotClassNames?.footer)} data-pho-slot="footer">
            {footer}
          </footer>
        ) : null}
      </div>
    );
  },
);

MainframeLayout.displayName = "MainframeLayout";

export interface MainContentProps extends React.HTMLAttributes<HTMLElement> {
  as?: "main" | "section" | "article" | "div";
}

export const MainContent = React.forwardRef<HTMLElement, MainContentProps>(
  ({ as: Tag = "main", className, children, ...rest }, ref) => (
    <Tag
      ref={ref as React.ForwardedRef<never>}
      className={cx(styles.main, className)}
      data-pho-slot="main"
      {...rest}
    >
      {children}
    </Tag>
  ),
);

MainContent.displayName = "MainContent";

export interface ContextPanelProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  meta?: React.ReactNode;
  as?: "aside" | "section" | "div";
  slotClassNames?: SlotClassNames<MainframeLayoutSlot>;
}

/**
 * @deprecated Prefer `Panel` for reusable framed right-rail content.
 */
export const ContextPanel = React.forwardRef<HTMLElement, ContextPanelProps>(
  ({ as: Tag = "aside", title, meta, className, children, slotClassNames, ...rest }, ref) => (
    <Tag
      ref={ref as React.ForwardedRef<never>}
      className={cx(styles.contextPanel, className)}
      data-pho-slot="rightPanel"
      {...rest}
    >
      {title || meta ? (
        <header className={cx(styles.contextHeader, slotClassNames?.rightPanelHeader)} data-pho-slot="rightPanelHeader">
          {title ? <h2 className={cx(styles.contextTitle, slotClassNames?.rightPanelTitle)} data-pho-slot="rightPanelTitle">{title}</h2> : null}
          {meta ? <div className={cx(styles.contextMeta, slotClassNames?.rightPanelMeta)} data-pho-slot="rightPanelMeta">{meta}</div> : null}
        </header>
      ) : null}
      <div className={cx(styles.contextBody, slotClassNames?.rightPanelBody)} data-pho-slot="rightPanelBody">{children}</div>
    </Tag>
  ),
);

ContextPanel.displayName = "ContextPanel";

export interface NerdTreeSidebarProps extends NerdTreeProps {
  shellClassName?: string;
}

/**
 * @deprecated Prefer composing `NerdTree` inside the `left` slot of
 * `SidebarLayout`; keep this wrapper for existing Mainframe examples.
 */
export const NerdTreeSidebar = React.forwardRef<HTMLDivElement, NerdTreeSidebarProps>(
  ({ className, shellClassName, frame = "rail", density = "default", ...rest }, ref) => (
    <div ref={ref} className={cx(styles.nerdTreeShell, shellClassName)}>
      <NerdTree
        className={cx(styles.nerdTree, className)}
        frame={frame}
        density={density}
        {...rest}
      />
    </div>
  ),
);

NerdTreeSidebar.displayName = "NerdTreeSidebar";

type VariantLayoutProps = Omit<MainframeLayoutProps, "variant">;

/**
 * @deprecated Prefer `PageShell` plus `SidebarLayout`.
 */
export const PostLayout = React.forwardRef<HTMLDivElement, VariantLayoutProps>(
  (props, ref) => <MainframeLayout ref={ref} variant="post" {...props} />,
);
PostLayout.displayName = "PostLayout";

/**
 * @deprecated Prefer `PageShell` plus `SidebarLayout`.
 */
export const WikiLayout = React.forwardRef<HTMLDivElement, VariantLayoutProps>(
  (props, ref) => <MainframeLayout ref={ref} variant="wiki" {...props} />,
);
WikiLayout.displayName = "WikiLayout";

/**
 * @deprecated Prefer a course recipe built from `PageShell`, `SidebarLayout`,
 * `ContentFrame`, and `Panel`.
 */
export const CourseLayout = React.forwardRef<HTMLDivElement, VariantLayoutProps>(
  (props, ref) => <MainframeLayout ref={ref} variant="course" {...props} />,
);
CourseLayout.displayName = "CourseLayout";

/**
 * @deprecated Prefer `AppShell`, `PageShell`, `DashboardGrid`, and `Panel`.
 */
export const AdminLayout = React.forwardRef<HTMLDivElement, VariantLayoutProps>(
  (props, ref) => <MainframeLayout ref={ref} variant="admin" {...props} />,
);
AdminLayout.displayName = "AdminLayout";
