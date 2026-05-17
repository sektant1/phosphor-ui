import React from "react";
import styles from "./PrereqList.module.scss";

export type PrereqStatus = "met" | "missing" | "soft";

export interface PrereqItem {
  title: React.ReactNode;
  sub?: React.ReactNode;
  status: PrereqStatus;
  href?: string;
  download?: boolean | string;
  external?: boolean;
}

export interface PrereqListProps {
  heading?: React.ReactNode;
  stamp?: React.ReactNode;
  items: PrereqItem[];
  className?: string;
}

export const PrereqList: React.FC<PrereqListProps> = ({ heading, stamp, items, className }) => (
  <section className={[styles.pq, className ?? ""].join(" ")} aria-label="prerequisites">
    {(heading || stamp) && (
      <header className={styles.head}>
        {heading && <h3 className={styles.h}>{heading}</h3>}
        {stamp && <span className={styles.stamp}>{stamp}</span>}
      </header>
    )}
    <ul className={styles.list}>
      {items.map((it, i) => (
        <li
          key={i}
          className={[
            styles.li,
            it.status === "met" ? styles.met : "",
            it.status === "missing" ? styles.missing : "",
            it.status === "soft" ? styles.soft : "",
          ].join(" ")}
        >
          <span className={styles.mark} aria-hidden="true">
            {it.status === "met" && "ok"}
            {it.status === "missing" && "req"}
            {it.status === "soft" && "opt"}
          </span>
          <span className={styles.name}>
            {it.href ? (
              <a
                className={styles.title}
                href={it.href}
                download={it.download as never}
                target={it.external ? "_blank" : undefined}
                rel={it.external ? "noopener noreferrer" : undefined}
              >
                {it.title}
              </a>
            ) : (
              <span className={styles.title}>{it.title}</span>
            )}
            {it.sub && <span className={styles.sub}>{it.sub}</span>}
          </span>
          <span className={styles.statusLabel} aria-hidden="true">
            {it.status === "met" && "✓ met"}
            {it.status === "missing" && "✗ missing"}
            {it.status === "soft" && "~ soft"}
          </span>
        </li>
      ))}
    </ul>
  </section>
);
