import React from "react";
import styles from "./StatPill.module.scss";

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
  const valueCls = [
    styles.value,
    color === "phosphor" ? styles.phosphor : color === "magenta" ? styles.magenta : styles.dim,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={[styles.pill, className ?? ""].filter(Boolean).join(" ")}>
      <span className={styles.label}>{label}</span>
      <span className={valueCls}>{value}</span>
    </span>
  );
};
