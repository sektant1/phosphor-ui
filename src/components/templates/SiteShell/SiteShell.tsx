import React from "react";
import { CrtShell } from "../../organisms/CrtShell";
import type { CrtShellProps } from "../../organisms/CrtShell";
import Header from "../../organisms/Header";
import type {
  HeaderLocale,
  HeaderNavItem,
  HeaderProps,
} from "../../organisms/Header";
import { Footer } from "../../organisms/Footer";
import type { FooterLink, FooterProps } from "../../organisms/Footer";
import { cx } from "../../../utils/classNames";
import type { CssVars } from "../../../utils/browser";
import styles from "./SiteShell.module.scss";

export interface SiteShellProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: string;
  children: React.ReactNode;
  tagline?: React.ReactNode;
  nav?: HeaderNavItem[];
  locales?: HeaderLocale[];
  homeHref?: string;
  header?: React.ReactNode;
  headerProps?: Omit<
    HeaderProps,
    "title" | "tagline" | "nav" | "locales" | "homeHref"
  >;
  footer?: React.ReactNode;
  footerLinks?: FooterLink[];
  footerProps?: Omit<FooterProps, "brand" | "links">;
  brand?: React.ReactNode;
  crt?: boolean;
  crtProps?: Omit<CrtShellProps, "children" | "className">;
  contentId?: string;
  skipLinkLabel?: string;
  maxWidth?: string;
  frameClassName?: string;
  mainClassName?: string;
}

export const SiteShell = React.forwardRef<HTMLDivElement, SiteShellProps>(
  (
    {
      title,
      children,
      tagline,
      nav,
      locales,
      homeHref,
      header,
      headerProps,
      footer,
      footerLinks,
      footerProps,
      brand,
      crt = true,
      crtProps,
      contentId = "main-content",
      skipLinkLabel = "Skip to content",
      maxWidth,
      className,
      frameClassName,
      mainClassName,
      style,
      ...rest
    },
    ref,
  ) => {
    const vars: CssVars = {};
    if (maxWidth) vars["--pho-site-max-width"] = maxWidth;

    const content = (
      <div
        ref={ref}
        className={cx(styles.frame, frameClassName)}
        style={{ ...vars, ...style }}
        {...rest}
      >
        <a className={styles.skipLink} href={`#${contentId}`}>
          {skipLinkLabel}
        </a>
        {header ?? (
          <Header
            title={title}
            tagline={tagline}
            nav={nav}
            locales={locales}
            homeHref={homeHref}
            {...headerProps}
          />
        )}
        <main id={contentId} className={cx(styles.main, mainClassName)} tabIndex={-1}>
          {children}
        </main>
        {footer !== undefined
          ? footer
          : (
              <Footer
                brand={brand ?? title}
                links={footerLinks}
                {...footerProps}
              />
            )}
      </div>
    );

    if (!crt) {
      return <div className={cx(styles.shell, className)}>{content}</div>;
    }

    return (
      <CrtShell className={cx(styles.shell, className)} {...crtProps}>
        {content}
      </CrtShell>
    );
  },
);

SiteShell.displayName = "SiteShell";
