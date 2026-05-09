import React from "react";
import styles from "./StatPill.module.scss";
import { cx } from "../../../utils/classNames";

export type StatPillColor = "phosphor" | "magenta" | "dim";

export interface StatPillProps {
  label: string;
  value: React.ReactNode;
  color?: StatPillColor;
  className?: string;
}

export const StatPill: React.FC<StatPillProps> = ({
  label,
  value,
  color = "phosphor",
  className,
}) => {
  const tone =
    color === "phosphor" ? styles.phosphor : color === "magenta" ? styles.magenta : styles.dim;

  return (
    <span className={cx(styles.pill, tone, className)}>
      <span className={styles.signal} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </span>
  );
};
