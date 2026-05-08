import React from "react";
import styles from "./Breadcrumbs.module.scss";
import { cx } from "../../../utils/classNames";

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = "/",
  ariaLabel = "breadcrumb",
  className,
}) => (
  <nav className={cx(styles.root, className)} aria-label={ariaLabel}>
    <ol className={styles.list}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const current = item.current || isLast;
        const content = current || !item.href ? (
          <span className={cx(styles.item, current && styles.current)} aria-current={current ? "page" : undefined}>
            {item.label}
          </span>
        ) : (
          <a className={styles.item} href={item.href}>
            {item.label}
          </a>
        );

        return (
          <li key={index} className={styles.li}>
            {content}
            {!isLast ? <span className={styles.sep} aria-hidden="true">{separator}</span> : null}
          </li>
        );
      })}
    </ol>
  </nav>
);
