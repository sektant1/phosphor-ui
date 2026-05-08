import React from "react";
import styles from "./SeriesNav.module.scss";

export interface SeriesNavItem {
  title: string;
  href: string;
}

export interface SeriesNavProps {
  seriesTitle: string;
  current: number;
  total: number;
  prev?: SeriesNavItem;
  next?: SeriesNavItem;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

export const SeriesNav: React.FC<SeriesNavProps> = ({
  seriesTitle,
  current,
  total,
  prev,
  next,
  className,
}) => (
  <nav
    className={[styles.root, className ?? ""].join(" ")}
    aria-label="series navigation"
  >
    <div className={styles.header}>
      <span className={styles.seriesLabel}>SERIES</span>
      <span className={styles.seriesTitle}>{seriesTitle}</span>
      <span className={styles.progress}>
        [{pad(current)} / {pad(total)}]
      </span>
    </div>

    <div className={styles.links}>
      <div className={styles.prevSlot}>
        {prev && (
          <a href={prev.href} className={styles.link}>
            <span className={styles.dir}>&#9666; prev</span>
            <span className={styles.linkTitle}>{prev.title}</span>
          </a>
        )}
      </div>
      <div className={styles.nextSlot}>
        {next && (
          <a href={next.href} className={[styles.link, styles.linkNext].join(" ")}>
            <span className={styles.dir}>next &#9656;</span>
            <span className={styles.linkTitle}>{next.title}</span>
          </a>
        )}
      </div>
    </div>
  </nav>
);
