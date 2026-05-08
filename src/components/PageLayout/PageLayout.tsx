import React from "react";
import styles from "./PageLayout.module.scss";
import { cx } from "../../utils/classNames";
import { Grid } from "../Layout";

export type PageLayoutVariant = "post" | "project";

export type PageLayoutSidebarPosition = "left" | "right";

export interface PageLayoutProps extends React.HTMLAttributes<HTMLElement> {
  variant?: PageLayoutVariant;
  header?: React.ReactNode;
  hero?: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarPosition?: "left" | "right";
  footer?: React.ReactNode;
  children: React.ReactNode;
  sidebarLabel?: string;
  stickySidebar?: boolean;
}

export const PageLayout = React.forwardRef<HTMLElement, PageLayoutProps>(
  (
    {
      variant = "post",
      header,
      hero,
      sidebar,
      sidebarPosition = "left",
      footer,
      children,
      sidebarLabel,
      stickySidebar = true,
      className,
      ...rest
    },
    ref,
  ) => {
    const resolvedSidebarLabel =
      sidebarLabel ??
      (variant === "project" ? "project sidebar" : "post sidebar");

    return (
      <article
        ref={ref}
        className={cx(styles.root, styles[variant], className)}
        {...rest}
      >
        {header ? <div className={styles.header}>{header}</div> : null}
        {hero ? <div className={styles.hero}>{hero}</div> : null}

        <Grid
          className={cx(
            styles.body,
            variant === "project" ? styles.projectBody : styles.postBody,
            !!sidebar && styles.withSidebar,
            sidebar && sidebarPosition === "left" && styles.sidebarLeft,
          )}
          gap={variant === "project" ? "2rem" : "1.5rem"}
          mobileColumns="1fr"
          mobileGap="md"
        >
          <div className={styles.main}>{children}</div>
          {sidebar && sidebarPosition === "left" ? (
            <aside
              className={cx(
                styles.sidebar,
                stickySidebar && styles.stickySidebar,
              )}
              aria-label={resolvedSidebarLabel}
            >
              {sidebar}
            </aside>
          ) : null}

          <div className={styles.main}>{children}</div>

          {sidebar && sidebarPosition === "right" ? (
            <aside
              className={cx(
                styles.sidebar,
                stickySidebar && styles.stickySidebar,
              )}
              aria-label={resolvedSidebarLabel}
            >
              {sidebar}
            </aside>
          ) : null}
        </Grid>

        {footer ? <footer className={styles.footer}>{footer}</footer> : null}
      </article>
    );
  },
);

PageLayout.displayName = "PageLayout";
