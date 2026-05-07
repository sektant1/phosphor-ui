import React from "react";
import styles from "./PostLayout.module.scss";
import { cx } from "../../utils/classNames";

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
      <div className={cx(styles.grid, !!sidebar && styles.withSidebar)}>
        <div className={styles.main}>{children}</div>
        {sidebar ? (
          <aside className={styles.sidebar} aria-label={sidebarLabel}>
            {sidebar}
          </aside>
        ) : null}
      </div>
      {footer ? <footer className={styles.footer}>{footer}</footer> : null}
    </article>
  ),
);
PostLayout.displayName = "PostLayout";
