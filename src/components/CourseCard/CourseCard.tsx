import React from "react";
import styles from "./CourseCard.module.scss";

export interface CourseCardProps {
  stamp?: string;
  art?: string;
  coverMeta?: React.ReactNode;
  tag?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  stats?: React.ReactNode;
  progress?: { value: number; total?: number; cells?: number };
  cta?: { label: string; href: string };
  locked?: boolean;
  className?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  stamp,
  art,
  coverMeta,
  tag,
  title,
  description,
  stats,
  progress,
  cta,
  locked,
  className,
}) => {
  let cells: React.ReactNode = null;
  if (progress) {
    const total = progress.total ?? 100;
    const count = progress.cells ?? 13;
    const filled = Math.round((Math.max(0, Math.min(progress.value, total)) / total) * count);
    cells = Array.from({ length: count }).map((_, i) => (
      <span key={i} className={i < filled ? styles.pbOn : ""} />
    ));
  }
  return (
    <article className={[styles.cc, locked ? styles.locked : "", className ?? ""].join(" ")}>
      <div className={styles.cover}>
        {stamp && <span className={styles.stamp}>{stamp}</span>}
        {art && (
          <pre className={styles.art} aria-hidden="true">
            {art}
          </pre>
        )}
        {coverMeta && <p className={styles.metaCover}>{coverMeta}</p>}
      </div>
      <div className={styles.body}>
        {tag && <span className={styles.tag}>{tag}</span>}
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.desc}>{description}</p>}
        {stats && <p className={styles.stats}>{stats}</p>}
        {(progress || cta) && (
          <div className={styles.foot}>
            {progress && <div className={styles.pb}>{cells}</div>}
            {cta && (
              <a className={styles.cta} href={cta.href}>
                {cta.label}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
