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
  showCover?: boolean;
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
  thumb,
  thumbSrc,
  thumbAlt,
  showCover = true,
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
  const thumbContent = thumbSrc ? (
    <img src={thumbSrc} alt={thumbAlt ?? ""} loading="lazy" />
  ) : thumb ? (
    thumb
  ) : (
    <span className={styles.thumbFallback} aria-hidden="true">
      <span className={styles.thumbFallbackGlyph}>▌</span>
    </span>
  );
  const hasCover = showCover && (thumbSrc || thumb || stamp || coverMeta);
  const showProgress = !locked && progress;

  return (
    <article
      className={cx(
        styles.cc,
        !hasCover && styles.noCover,
        locked && styles.locked,
        className,
      )}
      {...rest}
    >
      {hasCover ? (
        <div className={styles.cover}>
          <span className={styles.coverRail} aria-hidden="true" />
          {stamp && <span className={styles.stamp}>{stamp}</span>}
          <span className={styles.thumb}>{thumbContent}</span>
          {coverMeta && <p className={styles.metaCover}>{coverMeta}</p>}
        </div>
      ) : null}
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
        {(showProgress || cta) && (
          <div className={styles.foot}>
            {showProgress ? (
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
                disabled={locked}
                href={cta.href}
                size="sm"
                variant={locked ? "danger" : "ghost"}
              >
                {locked ? "locked" : cta.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
