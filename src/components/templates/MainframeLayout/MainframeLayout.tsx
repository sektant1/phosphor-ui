import React from "react";
import styles from "./MainframeLayout.module.scss";
import { cx } from "../../../utils/classNames";
import { NerdTree } from "../../organisms/NerdTree";
import type { NerdTreeProps } from "../../organisms/NerdTree";

export type MainframeVariant = "post" | "wiki" | "course" | "project" | "admin";

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
  stickyPanels?: boolean;
}

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
          className,
        )}
        data-mainframe-variant={variant}
        {...rest}
      >
        {header ? <div className={styles.header}>{header}</div> : null}

        <div className={styles.grid}>
          {hasLeftPanel ? (
            <aside
              className={cx(styles.leftPanel, leftPanelClassName)}
              aria-label={leftPanelLabel}
            >
              {leftPanel}
            </aside>
          ) : null}

          <MainContent as={mainAs} className={mainClassName}>{children}</MainContent>

          {hasRightPanel ? (
            <ContextPanel
              className={rightPanelClassName}
              aria-label={rightPanelLabel}
            >
              {rightPanel}
            </ContextPanel>
          ) : null}
        </div>

        {footer ? <footer className={styles.footer}>{footer}</footer> : null}
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
}

export const ContextPanel = React.forwardRef<HTMLElement, ContextPanelProps>(
  ({ as: Tag = "aside", title, meta, className, children, ...rest }, ref) => (
    <Tag
      ref={ref as React.ForwardedRef<never>}
      className={cx(styles.contextPanel, className)}
      {...rest}
    >
      {title || meta ? (
        <header className={styles.contextHeader}>
          {title ? <h2 className={styles.contextTitle}>{title}</h2> : null}
          {meta ? <div className={styles.contextMeta}>{meta}</div> : null}
        </header>
      ) : null}
      <div className={styles.contextBody}>{children}</div>
    </Tag>
  ),
);

ContextPanel.displayName = "ContextPanel";

export interface NerdTreeSidebarProps extends NerdTreeProps {
  shellClassName?: string;
}

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

export const PostLayout = React.forwardRef<HTMLDivElement, VariantLayoutProps>(
  (props, ref) => <MainframeLayout ref={ref} variant="post" {...props} />,
);
PostLayout.displayName = "PostLayout";

export const WikiLayout = React.forwardRef<HTMLDivElement, VariantLayoutProps>(
  (props, ref) => <MainframeLayout ref={ref} variant="wiki" {...props} />,
);
WikiLayout.displayName = "WikiLayout";

export const CourseLayout = React.forwardRef<HTMLDivElement, VariantLayoutProps>(
  (props, ref) => <MainframeLayout ref={ref} variant="course" {...props} />,
);
CourseLayout.displayName = "CourseLayout";

export const AdminLayout = React.forwardRef<HTMLDivElement, VariantLayoutProps>(
  (props, ref) => <MainframeLayout ref={ref} variant="admin" {...props} />,
);
AdminLayout.displayName = "AdminLayout";
