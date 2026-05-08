import React from "react";
import styles from "./BootNav.module.scss";

export interface BootNavItem {
  label: string;
  href: string;
  glyph?: string;
  active?: boolean;
}

export interface BootNavProps {
  items: BootNavItem[];
  className?: string;
  ariaLabel?: string;
}

export const BootNav: React.FC<BootNavProps> = ({ items, className, ariaLabel = "primary" }) => (
  <nav className={[styles.nav, className ?? ""].join(" ")} aria-label={ariaLabel}>
    <ul>
      {items.map((it, i) => (
        <li
          key={it.href + it.label}
          className={[styles.item, it.active ? styles.active : ""].join(" ")}
          style={{ ["--i" as string]: i + 1 }}
        >
          <a href={it.href}>
            {it.glyph ?? ">"} {it.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);
