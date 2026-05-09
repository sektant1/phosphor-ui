import React from "react";
import styles from "./HeaderNav.module.scss";
import { cx } from "../../../utils/classNames";

export interface HeaderNavLink {
  label: React.ReactNode;
  href: string;
  glyph?: React.ReactNode;
  active?: boolean;
}

export type HeaderNavVariant = "plain" | "tabs" | "command";

export interface HeaderNavProps extends React.HTMLAttributes<HTMLElement> {
  items: HeaderNavLink[];
  ariaLabel?: string;
  variant?: HeaderNavVariant;
}

const variantClass: Record<HeaderNavVariant, string> = {
  plain: styles.plain,
  tabs: styles.tabs,
  command: styles.command,
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
    {...rest}
  >
    <ul className={styles.list}>
      {items.map((it, i) => (
        <li
          key={`${it.href}-${i}`}
          className={cx(styles.item, it.active && styles.active)}
        >
          <a
            className={styles.link}
            href={it.href}
            aria-current={it.active ? "page" : undefined}
          >
            <span className={styles.glyph} aria-hidden="true">
              {it.glyph ?? (variant === "command" ? ">" : null)}
            </span>
            <span className={styles.label}>{it.label}</span>
          </a>
        </li>
      ))}
    </ul>
  </nav>
);
