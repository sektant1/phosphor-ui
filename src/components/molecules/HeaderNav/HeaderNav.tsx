import React from "react";
import styles from "./HeaderNav.module.scss";
import { cx } from "../../../utils/classNames";

export interface HeaderNavLink {
  label: React.ReactNode;
  href: string;
  glyph?: React.ReactNode;
  active?: boolean;
}

export type HeaderNavVariant = "plain" | "tabs" | "command" | "mobile";

export interface HeaderNavProps extends React.HTMLAttributes<HTMLElement> {
  items: HeaderNavLink[];
  ariaLabel?: string;
  variant?: HeaderNavVariant;
}

const variantClass: Record<HeaderNavVariant, string> = {
  plain: styles.plain,
  tabs: styles.tabs,
  command: styles.command,
  mobile: styles.mobile,
};

export const HeaderNav: React.FC<HeaderNavProps> = ({
  items,
  className,
  ariaLabel = "primary",
  variant = "plain",
  ...rest
}) => (
  <nav
    className={cx(styles.nav, variantClass[variant], className)}
    aria-label={ariaLabel}
    data-pho-component="HeaderNav"
    data-pho-slot="root"
    data-pho-variant={variant}
    {...rest}
  >
    <ul className={styles.list} data-pho-slot="list">
      {items.map((it, i) => (
        <li
          key={`${it.href}-${i}`}
          className={cx(styles.item, it.active && styles.active)}
          data-pho-slot="item"
          data-pho-active={it.active ? "true" : undefined}
        >
          <a
            className={styles.link}
            href={it.href}
            data-pho-slot="link"
            aria-current={it.active ? "page" : undefined}
          >
            <span className={styles.glyph} aria-hidden="true" data-pho-slot="glyph">
              {it.glyph ?? (variant === "command" ? ">" : null)}
            </span>
            <span className={styles.label} data-pho-slot="label">{it.label}</span>
          </a>
        </li>
      ))}
    </ul>
  </nav>
);
