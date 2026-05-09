import React from "react";
import styles from "./Page.module.scss";
import { cx } from "../../../utils/classNames";
import { Container, Grid } from "../Layout";
import type { ContainerProps } from "../Layout";

export type PageVariant = "post" | "project";

export type PageSidebarPosition = "left" | "right";

export interface PageProps extends React.HTMLAttributes<HTMLElement> {
  variant?: PageVariant;
  contained?: boolean;
  containerWidth?: ContainerProps["width"];
  containerPadding?: ContainerProps["padding"];
  mobileContainerPadding?: ContainerProps["mobilePadding"];
  containerCenter?: boolean;
  header?: React.ReactNode;
  hero?: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarPosition?: PageSidebarPosition;
  footer?: React.ReactNode;
  children: React.ReactNode;
  sidebarLabel?: string;
  stickySidebar?: boolean;
  mainProps?: React.HTMLAttributes<HTMLDivElement>;
  sidebarProps?: React.HTMLAttributes<HTMLElement>;
}

export const Page = React.forwardRef<HTMLElement, PageProps>(
  (
    {
      variant = "post",
      contained = true,
      containerWidth = "88rem",
      containerPadding = "xl",
      mobileContainerPadding = "md",
      containerCenter = true,
      header,
      hero,
      sidebar,
      sidebarPosition = "right",
      footer,
      children,
      sidebarLabel,
      stickySidebar = true,
      mainProps,
      sidebarProps,
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

    const content = (
      <>
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
              {...sidebarProps}
              className={cx(
                styles.sidebar,
                stickySidebar && styles.stickySidebar,
                sidebarProps?.className,
              )}
              aria-label={resolvedSidebarLabel}
            >
              {sidebar}
            </aside>
          ) : null}

          <div {...mainProps} className={cx(styles.main, mainProps?.className)}>{children}</div>

          {sidebar && sidebarPosition === "right" ? (
            <aside
              {...sidebarProps}
              className={cx(
                styles.sidebar,
                stickySidebar && styles.stickySidebar,
                sidebarProps?.className,
              )}
              aria-label={resolvedSidebarLabel}
            >
              {sidebar}
            </aside>
          ) : null}
        </Grid>

        {footer ? <footer className={styles.footer}>{footer}</footer> : null}
      </>
    );

    const rootClassName = cx(styles.root, styles[variant], className);

    return contained ? (
      <Container
        as="article"
        ref={ref}
        width={containerWidth}
        padding={containerPadding}
        mobilePadding={mobileContainerPadding}
        center={containerCenter}
        className={rootClassName}
        {...rest}
      >
        {content}
      </Container>
    ) : (
      <article ref={ref} className={rootClassName} {...rest}>
        {content}
      </article>
    );
  },
);

Page.displayName = "Page";
