import React from "react";
import styles from "./PostLayout.module.scss";
import { cx } from "../../utils/classNames";
import { Grid } from "../Layout";

export interface PostLayoutProps extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  sidebarLabel?: string;
}

export const PostLayout = React.forwardRef<HTMLElement, PostLayoutProps>(
  (
    {
      header,
      sidebar,
      footer,
      children,
      sidebarLabel = "post sidebar",
      className,
      ...rest
    },
    ref,
  ) => (
    <article ref={ref} className={cx(styles.root, className)} {...rest}>
      {header ? <div className={styles.header}>{header}</div> : null}
      <Grid className={cx(styles.grid, !!sidebar && styles.withSidebar)} gap="1.5rem">
        <div className={styles.main}>{children}</div>
        {sidebar ? (
          <aside className={styles.sidebar} aria-label={sidebarLabel}>
            {sidebar}
          </aside>
        ) : null}
      </Grid>
      {footer ? <footer className={styles.footer}>{footer}</footer> : null}
    </article>
  ),
);
PostLayout.displayName = "PostLayout";
