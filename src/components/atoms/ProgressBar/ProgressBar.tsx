import React from "react";
import styles from "./ProgressBar.module.scss";

export interface ProgressBarProps {
  value: number;
  total?: number;
  label?: React.ReactNode;
  showPercent?: boolean;
  current?: boolean;
  segments?: number;
  slim?: boolean;
  meta?: React.ReactNode;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  total = 100,
  label,
  showPercent = true,
  current = false,
  segments,
  slim,
  meta,
  className,
}) => {
  const pct = Math.max(0, Math.min(100, Math.round((value / total) * 100)));
  const cells = segments ?? Math.max(8, Math.min(20, total));
  const filled = Math.round((pct / 100) * cells);
  return (
    <div className={[styles.block, slim ? styles.slim : "", className ?? ""].join(" ")}>
      {(label || showPercent) && (
        <div className={styles.head}>
          {label && <span>{label}</span>}
          {showPercent && <span className={styles.pct}>{pct}%</span>}
        </div>
      )}
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {Array.from({ length: cells }).map((_, i) => {
          const isCurrent = current && i === filled - 1;
          const on = i < filled;
          return (
            <span
              key={i}
              className={[styles.cell, on ? styles.on : "", isCurrent ? styles.current : ""].join(" ")}
            />
          );
        })}
      </div>
      {meta && <p className={styles.meta}>{meta}</p>}
    </div>
  );
};
