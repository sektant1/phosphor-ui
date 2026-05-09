import React from "react";
import styles from "./CourseCard.module.scss";
import { cx } from "../../../utils/classNames";
import { Button } from "../../atoms/Button";
import { ProgressBar } from "../../atoms/ProgressBar";

export interface CourseCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
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
  ...rest
}) => {
  return (
    <article className={cx(styles.cc, locked && styles.locked, className)} {...rest}>
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
            {progress ? (
              <ProgressBar
                className={styles.progress}
                value={progress.value}
                total={progress.total}
                segments={progress.cells ?? 13}
                showPercent={false}
                slim
              />
            ) : null}
            {cta && (
              <Button className={styles.cta} href={cta.href} size="sm" variant="ghost">
                {cta.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
