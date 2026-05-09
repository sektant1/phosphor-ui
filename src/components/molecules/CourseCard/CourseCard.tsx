import React from "react";
import styles from "./CourseCard.module.scss";
import { cx } from "../../../utils/classNames";
import { Button } from "../../atoms/Button";
import { ProgressBar } from "../../atoms/ProgressBar";

export interface CourseCardProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "title"
> {
  stamp?: string;
  thumb?: React.ReactNode;
  thumbSrc?: string;
  thumbAlt?: string;
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
    <article
      className={cx(styles.cc, locked && styles.locked, className)}
      {...rest}
    >
      <div className={styles.cover}>
        <span className={styles.coverRail} aria-hidden="true" />
        {stamp && <span className={styles.stamp}>{stamp}</span>}
        {coverMeta && <p className={styles.metaCover}>{coverMeta}</p>}
      </div>
      <div className={styles.body}>
        <div className={styles.header}>
          {tag && <span className={styles.tag}>{tag}</span>}
          {locked && <span className={styles.lockBadge}>locked</span>}
        </div>
        <div className={styles.main}>
          <h2 className={styles.title}>{title}</h2>
          {description && <p className={styles.desc}>{description}</p>}
        </div>
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
              <Button
                className={styles.cta}
                href={cta.href}
                size="sm"
                variant="ghost"
              >
                {cta.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
