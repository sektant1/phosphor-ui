import React from "react";
import styles from "../PageLayout/PageLayout.module.scss";
import { cx } from "../../../utils/classNames";
import { Grid } from "../Layout";

export type PageVariant = "post" | "project";

export type PageSidebarPosition = "left" | "right";

export interface PageProps extends React.HTMLAttributes<HTMLElement> {
  variant?: PageVariant;
  header?: React.ReactNode;
  hero?: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarPosition?: PageSidebarPosition;
  footer?: React.ReactNode;
  children: React.ReactNode;
  sidebarLabel?: string;
  stickySidebar?: boolean;
}

export const Page = React.forwardRef<HTMLElement, PageProps>(
  (
    {
      variant = "post",
      header,
      hero,
      sidebar,
      sidebarPosition = "right",
      footer,
      children,
      sidebarLabel,
      stickySidebar = true,
      className,
      ...rest
    },
    ref,
  ) => {
    const hasSidebar =
      sidebar !== null && sidebar !== undefined && sidebar !== false;
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
            hasSidebar && styles.withSidebar,
            hasSidebar && sidebarPosition === "left"
              ? styles.sidebarLeft
              : undefined,
          )}
          gap={variant === "project" ? "2rem" : "1.5rem"}
          mobileColumns="1fr"
          mobileGap="md"
        >
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

Page.displayName = "Page";
