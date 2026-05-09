import React from "react";
import styles from "./BootNav.module.scss";
import { cx } from "../../../utils/classNames";

export interface BootNavItem {
  label: React.ReactNode;
  href: string;
  glyph?: React.ReactNode;
  active?: boolean;
}

export interface BootNavProps extends React.HTMLAttributes<HTMLElement> {
  items: BootNavItem[];
  ariaLabel?: string;
}

export const BootNav: React.FC<BootNavProps> = ({ items, className, ariaLabel = "primary", ...rest }) => (
  <nav className={cx(styles.nav, className)} aria-label={ariaLabel} {...rest}>
    <ul>
      {items.map((it, i) => (
        <li
          key={`${it.href}-${i}`}
          className={cx(styles.item, it.active && styles.active)}
          style={{ ["--i" as string]: i + 1 }}
        >
          <a href={it.href} aria-current={it.active ? "page" : undefined}>
            {it.glyph ?? ">"} {it.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);
